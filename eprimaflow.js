const flowParser = require('flow-parser');
const istanbul = require('istanbul');

// Function to analyze and get branch coverage for any node
function analyzeNode(node, branchCoverage, instrumentedCode, coverageMap) {
  const branchKey = `${node.loc.start.line}-${node.loc.end.line}`;

  // Check if branch data already exists
  if (!branchCoverage[branchKey]) {
    branchCoverage[branchKey] = {
      taken: false,
      total: 0,
    };
  }

  // Update total execution count
  branchCoverage[branchKey].total++;

  // Handle different node types
  switch (node.type) {
    case 'IfStatement':
      const conditionalExpression = node.test.type === 'SequenceExpression'
        ? node.test.expressions[0]
        : node.test;
      const branchCoverageIf = analyzeNode(conditionalExpression, branchCoverage, instrumentedCode, coverageMap);
      const branchCoverageElse = node.alternate ? analyzeNode(node.alternate, branchCoverage, instrumentedCode, coverageMap) : null;

      // Analyze both branches and update coverage data
      if (branchCoverageIf.taken) {
        branchCoverage[branchKey].taken = true;
      } else if (branchCoverageElse && branchCoverageElse.taken) {
        branchCoverage[branchKey].taken = true;
      }
      break;
    case 'WhileStatement':
    case 'DoWhileStatement':
    case 'ForStatement':
      // Analyze loop body and update coverage data
      branchCoverage = analyzeNode(node.body, branchCoverage, instrumentedCode, coverageMap);
      break;
    default:
      // No branching behavior for this node type
      break;
  }

  return branchCoverage;
}

// Function to get branch coverage for entire code
function getBranchCoverage(code) {
  // Parse the code into an AST
  const ast = flowParser.parse(code);

  // Initialize branch coverage data
  const branchCoverage = {};

  // Instrument the code with branch tracking
  const instrumenter = new istanbul.Instrumenter();
  const instrumentedCode = instrumenter.instrumentSync(code, 'main.js');

  // Execute the instrumented code
  const vm = require('vm');
  vm.runInThisContext(instrumentedCode);

  // Collect coverage data
  const coverageMap = istanbul.createCoverageMap(JSON.parse(require('fs').readFileSync('coverage/coverage-final.json')));

  // Analyze each node in the AST and update branch coverage
  analyzeNode(ast, branchCoverage, instrumentedCode, coverageMap);

  // Return the branch coverage data
  return branchCoverage;
}

// Example usage
const code = `
function myFunction(value) {
  if (value > 10) {
    console.log('Value is greater than 10');
  } else {
    console.log('Value is less than or equal to 10');
  }
}

myFunction(15);
myFunction(5);
`;

const branchCoverage = getBranchCoverage(code);

// Print the branch coverage data
console.log(branchCoverage);
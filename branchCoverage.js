const recast = require('recast');
const fs = require('fs');
const b = recast.types.builders;
const code = fs.readFileSync('./main.js', 'utf8');
const esprima = require('esprima');
const estraverse = require('estraverse');
const { formulateoutputjs } = require('./prisma.js');
const vm = require('vm');

// Parse the code into an AST
const ast = recast.parse(code);
let fileName = 'output.js';
const outCode = fs.readFileSync(fileName, 'utf8');

function countBranches(func) {
    // Parse the function into an AST
    const ast = esprima.parseScript(func.toString());

    let branchCount = 0;

    // Traverse the AST
    estraverse.traverse(ast, {
        enter: function (node) {
            // Increment the branch count if the node is a branch
            switch (node.type) {
                case 'IfStatement':
                case 'WhileStatement':
                case 'ForStatement':
                    branchCount += 2;
                    break;
                case 'SwitchStatement':
                    branchCount += node.cases.length;
                    break;
                default:
                    break;
            }
        }
    });

    return branchCount;
}
const branches = countBranches(code);

const ranbranches = () => {
    let branches = 0;
    let conditions = JSON.parse(fs.readFileSync('conditions.json', 'utf8'));
    conditions.forEach(condition => {
        if (condition.state == 'both') {
            branches += 2;
        }
        else {
            branches += 1;
        }
    });
    return branches;
}

const getCoverage = (functionName, paramsSet) => {


    // Store copy of file
    fs.copyFileSync(fileName, fileName + '.bak');

    // Build up all the function calls in memory
    const functionCalls = paramsSet.map(params => {
        let paramsString;
        if (params.values.length > 0) {
            paramsString = params.values.join(',');
        }
        else {
            paramsString = params.join(',');
        }
        return `${functionName}(${paramsString});\n`;
    }).join('');

    // Write all the function calls to the file at once
    fs.appendFileSync(fileName, functionCalls);
    fs.appendFileSync(fileName, `fs.writeFileSync("conditions.json", JSON.stringify(conditions))`);
     require('./output.js');

    // Run the coverage check
    const coverage = (ranbranches() / branches) * 100;

    // Restore file
    fs.copyFileSync(fileName + '.bak', fileName);

    return coverage;
};
formulateoutputjs();

// const functionInfo = getFunctionInfo('main.js');
// console.log(getCoverage(functionInfo.functionInfo[0].functionName, [
//     { values: [1, 0, 0] },
//     { values: [0, 2, 3] },

// ]));

module.exports.getBranchCoverage = getCoverage;
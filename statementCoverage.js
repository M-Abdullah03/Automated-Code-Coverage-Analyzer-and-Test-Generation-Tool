const fs = require('fs');
const libCoverage = require('istanbul-lib-coverage');
const esprima = require('esprima');
const estraverse = require('estraverse');
const path = require('path');
const vm = require('vm');
const istanbul = require('istanbul');


let fileName;

const getFunctionInfo = (filename) => {
    fileName = filename;
    // Read the file
    const code = fs.readFileSync(filename, 'utf8');

    // Parse the code into an AST
    const ast = esprima.parseScript(code, { range: true });

    const functionInfo = [];
    const literals = [];
    // Traverse the AST
    estraverse.traverse(ast, {
        enter: function (node) {
            if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
                // Get the function name and parameters length
                const functionName = node.id ? node.id.name : 'anonymous function';
                const parametersLength = node.params.length;

                functionInfo.push({
                    functionName,
                    parametersLength
                });
            }
            else if (node.type === 'Literal') {
                // Add the literal value to the literals array
                literals.push(node.value);
            }
        }
    });
    //filter out duplicates
    let newLs = literals.filter((item, index) => literals.indexOf(item) === index);
    //filter out non-numbers
    newLs = literals.filter(item => typeof item === 'number');
    return { functionInfo, literals: newLs };
}

// // Run the nyc command
const checkCoverage = () => {
    global.__coverage__ = {};
    // Create a new instrumenter
    const instrumenter = new istanbul.Instrumenter();

    // Instrument the code
    const code = fs.readFileSync(path.resolve(fileName), 'utf-8');
    const instrumentedCode = instrumenter.instrumentSync(code, fileName);

    // Execute the instrumented code
    vm.runInThisContext(instrumentedCode);


    // Generate the coverage report
    const collector = new istanbul.Collector();
    collector.add(global.__coverage__);

    const reporter = new istanbul.Reporter();
    reporter.addAll(['json']);
    reporter.write(collector, true, () => {
    });

    // Read the coverage report
    let coverageReport = JSON.parse(fs.readFileSync('./coverage/coverage-final.json', 'utf8'));

    // Create a coverage map
    let coverageMap = libCoverage.createCoverageMap(coverageReport);

    // Calculate coverage summary
    let summary = libCoverage.createCoverageSummary();
    coverageMap.files().forEach(function (f) {
        let fc = coverageMap.fileCoverageFor(f);
        summary.merge(fc.toSummary());
    });

    return summary.toJSON().statements.pct;
};

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

    // Run the coverage check
    const coverage = checkCoverage();

    // Restore file
   fs.copyFileSync(fileName + '.bak', fileName);

    return coverage;
};


const functionInfo = getFunctionInfo('main.js');
//Example call
// getCoverage('testConditions', [[1, 1, 2]]);

// Usage
// console.log(functionInfo);

console.log(getCoverage(functionInfo.functionInfo[0].functionName, [[4, 3, 60], [2, 8, 50], [5, 4, 40], [3, 7, 50]]));

module.exports.getFunctionInfo = getFunctionInfo;
module.exports.getCoverage = getCoverage;
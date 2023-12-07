const { execSync, exec } = require('child_process');
const fs = require('fs');
const libCoverage = require('istanbul-lib-coverage');
const esprima = require('esprima');
const estraverse = require('estraverse');
const NYC = require('nyc');
const path = require('path');

let fileName;

const getFunctionInfo = (filename) => {
    fileName = filename;
    // Read the file
    const code = fs.readFileSync(filename, 'utf8');

    // Parse the code into an AST
    const ast = esprima.parseScript(code, { range: true });

    const functionInfo = [];

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
        }
    });

    return functionInfo;
}


// // Run the nyc command
const checkCoverage = async () => {
    // Create a new nyc instance
    const nyc = new NYC({
        reporter: 'json',
        reportDir: './coverage',
        all: true,

    });

    // Wrap the main.js execution in the nyc context
    nyc.wrap();
    //     // Require the main.js file to execute it
    require(path.resolve(fileName));

    // Generate the coverage report
    nyc.writeCoverageFile();
    await nyc.report();

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
const getCoverage = async (functionName, paramsSet) => {
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
    const coverage = await checkCoverage();

    // Restore file
    fs.copyFileSync(fileName + '.bak', fileName);

    return coverage;
};


const functionInfo = getFunctionInfo('main.js');
//Example call
// getCoverage('testConditions', [[1, 1, 2]]);

// Usage
// console.log(functionInfo);

console.log(getCoverage(functionInfo[0].functionName, [[0, 1, 2], [1, 1, 2]]));

module.exports.getFunctionInfo = getFunctionInfo;
module.exports.getCoverage = getCoverage;
const { execSync, exec } = require('child_process');
const fs = require('fs');
const libCoverage = require('istanbul-lib-coverage');
const esprima = require('esprima');
const estraverse = require('estraverse');
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
const checkCoverage = () => {
    try {
        execSync('npx nyc --reporter=text --report-dir=./coverage node main.js')
    } catch (e) {
        console.log(`Error: ${e.message}`);
        return;
    };

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
    console.log("Received",paramsSet);
    const functionCalls = paramsSet.map(params => {
        let paramsString;
        if(params.values.length > 0){
            paramsString = params.values.join(',');
        }
        else{
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
//getCoverage('testConditions', [[1, 1, 2], [1, 2, 3]]);

// Usage
// console.log(functionInfo);

console.log(getCoverage(functionInfo[0].functionName, [[0, 1, 2]]));

module.exports.getFunctionInfo = getFunctionInfo;
module.exports.getCoverage = getCoverage;
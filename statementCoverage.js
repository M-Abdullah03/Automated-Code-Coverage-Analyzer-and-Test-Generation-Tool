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

                let returnCount = 0;
                estraverse.traverse(node, {
                    enter: function (innerNode) {
                        if (innerNode.type === 'ReturnStatement') {
                            returnCount++;
                        }
                    }
                });

                functionInfo.push({
                    functionName,
                    parametersLength,
                    returnCount
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
const checkCoverage = (testCasesLength) => {
    global.__coverage__ = {};
    
    // Create a new instrumenter
    const instrumenter = new istanbul.Instrumenter({includeAllBranches: true, includeAllSources: true,all:true});

    // Instrument the code
    const code = fs.readFileSync(path.resolve(fileName), 'utf-8');
    const instrumentedCode = instrumenter.instrumentSync(code, fileName);

    // Execute the instrumented code
    vm.runInThisContext(instrumentedCode)


    // Generate the coverage report
    const collector = new istanbul.Collector();
    collector.add(global.__coverage__);


    const reporter = new istanbul.Reporter();
    reporter.addAll(['json','clover','cobertura','lcov']);
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
    console.log(summary.toJSON());
    let totalStatements = summary.toJSON().statements.total;
    let coveredStatements = summary.toJSON().statements.covered;
    totalStatements = totalStatements - testCasesLength;
    coveredStatements = coveredStatements - testCasesLength;
    let statementCoverage = (coveredStatements / totalStatements)*100;
    return statementCoverage;
    //return summary.toJSON().statements.pct;
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
    const coverage = checkCoverage(paramsSet.length);

    // Restore file
    fs.copyFileSync(fileName + '.bak', fileName);

    return coverage;
};


const functionInfo = getFunctionInfo('main.js');
//Example call
//getCoverage('validateNumbers', [[1, 1, 2]]);

// Usage
// console.log(functionInfo);

console.log(getCoverage(functionInfo.functionInfo[0].functionName, [
    { values: [1, 0, 0] },
    { values: [0, 2, 3] },
    { values: [1, 1, 0] },
    { values: [60, 60, 60] },
    {
        values:[1,2,1]
    },
    {
        values:[2,2,3]
    },

]));

module.exports.getFunctionInfo = getFunctionInfo;
module.exports.getCoverage = getCoverage;
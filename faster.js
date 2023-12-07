const istanbul = require('istanbul');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const fileName = 'main.js';

const getCoverage = (functionName, paramsSet) => {
    // Store copy of file
    fs.copyFileSync(fileName, fileName + '.bak');

    // Build up all the function calls in memory
    console.log("Received", paramsSet);
    const functionCalls = paramsSet.map(params => {
        let paramsString;
        if (params.values.length > 0){
            paramsString = params.values.join(',');
        }
        else{
            paramsString = params.join(',');
        }
        return `${functionName}(${paramsString});\n`;
    }).join('');

    // Write all the function calls to the file at once
    fs.appendFileSync(fileName, functionCalls);

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
        console.log('Coverage report generated');
    });

    // Restore file
    fs.copyFileSync(fileName + '.bak', fileName);
};

getCoverage('testConditions', [[1, 1, 2]]);
const fs = require('fs');
const createInstrumenter = require('istanbul-lib-instrument').createInstrumenter;
const hook = require('istanbul-lib-hook');
const libCoverage = require('istanbul-lib-coverage');
const reports = require('istanbul-reports');
const libReport = require('istanbul-lib-report');

// Read your code from the file
let code = fs.readFileSync('main.js', 'utf-8');

// Create an instrumenter
let instrumenter = createInstrumenter();

// Instrument your code
let instrumentedCode = instrumenter.instrumentSync(code, 'main.js');

// Write the instrumented code to a new file
fs.writeFileSync('main_instrumented.js', instrumentedCode);

// Create a coverage map
let coverageMap = libCoverage.createCoverageMap({});

// Hook into the require function
hook.hookRequire(function () {
    return true;
}, function (code, options) {
    return instrumenter.instrumentSync(code, options.filename);
});

// Require the instrumented code to run it
require('./main_instrumented.js');

// Add the coverage data to the coverage map
coverageMap.merge(global.__coverage__);

// Create a context for reporting
let context = libReport.createContext({
    dir: 'coveragevv',
    coverageMap: coverageMap
});

// Create and write the json report
let jsonReport = reports.create('json', {});
jsonReport.execute(context);

// Create and write the text report
let textReport = reports.create('text', {});
textReport.execute(context);
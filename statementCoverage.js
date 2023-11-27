const { exec } = require('child_process');
const fs = require('fs');
const libCoverage = require('istanbul-lib-coverage');

// Run the nyc command
exec('npx nyc --reporter=json --report-dir=./coverage node main.js', (error, stdout, stderr) => {
    if (error) {
        console.log(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }

    // Read the coverage report
    let coverageReport = JSON.parse(fs.readFileSync('./coverage/coverage-final.json', 'utf8'));

    // Create a coverage map
    let coverageMap = libCoverage.createCoverageMap(coverageReport);

    // Output coverage map
    //console.log(coverageMap.toJSON());

    // Calculate coverage summary
    let executedLine = {};
    let summary = libCoverage.createCoverageSummary();
    coverageMap.files().forEach(function (f) {
        let fc = coverageMap.fileCoverageFor(f);
        summary.merge(fc.toSummary());

        // Get the line numbers that were executed
        let executedLines = fc.getLineCoverage();
        console.log(`Executed lines in ${f}:`, Object.keys(executedLines).filter(line => executedLines[line] > 0));
        executedLine = executedLines;
    });

    // Output coverage summary
     console.log(summary.toJSON());

     let coverage={
        // "lines": summary.toJSON().lines.pct,
        "statements": summary.toJSON().statements.pct,
        // "functions": summary.toJSON().functions.pct,
        // "branches": summary.toJSON().branches.pct
        "lines": executedLine
     };

        fs.writeFileSync("coverage.json", JSON.stringify(coverage));
     
});


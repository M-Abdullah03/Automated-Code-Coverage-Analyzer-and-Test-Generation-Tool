const fs = require('fs');
const { exec } = require('child_process');

// Run the nyc command
exec('npm run istanbul', (error, stdout, stderr) => {
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

    let totalStatements = 0;
    let coveredStatements = 0;

    // Calculate the total number of statements and the number of covered statements
    for (let filename in coverageReport) {
        let fileReport = coverageReport[filename].s;
        for (let i in fileReport) {
            totalStatements++;
            if (fileReport[i] > 0) {
                coveredStatements++;
            }
        }
    }

    let coveragePercentage = (coveredStatements / totalStatements) * 100;

    let coverage = {
        totalStatements: totalStatements,
        coveredStatements: coveredStatements,
        coveragePercentage: coveragePercentage
    };

    fs.writeFileSync('statement.json', JSON.stringify(coverage, null, 2));
    console.log(`Coverage: ${coveragePercentage}%`);
});
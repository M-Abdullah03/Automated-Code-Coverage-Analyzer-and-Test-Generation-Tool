const { runGA } = require('./GA2.js');
const { getFunctionInfo, replaceFunction } = require('./statementCoverage.js');
const { setBranches } = require('./branchCoverage.js');
const { setConditions } = require('./conditionCoverage.js');
const { formulateoutputjs } = require('./prisma.js');
const fs = require('fs');
const { exec } = require('child_process');

const writeTestcases = (testCases) => {
    //make jest testcases
    const funcs = getFunctionInfo("./main.js");

    fs.writeFileSync("./test.js", "const assert = require('assert');\n");

    funcs.functionInfo.map((f) => {
        fs.appendFileSync("./main.js", `\nmodule.exports.${f.functionName} = ${f.functionName};\n`);
        fs.appendFileSync("./test.js", `const {${f.functionName}} = require('./main.js');\n`);
    });

    testCases.map((testCase) => {
        fs.appendFileSync("./test.js", `\ndescribe('Testing ${testCase.functionName} for ${testCase.type} coverage of ${testCase.coverage}%', function() {\n`);
        testCase.testCases.map((test, index) => {
            fs.appendFileSync("./test.js", `\tit('runs for values ${test.values.join(", ")}', function() {\n`);
            fs.appendFileSync("./test.js", `\t\ttry {\n`);
            fs.appendFileSync("./test.js", `\t\t\t${testCase.functionName}(${test.values.join(", ")});\n`);
            fs.appendFileSync("./test.js", `\t\t} catch (error) {\n`);
            fs.appendFileSync("./test.js", `\t\t\texpect(false).toBe(true);\n`);
            fs.appendFileSync("./test.js", `\t\t}\n`);
            fs.appendFileSync("./test.js", `\t});\n`);
        });
        fs.appendFileSync("./test.js", `});\n`);
    });

}


const generateTestCases = (fileName) => {

    let testCases = [];

    const numGenerations = 100;
    const populationSize = 50;

    const func = getFunctionInfo(fileName);

    const literals = func.literals;

    let type = "statement";

    func.functionInfo.map((f) => {
        //create copy of file
        fs.copyFileSync(fileName, fileName + '.bak2');
        replaceFunction(f.functionName, fileName, 0);

        let bestIndividual = runGA(numGenerations, populationSize, f, literals, type);

        // if (bestIndividual.coverage[0] === 100) {
        //     console.log("Function " + f.functionName + " is fully covered");

        // } else {
        //     console.log("Function " + f.functionName + " is not fully covered");
        // }

        // console.log("Best individual: " + bestIndividual.coverage[0] + "%");

        // for (let i = 0; i < bestIndividual.set.length; i++) {
        //     console.log("Set " + i + ": " + bestIndividual.set[i].values.join(" "));
        // }

        //restore file
        fs.copyFileSync(fileName + '.bak2', fileName);

        testCases.push({
            functionName: f.functionName,
            type: type,
            coverage: bestIndividual.coverage[0],
            testCases: bestIndividual.set
        });
    });

    type = "branch";

    func.functionInfo.map((f) => {
        //create copy of file
        fs.copyFileSync(fileName, fileName + '.bak2');
        replaceFunction(f.functionName, fileName, 0);

        setBranches();

        formulateoutputjs("output.js", "./evaluate.js");

        let bestIndividual = runGA(numGenerations, populationSize, f, literals, type);

        // if (bestIndividual.coverage[0] === 100) {
        //     console.log("Function " + f.functionName + " is fully covered");

        // } else {
        //     console.log("Function " + f.functionName + " is not fully covered");
        // }

        // console.log("Best individual: " + bestIndividual.coverage[0] + "%");

        // for (let i = 0; i < bestIndividual.set.length; i++) {
        //     console.log("Set " + i + ": " + bestIndividual.set[i].values.join(" "));
        // }

        //restore file
        fs.copyFileSync(fileName + '.bak2', fileName);

        testCases.push({
            functionName: f.functionName,
            type: type,
            coverage: bestIndividual.coverage[0],
            testCases: bestIndividual.set
        });
    });

    type = "condition";

    func.functionInfo.map((f) => {
        //create copy of file
        fs.copyFileSync(fileName, fileName + '.bak2');
        replaceFunction(f.functionName, fileName, 0);

        setConditions();

        formulateoutputjs("output2.js", "./evaluate2.js");

        let bestIndividual = runGA(numGenerations, populationSize, f, literals, type);

        // if (bestIndividual.coverage[0] === 100) {
        //     console.log("Function " + f.functionName + " is fully covered");

        // } else {
        //     console.log("Function " + f.functionName + " is not fully covered");
        // }

        // console.log("Best individual: " + bestIndividual.coverage[0] + "%");

        // for (let i = 0; i < bestIndividual.set.length; i++) {
        //     console.log("Set " + i + ": " + bestIndividual.set[i].values.join(" "));
        // }

        //restore file
        fs.copyFileSync(fileName + '.bak2', fileName);

        testCases.push({
            functionName: f.functionName,
            type: type,
            coverage: bestIndividual.coverage[0],
            testCases: bestIndividual.set
        });
    });

    //delete all bak files
    fs.unlinkSync(fileName + '.bak2');
    fs.unlinkSync(fileName + '.bak');
    fs.unlinkSync('output.js');
    fs.unlinkSync('output2.js');
    fs.unlinkSync('./output.js.bak');
    fs.unlinkSync('./output2.js.bak');
    //delete conditions.json
    fs.unlinkSync("./conditions.json");
    fs.unlinkSync("./conditions2.json");

    writeTestcases(testCases);
    exec("npx nyc --reporter=lcov mocha test.js", (err, stdout, stderr) => {
        if (err) {
            console.log(err);
        }
        console.log(stdout);
        console.log(stderr);
    });

    return testCases;

}

// generateTestCases("main.js");

module.exports.generateTestCases = generateTestCases;
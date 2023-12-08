const { runGA } = require('./GA2.js');
const { getFunctionInfo, replaceFunction } = require('./statementCoverage.js');
const {setBranches} = require('./branchCoverage.js');
const {setConditions} = require('./conditionCoverage.js');
const { formulateoutputjs } = require('./prisma.js');
const fs = require('fs');

const generateTestCases = () => {

    let fileName = "main.js";
    let testCases = [];

    const numGenerations = 100;
    const populationSize = 50;

    const func = getFunctionInfo(fileName);

    const literals = func.literals;

    let type = "statement";

    func.functionInfo.map((f) => {
        //create copy of file
        fs.copyFileSync(fileName, fileName + '.bak2');
        replaceFunction(f.functionName, fileName);

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
            testCases: bestIndividual.set
        });
    });

    type = "branch";

    func.functionInfo.map((f) => {
        //create copy of file
        fs.copyFileSync(fileName, fileName + '.bak2');
        replaceFunction(f.functionName, fileName);

        setBranches();

        formulateoutputjs("output.js","./evaluate.js");

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
            testCases: bestIndividual.set
        });
    });

    type = "condition";

    func.functionInfo.map((f) => {
        //create copy of file
        fs.copyFileSync(fileName, fileName + '.bak2');
        replaceFunction(f.functionName, fileName);

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
            testCases: bestIndividual.set
        });
    });

    return testCases;

}

console.log(generateTestCases());

module.exports.generateTestCases = generateTestCases;
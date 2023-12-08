const {runGA} = require('./GA2.js');
const {getFunctionInfo} = require('./statementCoverage.js');

const numGenerations = 100;
const populationSize = 50;


const func = getFunctionInfo('main.js');

const literals = func.literals;

let type = "condition";

func.functionInfo.forEach(async (f) => {
    const bestIndividual = await runGA(numGenerations, populationSize, f, literals, type);

    if(bestIndividual.coverage[0] === 100) {
        console.log("Function " + f.functionName + " is fully covered");

    } else {
        console.log("Function " + f.functionName + " is not fully covered");
    }

    console.log("Best individual: " + bestIndividual.coverage[0] + "%");

    for (let i = 0; i < bestIndividual.set.length; i++) {
        console.log("Set " + i + ": " + bestIndividual.set[i].values.join(" "));
    }
});
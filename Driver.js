const {runGA} = require('./GA.js');
const {getFunctionInfo} = require('./statementCoverage.js');

const numGenerations = 100;
const populationSize = 50;


const func = getFunctionInfo('main.js');

console.log(func);

func.forEach(async (f) => {
    let bestIndividual = await runGA(numGenerations, populationSize, f);

    if(bestIndividual.coverage[0] === 100) {
        console.log("Function " + f.functionName + " is fully covered");

    } else {
        console.log("Function " + f.functionName + " is not fully covered");
    }
    for (let i = 0; i < bestIndividual.set.length; i++) {
        console.log("Set " + i + ": " + bestIndividual.set[i].values.join(" "));
    }
});
const {runGA} = require('./GA2.js');
const {getFunctionInfo} = require('./statementCoverage.js');
const {formulateoutputjs} = require('./prisma.js');

const numGenerations = 100;
const populationSize = 50;


const func = getFunctionInfo('main.js');

const literals = func.literals;

let type = "statement";
// formulateoutputjs("output.js","./evaluate.js");
formulateoutputjs("output2.js","./evaluate2.js");

let bestIndividual = [];

bestIndividual.length = func.functionInfo.length;


func.functionInfo.map((f, j) => {
    console.log("Starting GA for function " + f.functionName);
    bestIndividual[j] = runGA(numGenerations, populationSize, f, literals, type);
    console.log("Finished GA for function " + f.functionName);

    console.log(bestIndividual[j].set);

    if(bestIndividual[j].coverage[0] === 100) {
        console.log("Function " + f.functionName + " is fully covered");

    } else {
        console.log("Function " + f.functionName + " is not fully covered");
    }

    console.log("Best individual: " + bestIndividual[j].coverage[0] + "%");

    for (let i = 0; i < bestIndividual[j].set.length; i++) {
        console.log("Set " + i + ": " + bestIndividual[j].set[i].values.join(" "));
    }
});
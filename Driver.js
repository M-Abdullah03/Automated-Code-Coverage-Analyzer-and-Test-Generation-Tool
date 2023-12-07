const {runGA} = require('./GA.js');
const {getFunctionInfo} = require('./statementCoverage.js');

const numGenerations = 100;
const populationSize = 100;


const func = getFunctionInfo('main.js');

console.log(func);

func.forEach(async (f) => {
    let set = await runGA(numGenerations, populationSize, f);

    for (let i = 0; i < set.length; i++) {
        console.log("Set " + i + ": " + set[i].values.join(" "));
    }
});
const runGA = require('./GA.js');
const {getFunctionInfo} = require('./statementCoverage.js');

const numGenerations = 100;
const populationSize = 100;


const func = getFunctionInfo('main.js');

console.log(func);

func.array.forEach(element => {
    console.log(element);
});
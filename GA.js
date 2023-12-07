const {getCoverage} = require('./statementCoverage');

class Line {
    constructor() {
        this.lines = [];
    }
}

class Value {
    constructor() {
        this.values = [];
    }
}

class Individual {
    constructor() {
        this.setLines = [];
        this.coverage = [];
        this.set = [];
        this.size = 0;
    }
}

function compareLines(line1, line2) {
    const range = Math.min(line1.lines.length, line2.lines.length);

    for (let i = 0; i < range; i++) {
        if (line1.lines[i] !== line2.lines[i]) {
            return false;
        }
    }

    return true;
}

function fitnessFunction(individual) {

    let fitness = individual.coverage[0];

    // for (let i = 1; i < individual.coverage.length; i++) {
    //     if (!compareLines(individual.setLines[i], individual.setLines[i - 1])) {
    //         fitness += individual.coverage[i];
    //     }
    // }

    return fitness;
}

function generateRandomValues(individual) {
    const size = individual.set.length;

    for (let i = 0; i < size; i++) {
        const size2 = individual.set[i].values.length;

        for (let j = 0; j < size2; j++) {
            const prob = Math.floor(Math.random() * 5);

            switch (prob) {
                case 0:
                    individual.set[i].values[j] = ((Math.random() * 1000000) + 101) * -1;
                    break;
                case 1:
                    individual.set[i].values[j] = (Math.floor(Math.random() * 100) + 1) * -1;
                    break;
                case 2:
                    individual.set[i].values[j] = 0;
                    break;
                case 3:
                    individual.set[i].values[j] = Math.floor(Math.random() * 100) + 1;
                    break;
                case 4:
                    individual.set[i].values[j] = ((Math.random() * 1000000) + 101);
                    break;
            }
        }
    }
}

function mutate(individual) {
    const size = individual.set.length;
    const ran = Math.floor(Math.random() * size);
    const prob = Math.floor(Math.random() * 5);

    switch (prob) {
        case 0:
            individual.set[ran].values[ran] = ((Math.random() * 1000000) + 101) * -1;
            break;
        case 1:
            individual.set[ran].values[ran] = (Math.floor(Math.random() * 100) + 1) * -1;
            break;
        case 2:
            individual.set[ran].values[ran] = 0;
            break;
        case 3:
            individual.set[ran].values[ran] = Math.floor(Math.random() * 100) + 1;
            break;
        case 4:
            individual.set[ran].values[ran] = ((Math.random() * 1000000) + 101);
            break;
    }
}

function crossover(individual1, individual2) {
    const size = individual1.set.length;
    const ran = Math.floor(Math.random() * size);

    for (let i = 0; i < size; i++) {
        const size2 = individual1.set[i].values.length;

        for (let j = ran; j < size2; j++) {
            const temp = individual1.set[i].values[j];
            individual1.set[i].values[j] = individual2.set[i].values[j];
            individual2.set[i].values[j] = temp;
        }
    }
}

async function runGA(numGenerations, population, func_json) {
    const populations = [];
    let ss = 1;

    for (let i = 0; i < population; i++) {
        const individual = new Individual();
        individual.set.push(new Value());
        for (let j = 0; j < func_json.parametersLength; j++) {
            individual.set[ss - 1].values.push(0);
        }
        //console.log('Before pushing:', individual.set[ss - 1].values);
        generateRandomValues(individual);
        //console.log('After pushing:', individual.set[ss - 1].values);
        populations.push(individual);
    }

    while (true) {
        for (let generation = 0; generation < numGenerations; generation++) {
            const fitnesses = new Array(population);

            for (let i = 0; i < population; i++) {

                //console.log(populations[i].set);

                populations[i].coverage[0] = await getCoverage(func_json.functionName, populations[i].set);

                console.log("Generation " + generation + " Coverage " + i + ": " + populations[i].coverage[0]);

                // for (let s = 0; s < populations[i].set.length; s++) {
                //     populations[i].coverage[s] = Math.floor((Math.random() * 100) + 1);

                //     const line = new Line();

                //     for (let j = 0; j < 10; j++) {
                //         line.lines.push(Math.floor(Math.random() * 100));
                //     }

                //     populations[i].setLines[s] = line;

                //     const fitness = fitnessFunction(populations[i]);
                //     fitnesses[i] = fitness;
                // }
            }

            //sort by fitness in descending order
            for (let i = 0; i < population; i++) {
                for (let j = i + 1; j < population; j++) {
                    if (fitnesses[i] < fitnesses[j]) {
                        const temp = populations[i];
                        populations[i] = populations[j];
                        populations[j] = temp;

                        const temp2 = fitnesses[i];
                        fitnesses[i] = fitnesses[j];
                        fitnesses[j] = temp2;
                    }
                }
            }

            const prob = Math.floor(Math.random() * 2);

            if (prob === 0) {
                crossover(populations[0], populations[1]);
            } else {
                for (let i = 0; i < 2; i++) {
                    mutate(populations[i]);
                }
            }
        }

        let bestFitness = populations[0].coverage[0];

        for (let i = 0; i < population; i++) {
            const fitness = fitnessFunction(populations[i]);
            //console.log("Fitness " + i + ": " + fitness);

            if (fitness > bestFitness) {
                bestFitness = fitness;
            }
        }

        if (bestFitness === 100 || populations[0].set.length > 100) {
            break;
        }

        //console.log("Best fitness----------: " + bestFitness);

        ss++;
        for (let i = 0; i < population; i++) {
            populations[i].set.push(new Value());
            for (let j = 0; j < func_json.parametersLength; j++) {
                populations[i].set[ss - 1].values.push(0);
            }
            generateRandomValues(populations[i]);
        }
    }

    let bestFitness = populations[0].coverage[0];
    let bestIndividual = populations[0];

    for (let i = 0; i < population; i++) {
        const fitness = fitnessFunction(populations[i]);
        //console.log("Fitness " + i + ": " + fitness);

        if (fitness > bestFitness) {
            bestFitness = fitness;
            bestIndividual = populations[i];
        }
    }

    // console.log("Best fitness: " + bestFitness);
    // console.log("Best individual: ");

    // for (let i = 0; i < bestIndividual.set.length; i++) {
    //     console.log("Set " + i + ": " + bestIndividual.set[i].values.join(" "));
    //     console.log("Lines: " + bestIndividual.setLines[i].lines.join(" "));
    // }

    return bestIndividual.set;
}

// const numGenerations = 100;
// const populationSize = 100;

// const func ={
//     function_name: "testConditions",
//     parameters: 3
// }


// runGA(numGenerations, populationSize, func);

module.exports.runGA = runGA;
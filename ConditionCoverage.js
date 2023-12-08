const recast = require('recast');
const fs = require('fs');
const b = recast.types.builders;

const code = fs.readFileSync('./main.js', 'utf8');
const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');
// Parse the code into an AST
const ast = recast.parse(code);
const fileName='output2.js';

function countConditions(func) {
    // Parse the function into an AST
    const ast = esprima.parseScript(func.toString());

    let conditionCount = 0;

    // Traverse the AST
    estraverse.traverse(ast, {
        enter: function (node) {
            // Increment the branch count if the node is a branch
            switch (node.type) {
                case 'IfStatement':
                case 'WhileStatement':
                case 'ForStatement':
                case 'DoWhileStatement':
                    const condition = recast.print(node.test).code;
                    // Divide the condition into subconditions
                    const subconditions = condition.split(/&&|\|\|/);
                    conditionCount += subconditions.length*2;
                    break;
                case 'SwitchStatement':
                    conditionCount += node.cases.length;
                    break;
                default:
                    break;
            }
        }
    });

    return conditionCount;
}
const branches=countConditions(code);

const ranbranches=() => {
    let branches = 0;
    let conditions = JSON.parse(fs.readFileSync('conditions2.json', 'utf8'));
    conditions.forEach(condition => {
       if(condition.state == 'both')
       {
           branches+=2;
       }
         else
         {
              branches+=1;
            }
    });
    return branches;
}

function getFunctionCalls(node) {
    let functionCalls = [];
    estraverse.traverse(node, {
        enter: function (node) {
            if (node.type === 'CallExpression' && node.callee.type === 'Identifier') {
                functionCalls.push(node.callee.name);
            }
        }
    });
    return functionCalls;
}

function removeFunctions(code, functionsToKeep) {
    let ast = esprima.parseScript(code);

    ast = estraverse.replace(ast, {
        enter: function (node) {
            if ((node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') &&
                node.id && !functionsToKeep.includes(node.id.name)) {
                return this.remove();
            }
        }
    });

    return escodegen.generate(ast);
}

const getCoverage = (functionName, paramsSet) => {

    // Store copy of file
    fs.copyFileSync(fileName, fileName + '.bak');

    //keep only function of interest and all dependent functions
    let code = fs.readFileSync(fileName, 'utf8');

    let ast = esprima.parseScript(code);

    let functionsToKeep = [];
    estraverse.traverse(ast, {
        enter: function (node, parent) {
            if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
                let functionOfInterest = node.id ? node.id.name : parent.id ? parent.id.name : null;
                if (functionName === functionOfInterest) {
                    functionsToKeep.push(functionOfInterest);
                    functionsToKeep.push(...getFunctionCalls(node));
                }
            }
        }
    });

    // Remove all other functions
    code = removeFunctions(code, functionsToKeep);

    // Write the code to the file
    fs.writeFileSync(fileName, code);

    // Build up all the function calls in memory
    const functionCalls = paramsSet.map(params => {
        let paramsString;
        if (params.values.length > 0) {
            paramsString = params.values.join(',');
        }
        else {
            paramsString = params.join(',');
        }
        return `${functionName}(${paramsString});\n`;
    }).join('');

    // Write all the function calls to the file at once
    fs.appendFileSync(fileName, functionCalls);
    fs.appendFileSync(fileName,`fs.writeFileSync("conditions2.json", JSON.stringify(conditions));`);

    delete require.cache[require.resolve('./output2.js')];

    require('./output2.js');

    // Run the coverage check
    const branchCount = ranbranches();
    const coverage = (branchCount/branches)*100;

    // Restore file
    fs.copyFileSync(fileName + '.bak', fileName);

    return coverage;
};


module.exports.getConditionCoverage = getCoverage;
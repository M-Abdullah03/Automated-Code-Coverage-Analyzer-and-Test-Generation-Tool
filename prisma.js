const recast = require('recast');
const fs = require('fs');
const b = recast.types.builders;

const code = fs.readFileSync('./main.js', 'utf8');
const esprima = require('esprima');
const estraverse = require('estraverse');
// Parse the code into an AST
const ast = recast.parse(code);
let index = 0;
let conditionIndex = 0;
let nestedConditionIndex = 0;
let conditionStack = [];


function countBranches(func) {
    // Parse the function into an AST
    const ast = esprima.parseScript(func.toString());

    let branchCount = 0;

    // Traverse the AST
    estraverse.traverse(ast, {
        enter: function (node) {
            // Increment the branch count if the node is a branch
            switch (node.type) {
                case 'IfStatement':
                case 'WhileStatement':
                case 'ForStatement':
                    branchCount += 2;
                    break;
                case 'SwitchStatement':
                    branchCount += node.cases.length;
                    break;
                default:
                    break;
            }
        }
    });

    return branchCount;
}

const ranbranches = () => {
    let branches = 0;
    let conditions = JSON.parse(fs.readFileSync('conditions.json', 'utf8'));
    conditions.forEach(condition => {
        if (condition.state == 'both') {
            branches += 2;
        }
        else {
            branches += 1;
        }
    });
    return branches;
}
const concatConditions = (path) => {
    const condition = recast.print(path.node.test).code;
    const variables = condition.match(/[a-z]+/gi);
    const objectProperties = variables ? variables.map(variable =>
        b.property('init', b.identifier(variable), b.identifier(variable))
    ) : [];

    const evaluateCall = b.callExpression(
        b.identifier('evaluate'),
        [
            b.identifier('conditions'),
            b.literal(condition),
            b.objectExpression(objectProperties)
        ]
    );
    path.node.test = evaluateCall;
}
const concatswitchcase = (path) => {
    let condition = recast.print(path.node.test).code;
    if (path.node.test == null) {
        condition = "'@'";
    }
    condition = condition.split(',').map(x => `${x}==${x}`).join(' && ');
    const variables = condition.match(/[a-z]+/gi);
    const objectProperties = variables ? variables.map(variable =>
        b.property('init', b.identifier(variable), b.identifier(variable))
    ) : [];

    const evaluateCall = b.callExpression(
        b.identifier('evaluate'),
        [
            b.identifier('conditions'),
            b.literal(condition),
            b.objectExpression(objectProperties)
        ]
    );

    path.node.consequent.unshift(b.expressionStatement(evaluateCall));
}
const formulateoutputjs = (fileToCreate, toImport) => {
    // Add a line at the start of the file to initialize conditions
    ast.program.body.unshift(
        b.variableDeclaration("let", [
            b.variableDeclarator(b.identifier("conditions"), b.arrayExpression([]))
        ])
    );
    // Add a line at the start of the file to import fs
    ast.program.body.unshift(
        b.variableDeclaration("const", [
            b.variableDeclarator(b.identifier("fs"), b.callExpression(
                b.identifier("require"), [b.literal("fs")]
            ))
        ])
    );

    //add a line at the start of the file to import evaluate.js
    ast.program.body.unshift(
        b.variableDeclaration("const", [
            b.variableDeclarator(b.identifier("evaluate"), b.callExpression(
                b.identifier("require"), [b.literal(toImport)]
            ))
        ])
    );

    // Traverse the AST

    recast.visit(ast, {
        visitIfStatement: function (path) {
            // Get the condition from the if statement
            //concatConditions(path);
            // Create a call to the evaluate function
            concatConditions(path);
            // Continue the traversal of child nodes
            this.traverse(path);
            return false;
        },
        visitWhileStatement: function (path) {
            // Get the condition from the while statement
            concatConditions(path);
            // Continue the traversal of child nodes
            this.traverse(path);
            // Increment the condition index if at root
            return false;
        },
        visitForStatement: function (path) {
            // Get the condition from the for statement

            concatConditions(path);
            // Continue the traversal of child nodes
            this.traverse(path);

            // Increment the condition index if at root
            return false;
        },
        visitDoWhileStatement: function (path) {
            // Get the condition from the do while statement
            concatConditions(path);
            // Continue the traversal of child nodes
            this.traverse(path);
            // Increment the condition index if at root
            return false;
        },
        visitSwitchStatement: function (path) {
            // Get the condition from the switch statement
            concatConditions(path);
            // Continue the traversal of child nodes
            this.traverse(path);
            // Increment the condition index if at root
            return false;
        },
        visitSwitchCase: function (path) {
            // Get the condition from the switch case
            concatswitchcase(path);
            // Continue the traversal of child nodes
            this.traverse(path);
            // Increment the condition index if at root
            return false;
        }

    });

    // Add a line at the end of the file to write conditions to conditions.json
    // ast.program.body.push(
    //     b.expressionStatement(
    //         b.callExpression(
    //             b.memberExpression(
    //                 b.identifier('fs'),
    //                 b.identifier('writeFileSync'),
    //                 false
    //             ),
    //             [
    //                 b.literal('conditions.json'),
    //                 b.callExpression(
    //                     b.memberExpression(
    //                         b.identifier('JSON'),
    //                         b.identifier('stringify'),
    //                         false
    //                     ),
    //                     [b.identifier('conditions')]
    //                 )
    //             ]
    //         )
    //     )
    // );
    const output = recast.print(ast).code;

    // Write the modified code to a new file
    fs.writeFileSync(fileToCreate, output);
}

module.exports.formulateoutputjs = formulateoutputjs;

// Generate the modified code

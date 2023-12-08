const recast = require('recast');
const fs = require('fs');
const b = recast.types.builders;

const code = fs.readFileSync('./main.js', 'utf8');
// Parse the code into an AST
const ast = recast.parse(code);
let index = 0;
let conditionIndex = 0;
let nestedConditionIndex = 0;
let conditionStack = [];

const concatConditions = (path) => {
    const condition = recast.print(path.node.test).code;
    // Divide the condition into subconditions
    const subconditions = condition.split(/&&|\|\|/);
    //        subconditions.forEach((subcondition, index) => {
    // Create a statement to write the JSON object to a file
    let conditionName = `condition${index}`;
    for (let i = 0; i < conditionStack.length; i++) {
        conditionName += `.condition${conditionStack[i]}`;
    }
    conditionStack.push(index);
    console.log(conditionName);
    const conditionStmts = conditionName.split('.');
    const writeStatement = b.expressionStatement(
        b.assignmentExpression(
            '=',
            conditionStmts.reduce((acc, curr) => {
                return b.memberExpression(acc, b.identifier(curr));
            }, b.identifier('conditions')),
            b.objectExpression(
                subconditions.map(sub => {
                    return b.property(
                        'init',
                        b.literal(sub.trim()),
                        b.identifier(sub.trim())
                    );

                }))
        ),
    );
    // Check if the if statement is part of an else branch
    if (path.parentPath.node.type === 'IfStatement' && path.parentPath.node.alternate === path.node) {
        // If it is, insert the write statement before the root if statement
        path.parentPath.insertBefore(writeStatement);
    } else {
        // If it's not, insert the write statement before the if statement
        path.insertBefore(writeStatement);
    }
    //  });
    // Split the condition into subconditions and operators
    const parts = condition.split(/(\s*&&\s*|\s*\|\|\s*)/);

    path.node.test = subconditions.map((sub, subIndex) => {
        return b.memberExpression(
            b.memberExpression(b.identifier('conditions'), b.identifier(conditionName)),
            b.literal(sub.trim()),
            true
        );
    }).reduce((acc, curr, i, arr) => {
        if (i === 0) {
            return curr;
        } else {
            // Get the operator that corresponds to the current subcondition
            const operator = parts[2 * i - 1].trim() === '&&' ? '&&' : '||';

            return b.logicalExpression(operator, acc, curr);
        }
    });
}
// Add a line at the start of the file to initialize conditions
ast.program.body.unshift(
    b.variableDeclaration("let", [
        b.variableDeclarator(b.identifier("conditions"), b.objectExpression([]))
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
            b.identifier("require"), [b.literal("./evaluate.js")]
        ))
    ])
);

// Traverse the AST

recast.visit(ast, {
    visitIfStatement: function (path) {
        // Get the condition from the if statement
        //concatConditions(path);
        // Create a call to the evaluate function
        const condition = recast.print(path.node.test).code;
        const evaluateCall = b.callExpression(
            b.identifier('evaluate'),
            [
                b.identifier('conditions'),
                b.literal(condition),
                b.objectExpression(
                    condition.match(/[a-z]+/gi).map(variable => 
                        b.property('init', b.identifier(variable), b.identifier(variable))
                    )
                )
            ]
        );
        path.node.test = evaluateCall;
        // Continue the traversal of child nodes
        this.traverse(path);
        // Increment the condition index if at root
        if (conditionStack.length === 0) {
            index++;
        }
        nestedConditionIndex = 0;
        conditionStack = [];
        console.log(index);
        return false;
    },
    visitWhileStatement: function (path) {
        // Get the condition from the while statement
        concatConditions(path);
        // Continue the traversal of child nodes
        this.traverse(path);
        // Increment the condition index if at root
        if (conditionStack.length === 0) {
            index++;
        }
        nestedConditionIndex = 0;
        conditionStack = [];
        return false;
    },
    visitForStatement: function (path) {
        // Get the condition from the for statement
        concatConditions(path);
        // Continue the traversal of child nodes
        this.traverse(path);
        // Increment the condition index if at root
        if (conditionStack.length === 0) {
            index++;
        }
        nestedConditionIndex = 0;
        conditionStack = [];
        return false;
    },
});

// Add a line at the end of the file to write conditions to conditions.json
ast.program.body.push(
    b.expressionStatement(
        b.callExpression(
            b.memberExpression(
                b.identifier('fs'),
                b.identifier('writeFileSync'),
                false
            ),
            [
                b.literal('conditions.json'),
                b.callExpression(
                    b.memberExpression(
                        b.identifier('JSON'),
                        b.identifier('stringify'),
                        false
                    ),
                    [b.identifier('conditions')]
                )
            ]
        )
    )
);

// Generate the modified code
const output = recast.print(ast).code;

// Write the modified code to a new file
fs.writeFileSync('./output.js', output);
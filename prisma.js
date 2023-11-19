const recast = require('recast');
const fs = require('fs');
const b = recast.types.builders;

const code = fs.readFileSync('./main.js', 'utf8');
// Parse the code into an AST
const ast = recast.parse(code);

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

// Traverse the AST
let index = 0;
let conditionIndex = 0;
let nestedConditionIndex = 0;
let conditionStack = [];
recast.visit(ast, {
    visitIfStatement: function (path) {
        // Get the condition from the if statement
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
        const conditionStmts= conditionName.split('.');
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
    }
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
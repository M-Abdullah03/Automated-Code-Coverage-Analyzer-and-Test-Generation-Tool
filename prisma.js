const recast = require('recast');
const fs = require('fs');
const b = recast.types.builders;

const code = fs.readFileSync('./main.js', 'utf8');
// Parse the code into an AST
const ast = recast.parse(code);

// Traverse the AST
recast.visit(ast, {
    visitIfStatement: function (path) {
        // Get the condition from the if statement
        const condition = recast.print(path.node.test).code;

        // Divide the condition into subconditions
        const subconditions = condition.split(/&&|\|\|/);

        subconditions.forEach((subcondition, index) => {
            // Create a unique identifier for the condition
            const conditionId = `condition${index}`;

            // Create a statement to append the condition result to a JSON file
            const writeStatement = b.expressionStatement(
                b.callExpression(
                    b.memberExpression(
                        b.identifier('fs'),
                        b.identifier('appendFileSync'),
                        false
                    ),
                    [
                        b.literal('output.json'),
                        b.binaryExpression(
                            '+',
                            b.callExpression(
                                b.memberExpression(
                                    b.identifier('JSON'),
                                    b.identifier('stringify'),
                                    false
                                ),
                                [b.objectExpression([b.property('init', b.identifier(`"`+subcondition.toString()+`"`), b.identifier(subcondition.trim()))])]
                            ),
                            b.literal('\n')
                        )
                    ]
                )
            );

            // Check if the if statement is part of an else branch
            if (path.parentPath.node.type === 'IfStatement' && path.parentPath.node.alternate === path.node) {
                // If it is, insert the write statement before the root if statement
                path.parentPath.insertBefore(writeStatement);
            } else {
                // If it's not, insert the write statement before the if statement
                path.insertBefore(writeStatement);
            }
        });

        // Continue the traversal of child nodes
        return this.traverse(path);
    }
});

// Generate the modified code
const output = recast.print(ast).code;

// Write the modified code to a new file
fs.writeFileSync('./output.js', output);
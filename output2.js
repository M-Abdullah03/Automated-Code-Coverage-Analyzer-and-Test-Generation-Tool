const evaluate = require("./evaluate.js");
const fs = require("fs");
let conditions = [];
function validateNumbers(a) {
    if(evaluate(conditions, "evaluate(conditions, \"a>6\", {\r\n    a: a\r\n})", {
        evaluate: evaluate,
        conditions: conditions,
        a: a,
        a: a,
        a: a
    }))
    {
        return true;
    }
}
validateNumbers(-1);
validateNumbers(7);
fs.writeFileSync("conditions2.json", JSON.stringify(conditions))

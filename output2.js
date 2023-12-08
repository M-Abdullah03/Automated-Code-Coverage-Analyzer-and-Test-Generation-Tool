const evaluate = require("./evaluate2.js");
const fs = require("fs");
let conditions = [];
const evaluate = require("./evaluate.js");
const fs = require("fs");
let conditions = [];
const fs = require('fs');
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
validateNumbers(6);
fs.writeFileSync("conditions2.json", JSON.stringify(conditions))
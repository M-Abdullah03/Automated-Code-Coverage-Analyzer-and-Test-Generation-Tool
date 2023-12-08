const evaluate = require("./evaluate2.js");
const fs = require("fs");
let conditions = [];
let h = 10;
function validateNumbers(a, b, c) {
    while(evaluate(conditions, "a>6 && b>6 && c>6 && a<0 && b<0 && c<0", {
        a: a,
        b: b,
        c: c,
        a: a,
        b: b,
        c: c
    }))
    {
        a--;
    }
}
fs.writeFileSync("conditions2.json", JSON.stringify(conditions));

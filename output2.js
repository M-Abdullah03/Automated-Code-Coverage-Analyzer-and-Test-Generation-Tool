const evaluate = require("./evaluate2.js");
const fs = require("fs");
let conditions = [];
function validateNumbers(a) {
    if(evaluate(conditions, "a>6", {
        a: a
    }))
    {
        return true;
    }
}
validateNumbers(-1);
validateNumbers(7);
fs.writeFileSync("conditions2.json", JSON.stringify(conditions))

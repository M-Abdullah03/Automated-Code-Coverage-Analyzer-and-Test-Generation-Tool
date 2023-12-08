const evaluate = require("./evaluate.js");
const fs = require("fs");
let conditions = [];
function validateNumbers(a) {
    console.log("here");
    if (evaluate(conditions, "a >0", {
        a: a
    }))
    {
        return false;
    }
    return true;
}
validateNumbers(3);
validateNumbers(0);
fs.writeFileSync("conditions.json", JSON.stringify(conditions))
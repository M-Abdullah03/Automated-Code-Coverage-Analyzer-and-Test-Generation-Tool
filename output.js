const fs = require("fs");
const evaluate=require("./evaluate.js");
let conditions =[];
// Your function to test
const h = 100;



function validateNumbers(a, b, c) {
    if (evaluate(conditions,"h == 100", {h})) {
        if (evaluate(conditions,"a % 2 != 0 && b % 2 == 0 || c <= 50", {a, b, c})) {
            
            return true;
        }
        return false;
    }
}

validateNumbers(1, 2, 3);

fs.writeFileSync("conditions.json", JSON.stringify(conditions));
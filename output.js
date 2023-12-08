const evaluate = require("./evaluate.js");
const fs = require("fs");
let conditions = [];
// Your function to test
const h = 10;
function validateNumbers(a, b, c) {
    if (evaluate(conditions, "h == 10", {
        h: h
    })) {
        if (evaluate(conditions, "a % 2 != 0 && b % 2 == 0 || c <= 50", {
            a: a,
            b: b,
            c: c
        })) {
            return true;
        }
        return false;
    }
}
validateNumbers(1, 2, 3);
fs.writeFileSync("conditions.json", JSON.stringify(conditions));
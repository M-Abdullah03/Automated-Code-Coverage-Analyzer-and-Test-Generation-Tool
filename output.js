const evaluate = require("./evaluate.js");
const fs = require("fs");
let conditions = [];
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
    switch (evaluate(conditions, "h", {})) {
    case evaluate(conditions, "1", {}):
        //return true;
    case 2:
        //return false;
    default:
        return false;
    }
}
fs.writeFileSync("conditions.json", JSON.stringify(conditions));

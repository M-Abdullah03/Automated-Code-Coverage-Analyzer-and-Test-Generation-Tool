const evaluate = require("./evaluate.js");
const fs = require("fs");
let conditions = [];
let h = 10;
function validateNumbers(a, b, c) {
    if (evaluate(conditions, "h == 10", {
        h: h
    })) {
        if (evaluate(conditions, "a % 2 != 0 && b % 2 == 0 || c <= 50", {
            a: a,
            b: b,
            c: c
        })) {
            h=1;
            return true;
        }
        return false;
    }
    switch (h) {
    case 1:
        evaluate(conditions, "1==1", {});
    case 2:
        evaluate(conditions, "2==2", {});
    default:
        evaluate(conditions, "'@'=='@'", {});
    }
}
fs.writeFileSync("conditions.json", JSON.stringify(conditions));

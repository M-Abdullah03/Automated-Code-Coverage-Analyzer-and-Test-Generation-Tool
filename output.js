const evaluate = require("./evaluate.js");
const fs = require("fs");
let conditions = [];
function testConditions(a, b, c) {
    if (evaluate(conditions, "a == 1 && b == 2 || c == 2", {
        a: a,
        b: b,
        c: c
    })) {
        if (evaluate(conditions, "a == 1", {
            a: a
        })) {
            if (evaluate(conditions, "b == 2", {
                b: b
            })) {
                return true;
            }
            return true;
        }
    } else if (evaluate(conditions, "a == 0 && b == 2 || c == 3", {
        a: a,
        b: b,
        c: c
    })) {
        return true;
    } else {
        return false;
    }
}

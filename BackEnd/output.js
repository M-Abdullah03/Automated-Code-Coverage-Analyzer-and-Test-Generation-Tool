const evaluate = require("./evaluate.js");
const fs = require("fs");
let conditions = [];
function validateNumbers2(a) {
    if (evaluate(conditions, "a > 6", {
        a: a
    })) {
        return true;
    }
}
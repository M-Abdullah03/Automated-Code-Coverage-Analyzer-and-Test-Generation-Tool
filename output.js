const evaluate = require("./evaluate.js");
const fs = require("fs");
let conditions = [];
function validateNumbers(a) {
    if (evaluate(conditions, "a >0", {
        a: a
    }))
    {
        return false;
    }
    return true;
}

const evaluate = require("./evaluate.js");
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

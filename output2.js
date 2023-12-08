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
validateNumbers(6);
fs.writeFileSync("conditions2.json", JSON.stringify(conditions))
validateNumbers(2);
fs.writeFileSync("conditions2.json", JSON.stringify(conditions))
validateNumbers(-764283.7889503551);
fs.writeFileSync("conditions2.json", JSON.stringify(conditions))
validateNumbers(6);
fs.writeFileSync("conditions2.json", JSON.stringify(conditions))
validateNumbers(-62);
fs.writeFileSync("conditions2.json", JSON.stringify(conditions))
validateNumbers(0);
fs.writeFileSync("conditions2.json", JSON.stringify(conditions))
validateNumbers(6);
fs.writeFileSync("conditions2.json", JSON.stringify(conditions))
validateNumbers(6);
fs.writeFileSync("conditions2.json", JSON.stringify(conditions))
validateNumbers(-93);
fs.writeFileSync("conditions2.json", JSON.stringify(conditions))
validateNumbers(6);
fs.writeFileSync("conditions2.json", JSON.stringify(conditions))
validateNumbers(5);
fs.writeFileSync("conditions2.json", JSON.stringify(conditions))
validateNumbers(9);
fs.writeFileSync("conditions2.json", JSON.stringify(conditions))

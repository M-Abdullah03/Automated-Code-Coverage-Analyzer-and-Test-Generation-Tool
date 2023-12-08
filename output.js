const fs = require("fs");
let conditions = {};
function validateNumbers(a, b, c) {
    while(a>0)
    {
        a--;
    }
    
}

fs.writeFileSync("conditions.json", JSON.stringify(conditions));


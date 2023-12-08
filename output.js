const fs = require("fs");
let conditions = {};
// Your function to test
function testConditions(a, b, c) {
    conditions.condition0 = {
        "a == 0": a == 0,
        "b == 1": b == 1,
        "c == 2": c == 2
    };

    conditions.condition1 = {
        "a == 1": a == 1,
        "b == 2": b == 2,
        "c == 3": c == 3
    };

    if(a == 0 && b == 1 || c == 2) {
        conditions.condition0.condition0 = {
            "a == 1": a == 1
        };

        if(a == 0) {
            conditions.condition0.condition0.condition0 = {
                "b == 2": b == 2
            };

            if(b == 2) {
                return true;
            }
            return true;
        }
        return true;
    }
    else if (a == 1 && b == 2 || c == 3) {
        return true;
    }
     else {
        return false;
    }
}

testConditions(0, 1, 2);

fs.writeFileSync("conditions.json", JSON.stringify(conditions));
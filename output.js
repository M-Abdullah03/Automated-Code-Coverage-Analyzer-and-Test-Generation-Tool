// Your function to test
const fs = require('fs');
function testConditions(a, b, c) {
    fs.appendFileSync("output.json", JSON.stringify({
        "a > 0 ": a > 0
    }) + "\n");

    fs.appendFileSync("output.json", JSON.stringify({
        " b == 2 ": b == 2
    }) + "\n");

    fs.appendFileSync("output.json", JSON.stringify({
        " c == 3": c == 3
    }) + "\n");

    if (a > 0 || b == 2 && c == 3) {
        return true;
    }

    fs.appendFileSync("output.json", JSON.stringify({
        "a == 0 ": a == 0
    }) + "\n");

    fs.appendFileSync("output.json", JSON.stringify({
        " b == 1 ": b == 1
    }) + "\n");

    fs.appendFileSync("output.json", JSON.stringify({
        " c == 2": c == 2
    }) + "\n");

    fs.appendFileSync("output.json", JSON.stringify({
        "a == 1 ": a == 1
    }) + "\n");

    fs.appendFileSync("output.json", JSON.stringify({
        " b == 2 ": b == 2
    }) + "\n");

    fs.appendFileSync("output.json", JSON.stringify({
        " c == 3": c == 3
    }) + "\n");

    if(a == 0 && b == 1 || c == 2) {
        return true;
    }
    else if (a == 1 && b == 2 || c == 3) {
        return true;
    }
     else {
        return false;
    }
}

testConditions(1, 2, 3);


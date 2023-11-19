// Your function to test
const fs = require('fs');
function testConditions(a, b, c) {

    if (a > 0 || b == 2 && c == 3) {
        return true;
    }

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


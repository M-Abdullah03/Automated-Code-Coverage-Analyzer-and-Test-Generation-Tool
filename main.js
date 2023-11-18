// Your function to test
function testConditions(a, b, c) {

    console.log("a is " + a);
    console.log("b is " + b);
    console.log("c is " + c);
    
    if (a > 0 || b == 2 && c == 3) {
        return true;
    }
     else {
        return false;
    }
}

module.exports = testConditions;
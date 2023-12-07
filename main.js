// Your function to test
function testConditions(a, b, c) {

    if(a == 0 && b == 1 || c == 2) {
        if(a == 1) {
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
testConditions(0,1,2);

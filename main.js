// Your function to test
function testConditions(a, b, c) {

    if(a == 1 && b == 2 || c == 2) {
        if(a == 1) {
            if(b == 2) {
                return true;
            }
            return true;
        }
    }
    else if (a == 0 && b == 2 || c == 3) {
        return true;
    }
     else {
        return false;
    }
}
testConditions(33,-800610.5156266342,-71);
testConditions(391653.43015046424,-50,0);

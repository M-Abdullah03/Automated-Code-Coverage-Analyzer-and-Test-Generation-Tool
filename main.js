// Your function to test
function validateNumbers(a, b, c) {
    if(a % 2 == 0 && b % 2 != 0 || c > 50) {
        if(a % 2 == 0) {
            if(b % 2 != 0) {
                return true;
            }
            return true;
        }
    }
    else if (a % 2 != 0 && b % 2 == 0 || c <= 50) {
        return true;
    }
    else {
        return false;
    }
}validateNumbers(-21,28,0);
validateNumbers(0,2,2);
validateNumbers(2,2,60);
validateNumbers(8,2,2,2);
validateNumbers(0,0,-45,,2);

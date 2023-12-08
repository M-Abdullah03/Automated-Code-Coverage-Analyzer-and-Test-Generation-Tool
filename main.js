const fs = require('fs');
function validateNumbers(a) {
    console.log("here");
    while (a > 0 || a < 0) {
        return false;
    }
    if (a != 0) {
        return false;
    }
    else {
        while (a == 0) {
            a--;
        }
        return true;
    }

}

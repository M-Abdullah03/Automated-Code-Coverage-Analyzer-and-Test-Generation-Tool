function validateNumbers2(a) {
    if (a > 6) {
        return true;
    }
}

function validateNumbers(a,b,c){
    if(a>6){
        return true;
    }
    else if(b>6){
        return true;
    }
    else 
        return false;
}

module.exports.validateNumbers2 = validateNumbers2;

module.exports.validateNumbers = validateNumbers;

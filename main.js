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
}validateNumbers(-428873.28753051313,-570448.5396345883,24);
validateNumbers(76,800139.2007762623,599021.0683610186);
validateNumbers(-471191.42633355845,0,11);
validateNumbers(0,1,2);
validateNumbers(1,1,2);
validateNumbers(0,1,2);
validateNumbers(1,1,2);
validateNumbers(0,1,2);
validateNumbers(1,1,2);
validateNumbers(0,1,2);
validateNumbers(1,1,2);
validateNumbers(0,1,2);
validateNumbers(1,1,2);
validateNumbers(0,0,51);
validateNumbers(-207697.73161117287,65,-31);
validateNumbers(-584375.7578455063,65,84);
validateNumbers(-112168.68199464356,0,68);

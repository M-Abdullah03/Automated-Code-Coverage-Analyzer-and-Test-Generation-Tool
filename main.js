const h = 10;
function validateNumbers(a, b, c) {
    if (h == 10) {
        if (a % 2 != 0 && b % 2 == 0 || c <= 50) {
            return true;
        }
        return false;
    }
    switch (h) {
        case 1:
            return true;
        case 2:
            return false;
        default:
            return false;
    }
}

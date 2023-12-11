function validateNumbers2(a) {
    if (a >6) {
        return true;
    }
}
function validateNumbers(a) {
    validateNumbers2(a + 1);
}
function validateNumbers3(a) {
    validateNumbers(a + 1);
}
let a = 0;
validateNumbers(1);

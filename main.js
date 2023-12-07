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
}


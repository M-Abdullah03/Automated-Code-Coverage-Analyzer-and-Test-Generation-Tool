const assert = require('assert');
const {validateNumbers2} = require('./main.js');
const {validateNumbers} = require('./main.js');

describe('testvalidateNumbers2 for statement coverage', function() {
	it('does not throw an error when values are 7', function() {
		try {
			validateNumbers2(7);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

describe('testvalidateNumbers for statement coverage', function() {
	it('does not throw an error when values are 6 50 6', function() {
		try {
			validateNumbers(6, 50, 6);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('does not throw an error when values are 10 -468736.23417466425 6', function() {
		try {
			validateNumbers(10, -468736.23417466425, 6);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('does not throw an error when values are -26 -5 -26', function() {
		try {
			validateNumbers(-26, -5, -26);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

describe('testvalidateNumbers2 for branch coverage', function() {
	it('does not throw an error when values are 92759.86810221024', function() {
		try {
			validateNumbers2(92759.86810221024);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('does not throw an error when values are -5', function() {
		try {
			validateNumbers2(-5);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

describe('testvalidateNumbers for branch coverage', function() {
	it('does not throw an error when values are 6 14 -5', function() {
		try {
			validateNumbers(6, 14, -5);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('does not throw an error when values are -4 6 -42', function() {
		try {
			validateNumbers(-4, 6, -42);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('does not throw an error when values are 94 6 57', function() {
		try {
			validateNumbers(94, 6, 57);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

describe('testvalidateNumbers2 for condition coverage', function() {
	it('does not throw an error when values are 6', function() {
		try {
			validateNumbers2(6);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('does not throw an error when values are 843223.9851670779', function() {
		try {
			validateNumbers2(843223.9851670779);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

describe('testvalidateNumbers for condition coverage', function() {
	it('does not throw an error when values are 8 6 76', function() {
		try {
			validateNumbers(8, 6, 76);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('does not throw an error when values are 3 4 6', function() {
		try {
			validateNumbers(3, 4, 6);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('does not throw an error when values are 6 84 6', function() {
		try {
			validateNumbers(6, 84, 6);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

const assert = require('assert');
const {validateNumbers2} = require('./main.js');

describe('testvalidateNumbers2', function() {
	it('does not throw an error when statement is 59', function() {
		try {
			validateNumbers2(59);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

describe('testvalidateNumbers2', function() {
	it('does not throw an error when branch is 6', function() {
		try {
			validateNumbers2(6);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('does not throw an error when branch is 7', function() {
		try {
			validateNumbers2(7);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

describe('testvalidateNumbers2', function() {
	it('does not throw an error when condition is 58', function() {
		try {
			validateNumbers2(58);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('does not throw an error when condition is 6', function() {
		try {
			validateNumbers2(6);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

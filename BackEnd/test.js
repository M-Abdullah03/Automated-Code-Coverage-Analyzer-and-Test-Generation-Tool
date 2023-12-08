const assert = require('assert');
const {validateNumbers2} = require('./main.js');

describe('testvalidateNumbers2 for statement coverage', function() {
	it('does not throw an error when values are 97', function() {
		try {
			validateNumbers2(97);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

describe('testvalidateNumbers2 for branch coverage', function() {
	it('does not throw an error when values are 6', function() {
		try {
			validateNumbers2(6);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('does not throw an error when values are 8', function() {
		try {
			validateNumbers2(8);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

describe('testvalidateNumbers2 for condition coverage', function() {
	it('does not throw an error when values are 318717.1200550097', function() {
		try {
			validateNumbers2(318717.1200550097);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('does not throw an error when values are -6', function() {
		try {
			validateNumbers2(-6);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

const assert = require('assert');
const {validateNumbers2} = require('./main.js');
const {validateNumbers} = require('./main.js');

describe('Testing validateNumbers2 for statement coverage of 100%', function() {
	it('runs for values 461810.0971004145', function() {
		try {
			validateNumbers2(461810.0971004145);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

describe('Testing validateNumbers for statement coverage of 100%', function() {
	it('runs for values 1, 30', function() {
		try {
			validateNumbers(1, 30);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('runs for values 6, -2', function() {
		try {
			validateNumbers(6, -2);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('runs for values 166047.7167617208, 6', function() {
		try {
			validateNumbers(166047.7167617208, 6);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

describe('Testing validateNumbers2 for branch coverage of 100%', function() {
	it('runs for values 6', function() {
		try {
			validateNumbers2(6);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('runs for values 55', function() {
		try {
			validateNumbers2(55);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

describe('Testing validateNumbers for branch coverage of 100%', function() {
	it('runs for values 6, 75', function() {
		try {
			validateNumbers(6, 75);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('runs for values 95, 6', function() {
		try {
			validateNumbers(95, 6);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('runs for values 6, -1', function() {
		try {
			validateNumbers(6, -1);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

describe('Testing validateNumbers2 for condition coverage of 100%', function() {
	it('runs for values 6', function() {
		try {
			validateNumbers2(6);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('runs for values 35', function() {
		try {
			validateNumbers2(35);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

describe('Testing validateNumbers for condition coverage of 100%', function() {
	it('runs for values -5, 4', function() {
		try {
			validateNumbers(-5, 4);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('runs for values 6, 84', function() {
		try {
			validateNumbers(6, 84);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('runs for values 19, 47', function() {
		try {
			validateNumbers(19, 47);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

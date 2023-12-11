const assert = require('assert');
const {validateNumbers2} = require('./main.js');
const {validateNumbers} = require('./main.js');
const {validateNumbers3} = require('./main.js');

describe('Testing validateNumbers2 for statement coverage of 100%', function() {
	it('runs for values 91', function() {
		try {
			validateNumbers2(91);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

describe('Testing validateNumbers for statement coverage of 100%', function() {
	it('runs for values 585073.1875395371', function() {
		try {
			validateNumbers(585073.1875395371);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

describe('Testing validateNumbers3 for statement coverage of 100%', function() {
	it('runs for values 934364.3617984545', function() {
		try {
			validateNumbers3(934364.3617984545);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

describe('Testing validateNumbers2 for branch coverage of 100%', function() {
	it('runs for values 10', function() {
		try {
			validateNumbers2(10);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('runs for values 6', function() {
		try {
			validateNumbers2(6);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

describe('Testing validateNumbers for branch coverage of 100%', function() {
	it('runs for values 6', function() {
		try {
			validateNumbers(6);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('runs for values -3', function() {
		try {
			validateNumbers(-3);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

describe('Testing validateNumbers3 for branch coverage of 100%', function() {
	it('runs for values 6', function() {
		try {
			validateNumbers3(6);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('runs for values 1', function() {
		try {
			validateNumbers3(1);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

describe('Testing validateNumbers2 for condition coverage of 100%', function() {
	it('runs for values 1', function() {
		try {
			validateNumbers2(1);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('runs for values 70', function() {
		try {
			validateNumbers2(70);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

describe('Testing validateNumbers for condition coverage of 100%', function() {
	it('runs for values -4', function() {
		try {
			validateNumbers(-4);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('runs for values 46', function() {
		try {
			validateNumbers(46);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

describe('Testing validateNumbers3 for condition coverage of 100%', function() {
	it('runs for values 1', function() {
		try {
			validateNumbers3(1);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('runs for values 6', function() {
		try {
			validateNumbers3(6);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

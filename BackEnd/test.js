const assert = require('assert');
const {main} = require('./main.js');

describe('Testing main for statement coverage of 100%', function() {
	it('runs for values 0, 1, 0', function() {
		try {
			main(0, 1, 0);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('runs for values 8, 25, 92', function() {
		try {
			main(8, 25, 92);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('runs for values 1, 0, 0', function() {
		try {
			main(1, 0, 0);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

describe('Testing main for branch coverage of 100%', function() {
	it('runs for values 6, 1, 0', function() {
		try {
			main(6, 1, 0);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('runs for values 59, 0, 0', function() {
		try {
			main(59, 0, 0);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('runs for values 0, 6, 378131.96237169596', function() {
		try {
			main(0, 6, 378131.96237169596);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

describe('Testing main for condition coverage of 100%', function() {
	it('runs for values -92, 6, 1', function() {
		try {
			main(-92, 6, 1);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('runs for values 27, 0, 590173.8029917759', function() {
		try {
			main(27, 0, 590173.8029917759);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('runs for values 1, 1, 6', function() {
		try {
			main(1, 1, 6);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

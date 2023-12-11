const assert = require('assert');
const {main} = require('./main.js');

describe('testmain for statement coverage', function() {
	it('does not throw an error when values are 10 4 479963.1634109808', function() {
		try {
			main(10, 4, 479963.1634109808);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('does not throw an error when values are 0 0 -47', function() {
		try {
			main(0, 0, -47);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('does not throw an error when values are 1 1 1', function() {
		try {
			main(1, 1, 1);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

describe('testmain for branch coverage', function() {
	it('does not throw an error when values are 1 -1 668293.3131204504', function() {
		try {
			main(1, -1, 668293.3131204504);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('does not throw an error when values are 0 0 6', function() {
		try {
			main(0, 0, 6);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('does not throw an error when values are 85 1 6', function() {
		try {
			main(85, 1, 6);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

describe('testmain for condition coverage', function() {
	it('does not throw an error when values are 14 6 6', function() {
		try {
			main(14, 6, 6);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('does not throw an error when values are 1 1 77', function() {
		try {
			main(1, 1, 77);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
	it('does not throw an error when values are -20 0 -46', function() {
		try {
			main(-20, 0, -46);
		} catch (error) {
			expect(false).toBe(true);
		}
	});
});

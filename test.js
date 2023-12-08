const assert = require('assert');
const validateNumbers = require('./main.js');

describe('testConditions', function() {
    it('returns true when a is 0', function() {
        assert.strictEqual(validateNumbers(1, 1, 2), true);
    });
});
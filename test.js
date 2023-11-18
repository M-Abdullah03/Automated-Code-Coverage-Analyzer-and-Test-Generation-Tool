const assert = require('assert');
const testConditions = require('./main.js');

describe('testConditions', function() {
    it('returns true when a is 0', function() {
        assert.strictEqual(testConditions(0, 1, 1), true);
    });
});
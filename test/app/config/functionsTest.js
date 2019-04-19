'use strict';

const mocha = require('mocha');
const assert = require('chai').assert;

const functions = require('../../../app/config/functions');

describe('functions', function() {
    it('testing calculateBeeline()', function() {
        assert.equal(functions.calculateBeeline(0, 0, 0, 0), 0);
        assert.equal(functions.calculateBeeline("0", "0", "0", "0"), 0);
        assert.approximately(functions.calculateBeeline(40, 40, 50, 50), 1360000, 1000);
    });

    it('testing validateCoordinates()', function() {
        assert.isTrue(functions.validateCoordinates(42.4618335,10.1732022));
        assert.isTrue(functions.validateCoordinates(25.5168439,85.8473143));
        assert.isTrue(functions.validateCoordinates(-59.9308326,102.9034462));
        assert.isTrue(functions.validateCoordinates(-30.4494107,0.9204436));
        assert.isTrue(functions.validateCoordinates("53.9097501","-133.5033509"));

        assert.isFalse(functions.validateCoordinates(100, 0));
        assert.isFalse(functions.validateCoordinates(0, 200));
        assert.isFalse(functions.validateCoordinates(-100, -200));
        assert.isFalse(functions.validateCoordinates("asd", "bb"));
        assert.isFalse(functions.validateCoordinates(undefined, undefined));
        assert.isFalse(functions.validateCoordinates(null, NaN));
    })
});
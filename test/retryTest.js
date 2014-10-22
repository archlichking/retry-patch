var expect = require("chai").expect;
var Patch = require('../retryPatch');

describe("retry patch", function() {
    describe('nested', function() {

        it("xxxx [CS1412444]", function(done) {
            expect(2).to.equal(1);
            done()
        })
    })
    it("no failed case", function(done) {
        expect(2).to.equal(2);
        done()
    })

})
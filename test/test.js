var Patch = require('../retryPatch');
var expect = require("chai").expect;

describe("test for patch", function() {

    it("2 match", function(done) {
        var p = new Patch(__dirname + '/2fails.json', __dirname + '/retryTest.js');
        p.run(function(tests) {
            expect(tests.retry.status).to.equal(1);
            done();
        });

    });

    it("1 matches", function(done) {
        var p = new Patch(__dirname + '/1fails.json', __dirname + '/retryTest.js');
        p.run(function(tests) {
            expect(tests.retry.status).to.equal(1);
            done();
        });
    });

     it("no match", function(done) {
        var p = new Patch(__dirname + '/0fails.json', __dirname + '/retryTest.js');
        p.run(function(tests) {
            expect(tests.retry).to.equal(undefined);
            done();
        });

    });
})
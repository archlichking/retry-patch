var Mocha = require('mocha');
var fs = require('fs');
var path = require('path');

var internals = {};

internals.RetryPatch = function(report, file) {
    this.testFile = file;
    // string -> array
    this.reportFile = report;

    this.tests = require(report);

    var failures = [];
    for (var f in this.tests.failures) {
        failures.push(this._escapeRegexp(this.tests.failures[f].title));
    }

    this.mocha = new Mocha({
        // grep: failures.join('|'),
        grep: new RegExp(failures.join('|')),
        reporter: 'json',
        timeout: 500000
    });


    var dir = path.dirname(file);
    var self = this;
    fs.readdirSync(dir).filter(function(file) {
        // Only keep the .js files
        return file.substr(-3) === '.js';

    }).forEach(function(file) {
        // Use the method "addFile" to add the file to mocha
        self.mocha.addFile(
            path.join(dir, file)
        );
    });

};

internals.RetryPatch.prototype._escapeRegexp = function(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    // return str;
}

internals.RetryPatch.prototype.run = function(callback) {
    if (this.tests.failures.length == 0) {
        return callback(this.tests);
    }

    var self = this;
    var runner = this.mocha.run(function(failures) {
        if(!runner){
            return callback(self.tests);
        }
        console.log(failures);
        console.log(runner);
        var stats = runner.stats;
        var retry = {
            status: 1,
            report: stats
        };
        if (stats.tests == stats.passes && stats.pending == 0 && stats.failures == 0) {
            // originalReport is retry-pass
            retry.status = 0;
        }

        self.tests.retry = retry;

        return callback(self.tests);
    })

};

internals.RetryPatch.prototype.write = function(callback) {
    var self = this;

    fs.writeFile(this.reportFile, JSON.stringify(this.tests), function(err) {
        callback(err);
    });
};

module.exports = internals.RetryPatch;
// for running
var Patch = require('./retryPatch');
var path = require('path');

if (process.argv.length < 4) {
    console.log('usage: \'node retryPatch.js MOCHA_JSON_REPORT_FILE [MOCHA_TEST_FILE1, ...] \'');
    process.exit(1);
}

var files = [];
process.argv.slice(3).forEach(function(file){
	files.push(path.resolve(process.cwd(), file));
});

var MOCHA_TEST_FILES = files;
var MOCHA_JSON_REPORT_FILE = path.resolve(process.cwd(), process.argv[2]);

var p = new Patch(MOCHA_JSON_REPORT_FILE, MOCHA_TEST_FILES);

p.run(function() {
    p.write(function(err) {
        if (err) {
            process.exit(err);
        }

        process.exit();
    })
});
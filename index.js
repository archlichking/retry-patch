// for running
var Patch = require('./retryPatch');

if (process.argv.length < 4) {
    console.log('usage: \'node retryPatch.js MOCHA_JSON_REPORT_FILE MOCHA_TEST_FILE \'');
    process.exit(1);
}

var MOCHA_TEST_FILE = process.argv[3];
var MOCHA_JSON_REPORT_FILE = process.argv[2];

var p = new Patch(MOCHA_JSON_REPORT_FILE, MOCHA_TEST_FILE);

p.run(function() {
    p.write(function(err) {
        if (err) {
            process.exit(err);
        }

        process.exit();
    })
});
var server = require("../server.js");

exports.testNothing = function(test) {
	test.ok(server.number, 3);
	test.done();
}

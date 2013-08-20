var server = require("../server.js");

exports.testNothing = function(test) {
	test.equal(3, server.number(), "failed assertion on server.number");
	test.done();
}

var server = require("../server.js");
var http = require('http');

exports.tearDown = function(done) {
	server.stop(function() {
		done();
	});
};

exports.testHTTPServer = function(test) {
	server.start();
	http.get('http://localhost:8081', function(res) {
		test.done();
	});
};

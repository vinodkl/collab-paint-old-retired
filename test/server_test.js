var server = require("../src/server.js");
var http = require('http');
var fs = require('fs');
var assert = require('assert');

var TEST_FILE = "./test.html";
var TEST_404_FILE = "./test_404.html";

var PORT = "8082";

exports.tearDown = function(done) {
	cleanUp(TEST_FILE);
	cleanUp(TEST_404_FILE);
	done();
};

exports.test_serverServesFromGivenFile = function(test) {
	var testData = "this is a test data";

	fs.writeFileSync(TEST_FILE, testData);
	httpGet('http://localhost:' + PORT + '/index.html', function(res, resData){
		test.equals(200, res.statusCode, "status not 200");
		test.equals(testData, resData, "response not same as in file");
		test.done();
	});

};

exports.test_returns404FromFileForEverythingExceptHomePage = function(test) {
	var expectedData = "This is 404 page file";
	fs.writeFileSync(TEST_404_FILE, expectedData);

	httpGet("http://localhost:" + PORT + "/bargle", function(response, responseData) {
		test.equals(404, response.statusCode, "status code");
		test.equals(expectedData, responseData, "404 text");
		test.done();
	});
};

exports.test_returnsHomePageWhenAskedForIndex = function(test) {
	var testDir = "generated/test";
	fs.writeFileSync(TEST_FILE, "foo");

	httpGet("http://localhost:" + PORT + "/index.html", function(response, responseData) {
		test.equals(200, response.statusCode, "status code");
		test.done();
	});
};

exports.test_requiresHomePageParameter = function(test) {
	test.throws(function() {
		server.start();
	});
	test.done();
};

exports.test_requires404PageParameter = function(test) {
	test.throws(function() {
		server.start(TEST_FILE);
	});
	test.done();
};

exports.test_requiresPortParameter = function(test) {
	test.throws(function() {
		server.start(TEST_FILE, TEST_404_FILE);
	});
	test.done();
};

exports.test_runsCallbackWhenStopCompletes = function(test) {
	server.start(TEST_FILE, TEST_404_FILE, PORT);
	server.stop(function() {
		test.done();
	});
};

exports.test_stopThrowsExceptionWhenNotRunning = function(test) {
	test.throws(function() {
		server.stop();
	});
	test.done();
};

function httpGet(url, callback) {
	server.start(TEST_FILE, TEST_404_FILE, PORT, function() {
		var req = http.get(url);

		req.on('response', function(res) {
			var recieveData = "";
			res.setEncoding('utf-8');

			res.on('data', function(chunk) {
				recieveData += chunk;
			});

			res.on('end', function(){
				server.stop(function() {
					callback(res, recieveData);
				});
			});	
		});
	});
}

function cleanUp(filename) {
	if (fs.existsSync(filename)) {
		fs.unlinkSync(filename);
		assert.ok(!fs.existsSync(filename), "could not delete test file: [" + filename + "]");
	}	
}

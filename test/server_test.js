var server = require("../server.js");
var http = require('http');
var fs = require('fs');
var assert = require('assert');

var TEST_FILE = "./test.html";

var PORT = "8081";

exports.tearDown = function(done) {
	if (fs.existsSync(TEST_FILE)) {
		fs.unlinkSync(TEST_FILE);
		assert.ok(!fs.existsSync(TEST_FILE), "could not delete test file: [" + TEST_FILE + "]");
	}
	done();
};

// exports.testHTTPServer = function(test) {
// 	server.start(PORT);
// 	http.get('http://localhost:8081', function(res) {
// 		test.done();
// 	});
// };

// exports.test_serverStartRequiresPortnumber = function(test) {
// 	test.throws(function(){
// 		server.start();
// 	});
// 	test.done();
// };

// exports.test_serverReturnsData = function(test) {
// 	server.start(PORT);
// 	var request = http.get('http://localhost:8081');
// 	request.on('response', function(response) {
// 		var receiveData = false;
// 		test.equal(200, response.statusCode, "status code is not 200");
// 		response.on('data', function(chunk) {
// 			receiveData = true;
// 		});

// 		response.on('end', function(){
// 			test.equals(receiveData, true, "data not recieved");
// 			test.done();
// 		});
		
// 	});
// }

function httpGET(url, callback) {
	server.start(TEST_FILE, 8081);
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
}

exports.test_serverServesFromGivenFile = function(test) {
	var testData = "this is a test data";

	fs.writeFileSync(TEST_FILE, testData);
	httpGET('http://localhost:8081/index.html', function(res, resData){
		test.equals(200, res.statusCode, "status not 200");
		test.equals(testData, resData, "response not same as in file");
		test.done();
	});

};
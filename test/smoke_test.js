"use strict";

var http = require('http');
var procfile = require("procfile");
var fs = require("fs");
var child_process = require('child_process');

var TEST_FILE = "./test.html";
var TEST_404_FILE = "./test_404.html";

var PORT = "5000";
var process;

exports.tearDown = function(done) {
	process.on("exit", function(code, signal) {
		done();
	});
	process.kill();
};

function httpGet(url, callback) {
	//server.start(TEST_FILE, TEST_404_FILE, PORT, function() {
		var req = http.get(url);

		req.on('response', function(res) {
			var recieveData = "";
			res.setEncoding('utf-8');

			res.on('data', function(chunk) {
				recieveData += chunk;
			});

			res.on('end', function(){
				callback(res, recieveData);
			});	
		});
	//});
}

function runServer(nodeArgs) {
	var commandLine = parseProcFile();

	// process = child_process.spawn("node", nodeArgs);
	process = child_process.spawn(commandLine.command, commandLine.options);
	process.stdout.on("data", function(chunk) {
		console.log('server stdout ' + chunk);
	});

	process.stderr.on("data", function(chunk) {
		console.log('server stderr ' + chunk);
	});

	process.on('exit' , function(code, signal) {
		console.log('server process exited with ' + code + ' and signal ' + signal);
	});	
}

function parseProcFile() {
	var fileData = fs.readFileSync("../Procfile", "utf8");
	var webCommand = procfile.parse(fileData).web;
	webCommand.options = webCommand.options.map(function(element) {
		if (element === "$PORT") return "5000";
		else return element;
	});
	return webCommand;
}

exports.test_for_smoke = function(test) {
	runServer(['../src/collabpaint', PORT]);
	setTimeout(function() {
		var url = 'http://localhost:' + PORT;
		console.log(url);
		httpGet(url, function(response, recieveData) {
			test.done();
		});
	}, 1000);
}
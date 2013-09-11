"use strict";

var http = require('http');
var fs = require('fs');
var server,
	match,
	match1;
var VENDOR_JS_PATH = "./vendor_lib/";

exports.start = function(indexFile, fileNotFoundPage, portNumber, callback) {

	if(!portNumber) throw 'port number required to start server';

	server = http.createServer();

	server.on('request', function(req, res) {
		match = req.url.match(/\/vendor_lib\/([\d\w\.\-]+)/);
		match1 = req.url.match(/\/([\d\w\.\-]+)js/);
		
		if(req.url === "/" || req.url === "/index.html") {
			res.statusCode = 200;
			serveFile(res, indexFile);
		} else if(match) {
			res.statusCode = 200;
			serveFile(res, VENDOR_JS_PATH + match[1]);
		} else if(match1) {
			res.statusCode = 200;
			serveFile(res, match[1] + "js");
		} else {
			res.statusCode = 404;
			serveFile(res, fileNotFoundPage);
		}
	});

	server.listen(portNumber, callback);
};

exports.stop = function(callback) {
	server.close(callback);
};

function serveFile(response, indexFile) {
	fs.readFile(indexFile, function(err, data) {
		if(err) throw err;
		response.end(data);
	});
}
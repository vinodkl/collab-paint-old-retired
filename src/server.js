"use strict";

var http = require('http');
var fs = require('fs');
var server;

exports.start = function(indexFile, fileNotFoundPage, portNumber, callback) {

	if(!portNumber) throw 'port number required to start server';

	server = http.createServer();
	server.on('request', function(req, res) {
		if(req.url === "/" || req.url === "/index.html") {
			res.statusCode = 200;
			serveFile(res, indexFile);
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
"use strict";

var http = require('http');
var fs = require('fs');
var server = http.createServer();

exports.start = function(fileToServer, portNumber) {	
	
	if(!portNumber) throw 'port number required to start server';
	
	server.on('request', function(req, res) {
		if(req.url === "/" || req.url === "/index.html") {
			fs.readFile(fileToServer, function(err, data) {
				if(err) throw err;
				res.end(data);
			});
		} else {
			res.statusCode = 404;
			res.end('Page not found');

		}
	});

	server.listen(portNumber);
};

exports.stop = function(callback) {
	server.close(callback);
};
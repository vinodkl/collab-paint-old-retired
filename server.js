"use strict";

var http = require('http');
var server = http.createServer();

exports.start = function() {	
	
	server.on('request', function(req, res) {
		var body = "<html><head><title></title></head>" +
					"<body><p>Node server running</p></body></html>";
		res.end(body);
	});

	server.listen(8081);
};

exports.stop = function(callback) {
	server.close(callback);
};
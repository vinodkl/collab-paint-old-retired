(function() {
	"use strict";
	var CONTENT_DIR = '../src/content/';

	var server = require("./server.js");
	var port = process.argv[2];

	server.start(CONTENT_DIR + 'index.html', CONTENT_DIR + '404.html', port, function(){
		console.log('server started');
	});
}());
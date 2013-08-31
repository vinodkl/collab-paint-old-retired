desc('Lint everything');

task('node', [], function() {
	var command = "node --version",
		requiredVersion = "v0.8.4\n",
		stdout = '';

	console.log('> '+ command);

	var process = jake.createExec(command, {printStdout: true, printStderr:true});

	process.on('stdout', function(chunk) {
		stdout += chunk;
	});

	process.on('cmdEnd', function() {
		console.log(stdout);
		if(stdout != requiredVersion) {
			fail('please use node version : '+ requiredVersion);
		}
		complete();
	});

	process.run();
}, {async: true});

task('lint', ["node"], function() {
	var lint = require("./lint_runner.js");
	
	var files = new jake.FileList();
	files.include("**/*.js");
	files.exclude("build");
	
	var options = {
		node: true
	};
	var lintResult = lint.validateFileList(files.toArray(), options, {});
	if(!lintResult) {
		fail('lint failed');
	}
	console.log(">>>JS lint completed<<<");
});

desc('Build and Test everything');
task('test', ["node"], function() {
	var reporter = require('nodeunit').reporters['default'];
	reporter.run(['../test'], null, function(failures) {
		console.log('>>>unit tests completed<<<');
		complete();
	});
}, {async : true});

task('default', ["lint", "test"]);

desc('Integration block');
task('integration', ["default"], function() {
	console.log('integration block');
	console.log('=================');
	console.log('1.git status is clean');
	console.log('2.build on integration branch');
	console.log('a. goto integration box');
	console.log('b. git pull');
	console.log('c. jake');
	console.log('d. if jake fails, then stop and fix and run again');
	console.log('3. git checkout integration');
	console.log('4. git merge master --no-ff --log');
	console.log('5. git checkout master switch back to master');
});
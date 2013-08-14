desc('Lint everything');

task('lint', [], function() {
	var lint = require("./lint_runner.js");
	
	var files = new jake.FileList();
	files.include("**/*.js");
	files.exclude("build");
	
	var options = {
		node: true
	};
	lint.validateFileList(files.toArray(), options, {}) || fail('lint failed');
});

desc('Build and Test everything');
task('default', ["lint"]);

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
desc('Lint everything');

task('lint', [], function() {
	var lint = require("./lint_runner.js");
	
	var files = new jake.FileList();
	files.include("**/*.js");
	files.exclude("build");
	
	var options = {
		node: true
	};
	lint.validateFileList(files.toArray(), options, {});
});

desc('Build and Test everything');
task('default', ["lint"]);

desc('Integration block');
task('integration', ["default"], function() {
	console.log('integration block');
});
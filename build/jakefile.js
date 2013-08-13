desc('default');

task('default', ["lint"]);

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
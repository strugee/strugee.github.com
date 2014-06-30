module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				force: true
			},
			all: ['Gruntfile.js', 'js/*.js']
		},
		
		csslint: {
			lax: {
				src: ['css/main.css', 'css/nightmode.css', 'css/ie9.css']
			}
		}
		
		
	});
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	
	grunt.registerTask('lint', ['jshint', 'csslint']);
	grunt.registerTask('default', ['lint']);
};

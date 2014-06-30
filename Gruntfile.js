module.exports = function(grunt) {
	grunt.initConfig({
		'pkg': grunt.file.readJSON('package.json'),
		'jshint': {
			'options': {
				'force': true
			},
			'all': ['Gruntfile.js', 'js/*.js']
		},
		
		'csslint': {
			'lax': {
				'src': ['css/main.css', 'css/nightmode.css', 'css/ie9.css']
			}
		},
		'static_handlebars': {
			'options':
		}
		/*
		'template': {
			'options': {
				
			},
			'main-site': {
				'options': {
					
				},
				'files': {
					'dist/index.html': ['src/index.html.tpl']
				}
			}
		}
		*/
	});
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-static-handlebars');
	
	grunt.registerTask('lint',
		[
		'jshint',
		'csslint'
		]
	);
	grunt.registerTask('build',
		[
		'static-handlebars'
		]
	);
	grunt.registerTask('default',
		[
		'lint'
		]
	);
};

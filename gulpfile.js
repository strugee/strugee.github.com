var gulp = require('gulp');

var jshint = require('gulp-jshint');

/* Regular tasks */

/* TODO: validate HTML */

gulp.task('csslint', function() {
	
});

gulp.task('jshint', function() {
	gulp.src(['js/*.js', '!vendor/*', '!plugins.js'])
	    .pipe(jshint());
});

/* Helper tasks */

gulp.task('lint', ['csslint', 'jshint'], function() {
	
});

/* Default task */

gulp.task('default', [, 'lint'], function() {
	
});

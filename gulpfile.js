var gulp = require('gulp');

var jshint = require('gulp-jshint');
var rev = require('gulp-rev')

/* Regular tasks */

/* TODO: validate HTML */

gulp.task('build', function() {
	gulp.src(['css/*.css'])
	    .pipe(rev())
	    .pipe(gulp.dest('dist/css'))
	    .pipe(rev.manifest())
	    .pipe(gulp.dest('dist/css'));
});

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

gulp.task('default', ['build', 'lint'], function() {
	
});

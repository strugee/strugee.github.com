var gulp = require('gulp');

var fs = require('fs');

var handlebars = require('gulp-build');
var jshint = require('gulp-jshint');

/* Regular tasks */

/* TODO: validate HTML */

gulp.task('csslint', function() {
	
});

gulp.task('jshint', function() {
	gulp.src(['js/*.js', '!vendor/*', '!plugins.js'])
	    .pipe(jshint());
});

gulp.task('handlebars', function() {
	gulp.src('index.html')
	    .pipe(gulp.dest('dist/'));
});

/* Helper tasks */

gulp.task('lint', ['csslint', 'jshint'], function() {
	
});

/* Default task */

gulp.task('default', ['handlebars', 'lint'], function() {
	
});

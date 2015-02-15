var gulp = require('gulp');

var jade = require('gulp-jade');
var filter = require('gulp-filter');
var jshint = require('gulp-jshint');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var rename = require('gulp-rename');

/* Regular tasks */

/* TODO: validate HTML */

gulp.task('html', function() {
	gulp.src(['src/hacks/*.jade'])
	    .pipe(jade({ pretty: true }))
	    .pipe(rename({ extname: '.html' }))
	    .pipe(gulp.dest('./hacks'));
	return gulp.src(['src/*.jade'])
	           .pipe(jade({ pretty: true }))
	           .pipe(rename({ extname: '.html' }))
	           .pipe(gulp.dest('.'));
});

gulp.task('css', function() {
	gulp.src('src/styles/*')
	    .pipe(gulp.dest('css'));
	gulp.src('css/*')
	    .pipe(gulp.dest('./css'));
});

gulp.task('font', function() {
	return gulp.src('font/*')
	           .pipe(gulp.dest('dist/font'));
});

gulp.task('js', function() {
	return gulp.src('js/*')
	           .pipe(gulp.dest('dist/js'));
});


});

gulp.task('csslint', function() {

});

gulp.task('jshint', function() {
	gulp.src(['js/*.js', '!vendor/*', '!plugins.js'])
	    .pipe(jshint());
});

/* Helper tasks */

gulp.task('build', ['html', 'css', 'js', 'font', 'blog'], function() {

});

gulp.task('lint', ['csslint', 'jshint'], function() {

});

/* Default task */

gulp.task('default', ['build', 'lint'], function() {

});

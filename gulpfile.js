var gulp = require('gulp');

var filter = require('gulp-filter');
var jshint = require('gulp-jshint');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');

/* Regular tasks */

/* TODO: validate HTML */

gulp.task('build', function() {
	var jsFilter = filter('**/*.js');
	var cssFilter = filter('**/*.css');
	
	gulp.src('index.html')
	    .pipe(useref.assets())      // Concatenate with gulp-useref
	    .pipe(jsFilter)
	    .pipe(uglify())             // Minify any javascript sources
	    .pipe(jsFilter.restore())
	    .pipe(cssFilter)
	    .pipe(csso())               // Minify any CSS sources
	    .pipe(cssFilter.restore())
	    .pipe(rev())                // Rename the concatenated files
	    .pipe(useref.restore())
	    .pipe(useref())
	    .pipe(revReplace())         // Substitute in new filenames
	    .pipe(gulp.dest('dist'));
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

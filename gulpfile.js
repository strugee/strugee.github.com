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


gulp.task('build', function() {
	/* legacy build logic */

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

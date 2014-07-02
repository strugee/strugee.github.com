var gulp = require('gulp');
var handlebars = require('gulp-build');
var fs = require('fs');

var options = {
	partials: [{
		name: 'footer',
		tpl: fs.readFileSync('license.html', {
		                                 	encoding: 'utf8'
		                                 })
	}]
}

/* Regular tasks */

/* TODO: validate HTML */

gulp.task('csslint', function() {
	
});

gulp.task('jshint', function() {
	gulp.src(['js/*.js', '!vendor/*', '!plugins.js'])
	    .pipe(
});

gulp.task('handlebars', function() {
	gulp.src('index.html')
	    .pipe(handlebars({}, options))
	    .pipe(gulp.dest('dist/'));
});

/* Helper tasks */

gulp.task('lint', ['csslint', 'jshint'], function() {
	
});

/* Default task */

gulp.task('default', ['handlebars', 'lint'], function() {
	
});

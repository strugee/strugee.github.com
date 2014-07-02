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

gulp.task('handlebars', function() {
	gulp.src('index.html')
	    .pipe(handlebars({}, options))
	    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['handlebars'], function() {
	
});

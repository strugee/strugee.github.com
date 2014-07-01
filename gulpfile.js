var gulp = require('gulp');
var build = require('gulp-build');

var options = {
	partials: [{
		name: 'footer',
		tpl: 'something'
	}]
}

gulp.task('build', function() {
	gulp.src('./index.html')
	    .pipe(build({}, options))
	    .pipe(gulp.dest('dist/'));
});

gulp.task('default', function() {
	
});

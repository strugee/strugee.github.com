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
var frontMatter = require('gulp-front-matter');
var markdown = require('gulp-markdown');

/* Shared configurations */

/* Build tasks */

/* TODO: validate HTML */

gulp.task('html', function() {
	gulp.src(['src/hacks/*.jade'])
	    .pipe(jade({ pretty: true }))
	    .pipe(rename({ extname: '.html' }))
	    .pipe(gulp.dest('./hacks'));
	gulp.src(['src/cryptoparty-seattle/*.jade'])
	    .pipe(jade({ pretty: true }))
	    .pipe(rename({ extname: '.html' }))
	    .pipe(gulp.dest('./cryptoparty-seattle'));
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

gulp.task('images', function() {
	return gulp.src('src/images/*')
	           .pipe(gulp.dest('images'));
});

gulp.task('font', function() {
	return gulp.src('font/*')
	           .pipe(gulp.dest('dist/font'));
});

gulp.task('js', function() {
	return gulp.src('js/*')
	           .pipe(gulp.dest('dist/js'));
});

gulp.task('post-index', function() {

});

gulp.task('posts', function() {
	gulp.src('src/blog/*.md')
	    .pipe(markdown())
	    .pipe(gulp.dest('dist/blog'));
});

gulp.task('rss', function() {
	gulp.src('src/posts/*.md')
	    .pipe(frontMatter())
	.pipe(rss({
		render: 'rss-2.0',
		title: 'fancy blog title',
	}))
	.pipe(gulp.dest('dist/posts/rss.xml'));
});

/* Lint tasks */

gulp.task('csslint', function() {

});

gulp.task('jshint', function() {
	gulp.src(['js/*.js', '!vendor/*', '!plugins.js'])
	    .pipe(jshint());
});

/* Helper tasks */

gulp.task('blog', ['postindex', 'posts', 'rss'], function() {

});

gulp.task('build', ['html', 'css', 'js', 'font', 'blog'], function() {

});

gulp.task('lint', ['csslint', 'jshint'], function() {

});

gulp.task('watch', function() {
	gulp.watch('src/*.jade', ['html']);
	gulp.watch('src/styles/*.stylus', ['css']);
	gulp.watch('src/js/*.js', ['js']);
	gulp.watch('src/posts/*.md', ['blog']);
});

/* Default task */

gulp.task('default', ['build', 'lint'], function() {

});

'use strict';

var gulp = require('gulp');

var jade = require('gulp-jade');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var frontMatter = require('gulp-front-matter');
var remark = require('gulp-remark');
var remarkHtml = require('remark-html');
var adjustHeaders = require('remark-rewrite-headers');
var parse = require('stratic-parse-header');
var straticToJson = require('stratic-post-to-json-data');
var jadeTemplate = require('gulp-jade-template');
var dateInPath = require('stratic-date-in-path');
var postsToIndex = require('stratic-posts-to-index');
var ghpages = require('gh-pages');
var path = require('path');
var gutil = require('gulp-util');
var sort = require('gulp-sort');
var stylus = require('gulp-stylus');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var addsrc = require('gulp-add-src');

/* eslint-env node */

/* Shared configurations */

/* Build tasks */

/* TODO: validate HTML */

gulp.task('html', function() {
	gulp.src(['src/hacks/*.jade'])
	    .pipe(jade({ pretty: true }))
	    .pipe(rename({ extname: '.html' }))
	    .pipe(gulp.dest('dist/hacks'));
	gulp.src(['src/cryptoparty-seattle/*.jade'])
	    .pipe(jade({ pretty: true }))
	    .pipe(rename({ extname: '.html' }))
	    .pipe(gulp.dest('dist/cryptoparty-seattle'));
	return gulp.src(['src/*.jade'])
	           .pipe(jade({ pretty: true }))
	           .pipe(rename({ extname: '.html' }))
	           .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
	gulp.src('src/styles/*')
	    .pipe(stylus())
	    .pipe(rename({ extname: '.css' }))
	    .pipe(gulp.dest('dist/css'));
	gulp.src('css/*')
	    .pipe(gulp.dest('dist/css'));
});

gulp.task('images', function() {
	return gulp.src('src/images/*')
	           .pipe(gulp.dest('dist/images'));
});

gulp.task('font', function() {
	return gulp.src('font/*')
	           .pipe(gulp.dest('dist/font'));
});

gulp.task('js', function() {
	gulp.src(['src/js/*.js', '!src/js/main.js']).pipe(gulp.dest('./dist/js'));
	return browserify({ entries: 'src/js/main.js', debug: true, transform: [] }).bundle()
	        .pipe(source('main.js'))
	        .pipe(gulp.dest('./dist/js'));
});

gulp.task('post-index', function() {
	return gulp.src('src/blog/*.md')
	           .pipe(parse())
	           .pipe(remark().use(remarkHtml).use(adjustHeaders))
	           .pipe(dateInPath())
	           .pipe(addsrc('src/blog/index.jade'))
	           .pipe(postsToIndex('index.jade'))
	           .pipe(jade({pretty: true, basedir: __dirname}))
	           .pipe(rename({ extname: '.html' }))
	           .pipe(gulp.dest('dist/blog'));
});

gulp.task('posts', function() {
	return gulp.src('src/blog/*.md')
	           .pipe(parse())
	           .pipe(remark().use(remarkHtml))
	           .pipe(dateInPath())
	           .pipe(straticToJson())
	           .pipe(jadeTemplate('src/blog/post.jade'))
	           .pipe(rename({ extname: '.html' }))
	           .pipe(gulp.dest('dist/blog'));
});

gulp.task('rss', function() {
	gulp.src('src/posts/*.md')
	    .pipe(frontMatter())
	.pipe(gulp.dest('dist/posts/rss.xml'));
});

gulp.task('misc', function() {
	gulp.src(['.gitmodules', 'COPYING', 'favicon.ico', 'humans.txt', 'robots.txt', 'sitemap.xml', 'CNAME'])
	    .pipe(gulp.dest('dist'));
});

/* Lint tasks */

gulp.task('csslint');

gulp.task('jshint', function() {
	gulp.src(['src/js/*.js', '!vendor/*', '!plugins.js'])
	    .pipe(jshint());
});

/* Helper tasks */

gulp.task('blog', ['posts','post-index', 'rss']);

gulp.task('build', ['html', 'css', 'js', 'font', 'images', 'blog', 'misc']);

gulp.task('lint', ['csslint', 'jshint']);

gulp.task('deploy', ['build'], function(done) {
	ghpages.publish(path.join(__dirname, 'dist'), { logger: gutil.log, branch: 'master' }, done);
});

gulp.task('watch', ['build'], function() {
	gulp.watch('src/*.jade', ['html']);
	gulp.watch(['src/blog/*.md', 'src/blog/*.jade'], ['blog']);
	gulp.watch('src/includes/*.jade', ['html', 'blog']);
	gulp.watch('src/styles/*.styl', ['css']);
	gulp.watch('src/js/*.js', ['js']);
});

/* Default task */

gulp.task('default', ['build', 'lint']);

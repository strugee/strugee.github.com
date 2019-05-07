'use strict';

var gulp = require('gulp');

var http = require('http');
var path = require('path');
var jade = require('gulp-pug');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var remark = require('gulp-remark');
var remarkHtml = require('remark-html');
var adjustHeaders = require('remark-rewrite-headers');
var slug = require('remark-slug');
var frontMatter = require('gulp-gray-matter');
var attachToTemplate = require('gulp-attach-to-template');
var filterDrafts = require('stratic-filter-drafts');
var dateInPath = require('stratic-date-in-path');
var postsToIndex = require('stratic-posts-to-index');
var paginateIndexes = require('stratic-paginate-indexes');
var truncateIndexes = require('stratic-truncate-indexes');
var indexesToRss = require('stratic-indexes-to-rss');
var defaultCategories = require('stratic-default-categories');
var decorateFiles = require('stratic-decorate-files');
var pingLazymention = require('ping-lazymention');
var ghpages = require('gh-pages');
var merge = require('merge-stream');
var log = require('fancy-log');
var sort = require('gulp-sort');
var stylus = require('gulp-stylus');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var ecstatic = require('ecstatic');

function noop(done) { process.nextTick(done); }

var categoryDefaults = [];

/* eslint-env node */

/* Shared configurations */

/* Build tasks */

/* TODO: validate HTML */

var html = exports.html = function html() {
	return gulp.src(['src/**/*.pug', '!src/blog/*.pug', '!src/includes/*.pug'])
	           .pipe(jade({ pretty: true }))
	           .pipe(rename({ extname: '.html' }))
	           .pipe(gulp.dest('dist'));
};

var css = exports.css = function css() {
	return merge(gulp.src('src/styles/*')
	                 .pipe(stylus())
	                 .pipe(rename({ extname: '.css' }))
	                 .pipe(gulp.dest('dist/css')),
	             gulp.src('css/*')
	                 .pipe(gulp.dest('dist/css'))
	            );
};

var images = exports.images = function images() {
	return gulp.src('src/images/*')
	           .pipe(gulp.dest('dist/images'));
};

var font = exports.font = function font() {
	return gulp.src('font/*')
	           .pipe(gulp.dest('dist/font'));
};

var js = exports.js = function js() {
	var staticFiles = gulp.src(['src/js/*.js', '!src/js/main.js', '!src/js/webmentions.js']).pipe(gulp.dest('./dist/js'));
	var webmentions = browserify({
		entries: 'src/js/webmentions.js',
		debug: true,
		transform: []
	}).bundle()
	  .pipe(source('webmentions.js'))
	  .pipe(gulp.dest('./dist/js'));
	var main = browserify({
		entries: 'src/js/main.js',
		debug: true,
		transform: []
	}).bundle()
	  .pipe(source('main.js'))
	  .pipe(gulp.dest('./dist/js'));

	return merge(staticFiles, webmentions, main);
};

var postIndex = exports['post-index'] = function postIndex() {
	return gulp.src('src/blog/*.md')
	           .pipe(frontMatter())
	           .pipe(filterDrafts())
	           .pipe(defaultCategories(categoryDefaults))
	           .pipe(remark({quiet: true}).use(remarkHtml).use(adjustHeaders))
	           .pipe(dateInPath())
	           .pipe(decorateFiles())
	           .pipe(gulp.src('src/blog/index.pug', {passthrough: true}))
	           .pipe(postsToIndex('index.pug'))
	           .pipe(paginateIndexes())
	           .pipe(jade({pretty: true, basedir: __dirname}))
	           .pipe(rename({ extname: '.html' }))
	           .pipe(gulp.dest('dist/blog'));
};

var posts = exports.posts = function posts() {
	return gulp.src('src/blog/*.md')
	           .pipe(frontMatter())
	           .pipe(filterDrafts())
	           .pipe(defaultCategories(categoryDefaults))
	           .pipe(remark({quiet: true}).use(remarkHtml).use(adjustHeaders).use(slug))
	           .pipe(dateInPath())
	           .pipe(decorateFiles())
	           .pipe(gulp.src('src/blog/post.pug', {passthrough: true}))
	           .pipe(attachToTemplate('post.pug'))
	           .pipe(jade({pretty: true, basedir: __dirname}))
	           .pipe(rename({ extname: '.html' }))
	           .pipe(gulp.dest('dist/blog'));
};

var rss = exports.rss = function rss() {
	return gulp.src('src/blog/*.md')
	           .pipe(frontMatter())
	           .pipe(filterDrafts())
	           .pipe(defaultCategories(categoryDefaults))
	           .pipe(remark({quiet: true}).use(remarkHtml))
	           .pipe(dateInPath())
	           .pipe(gulp.src('src/blog/index.pug', {passthrough: true}))
	           .pipe(postsToIndex('index.pug'))
	           .pipe(truncateIndexes())
	           .pipe(indexesToRss({
		           title: 'strugee.net blog',
		           copyright: '© Copyright 2012-2018 AJ Jordan. Available under the GNU Affero GPL.',
		           webMaster: 'AJ Jordan <alex@strugee.net>'
	           }, 'https://strugee.net/blog/'))
	           .pipe(rename({ extname: '.rss' }))
	           .pipe(gulp.dest('dist/blog'));
};

var ping = exports.ping = pingLazymention('http://strugee.net:7517/jobs/submit', 'https://strugee.net/blog/');

var misc = exports.misc = function misc() {
	return gulp.src(['COPYING', 'src/misc/**/*', 'src/misc/.*'])
	           .pipe(rename(function(path) {
	           	if (path.dirname === 'well-known') path.dirname = '.well-known';
	           	// This next one isn't *really* needed, but it keeps a useless empty directory out of dist/
	           	if (path.basename === 'well-known') path.basename = '.well-known';
	           }))
	           .pipe(gulp.dest('dist'));
};

/* Lint tasks */

var csslint = exports.csslint = noop;

// XXX this is completely busted since Gulp 4!
var jshint = exports.jshint = function jshint() {
	return gulp.src(['src/js/*.js', '!vendor/*', '!plugins.js'])
	           .pipe(jshint());
};

/* Helper tasks */

var blog = exports.blog = gulp.parallel(exports.posts, postIndex, rss);

var build = exports.build = gulp.parallel(html, css, js, font, images, blog, misc);

var lint = exports.lint = gulp.series(csslint, jshint);

var deploy = exports.deploy = gulp.series(build, function(done) {
	ghpages.publish(path.join(__dirname, 'dist'), { logger: log, branch: 'master' }, done);
});

var watch = exports.watch = gulp.parallel(build, function watch() {
	// XXX should pick up subdirectories automatically
	gulp.watch(['src/*.pug', 'src/projects/*.pug'], html);
	gulp.watch(['src/blog/*.md', 'src/blog/*.pug'], blog);
	gulp.watch('src/includes/*.pug', gulp.parallel(html, blog));
	gulp.watch(['src/styles/*.styl', 'src/styles/lib/*.styl'], css);
	gulp.watch('src/js/*.js', js);
});

var serve = exports.serve = gulp.parallel(watch, function listen() {
	http.createServer(
		ecstatic({ root: __dirname + '/dist' })
	).listen(process.env.PORT || 8080);
});

/* Default task */

exports.default = gulp.series(lint, build);

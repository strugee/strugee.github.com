'use strict';

var gulp = require('gulp');

var http = require('http');
var path = require('path');
var jade = require('gulp-jade');
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
var ghpages = require('gh-pages');
var merge = require('merge-stream');
var gutil = require('gulp-util');
var sort = require('gulp-sort');
var stylus = require('gulp-stylus');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var addsrc = require('gulp-add-src');
var ecstatic = require('ecstatic');

var categoryDefaults = [];

/* eslint-env node */

/* Shared configurations */

/* Build tasks */

/* TODO: validate HTML */

gulp.task('html', function() {
	return gulp.src(['src/**/*.jade', '!src/blog/*.jade', '!src/includes/*.jade'])
	           .pipe(jade({ pretty: true }))
	           .pipe(rename({ extname: '.html' }))
	           .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
	return merge(gulp.src('src/styles/*')
	                 .pipe(stylus())
	                 .pipe(rename({ extname: '.css' }))
	                 .pipe(gulp.dest('dist/css')),
	             gulp.src('css/*')
	                 .pipe(gulp.dest('dist/css'))
	            );
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
});

gulp.task('post-index', function() {
	return gulp.src('src/blog/*.md')
	           .pipe(frontMatter())
	           .pipe(filterDrafts())
	           .pipe(defaultCategories(categoryDefaults))
	           .pipe(remark({quiet: true}).use(remarkHtml).use(adjustHeaders))
	           .pipe(dateInPath())
	           .pipe(decorateFiles())
	           .pipe(addsrc('src/blog/index.jade'))
	           .pipe(postsToIndex('index.jade'))
	           .pipe(paginateIndexes())
	           .pipe(jade({pretty: true, basedir: __dirname}))
	           .pipe(rename({ extname: '.html' }))
	           .pipe(gulp.dest('dist/blog'));
});

gulp.task('posts', function() {
	return gulp.src('src/blog/*.md')
	           .pipe(frontMatter())
	           .pipe(filterDrafts())
	           .pipe(defaultCategories(categoryDefaults))
	           .pipe(remark({quiet: true}).use(remarkHtml).use(adjustHeaders).use(slug))
	           .pipe(dateInPath())
	           .pipe(decorateFiles())
	           .pipe(addsrc('src/blog/post.jade'))
	           .pipe(attachToTemplate('post.jade'))
	           .pipe(jade({pretty: true, basedir: __dirname}))
	           .pipe(rename({ extname: '.html' }))
	           .pipe(gulp.dest('dist/blog'));
});

gulp.task('rss', function() {
	return gulp.src('src/blog/*.md')
	           .pipe(frontMatter())
	           .pipe(filterDrafts())
	           .pipe(defaultCategories(categoryDefaults))
	           .pipe(remark({quiet: true}).use(remarkHtml))
	           .pipe(dateInPath())
	           .pipe(addsrc('src/blog/index.jade'))
	           .pipe(postsToIndex('index.jade'))
	           .pipe(truncateIndexes())
	           .pipe(indexesToRss({
		           title: 'strugee.net blog',
		           copyright: '© Copyright 2012-2017 AJ Jordan. Available under the GNU Affero GPL.',
		           webMaster: 'AJ Jordan <alex@strugee.net>'
	           }, 'https://strugee.net/blog/'))
	           .pipe(rename({ extname: '.rss' }))
	           .pipe(gulp.dest('dist/blog'));
});

gulp.task('misc', function() {
	return gulp.src(['.gitmodules', 'COPYING', 'favicon.ico', 'humans.txt', 'robots.txt', 'sitemap.xml', 'CNAME'])
	           .pipe(gulp.dest('dist'));
});

/* Lint tasks */

gulp.task('csslint');

gulp.task('jshint', function() {
	return gulp.src(['src/js/*.js', '!vendor/*', '!plugins.js'])
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
	gulp.watch(['src/styles/*.styl', 'src/styles/lib/*.styl'], ['css']);
	gulp.watch('src/js/*.js', ['js']);
});

gulp.task('serve', ['watch'], function() {
	http.createServer(
		ecstatic({ root: __dirname + '/dist' })
	).listen(process.env.PORT || 8080);
});

/* Default task */

gulp.task('default', ['build', 'lint']);

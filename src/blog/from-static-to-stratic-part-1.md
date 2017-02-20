---
title: "From static to Stratic - part 1"
time:
  epoch: 1487620733
  utcoffset: "UTC-5"
author: "Alex Jordan"
categories:
  - development
  - stratic
---

So a couple days ago I published `generator-stratic@1.0.0-beta.1` to npm. Since Stratic is now officially in beta, I thought I'd write up a guide to converting a regular, static site to a Stratic-powered blog.

Each step in this blog post (part 1 of 2\[?]) will take you closer to having a fully-functional blog, but because of Stratic's decoupled design, you can work through them at your own pace. Each step will leave you with a functional environment (i.e. nothing will be "broken" such that you can't work on your website anymore).

You can see the steps in this post in action at [straticjs/static-to-stratic][example]. Each commit corresponds to a step in this post.

Let's get started!

## Initial setup

The site we'll be converting is currently pretty simple. It has an `index.html` and a `projects.html`. Each of these includes `/css/main.css` and `/js/main.js`. Also, they both have a navigation section and a footer that are duplicated across each page. Each time Alyssa P. Hacker - the website's owner - makes a change to these (for example to fix the copyright year in the footer), she has to change both HTML files. The best way for her to add a new page will be to copy an existing HTML file and then change it. This is a little unideal.

Alyssa tracks her website on GitHub (in the example repository mentioned above). Here are links for the [`index.html`][index.html] and the `[`projects.html`][projects.html] we'll be working with.

Here's a visual of the project layout:

    % tree .
    .
    ├── css
    │   └── main.css
    ├── index.html
    ├── js
    │   └── main.js
    └── projects.html
    
    2 directories, 4 files

When Alyssa needs to preview her website, she manually runs `http-server .`.

Since Alyssa uses GitHub she publishes her website on GitHub Pages, so her website is in the `master` branch of her git repository. (Here we're assuming that the repository is called `aphacker.github.io` or something, instead of `static-to-stratic`.)

In addition to adding blog support, we'll improve Alyssa's website by reducing duplication while still allowing her to publish to GitHub Pages.

## Step 1 - adding gulp

Before we do anything else, we need to add a build system. Stratic is designed to work with [gulpjs][], so that's the one we'll be using.

Adding gulp is super easy. First, we need to create a `package.json`, so we do `npm init`:

    % npm init
    This utility will walk you through creating a package.json file.
    It only covers the most common items, and tries to guess sensible defaults.
    
    See `npm help json` for definitive documentation on these fields
    and exactly what they do.
    
    Use `npm install <pkg> --save` afterwards to install a package and
    save it as a dependency in the package.json file.
    
    Press ^C at any time to quit.
    name: (static-to-stratic)
    version: (1.0.0)
    description: Personal website of Alyssa P. Hacker
    entry point: (index.js)
    test command:
    git repository: (https://github.com/straticjs/static-to-stratic.git)
    keywords:
    author: Alyssa P. Hacker <alyssaphacker@example.net>
    license: (ISC) AGPL-3.0+
    About to write to /Users/alex/Development/static-to-stratic/package.json:
    
    {
      "name": "static-to-stratic",
      "version": "1.0.0",
      "description": "Personal website of Alyssa P. Hacker",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "repository": {
        "type": "git",
        "url": "git+https://github.com/straticjs/static-to-stratic.git"
      },
      "author": "Alyssa P. Hacker <alyssaphacker@example.net>",
      "license": "AGPL-3.0+",
      "bugs": {
        "url": "https://github.com/straticjs/static-to-stratic/issues"
      },
      "homepage": "https://github.com/straticjs/static-to-stratic#readme"
    }
    
    
    Is this ok? (yes) yes

A couple things to note here: in general, the defaults are fine to accept. We've provided a description and an author, but these are optional since this isn't actually going to be published on the npm registry. They're just kind of nice to have.

The same goes for the license, which in this case is the [Affero GPL 3.0 or above][agpl] - however, as the copyright holder you are of course free to [choose whatever license][choosealicense] you want. (Or no license, although I'd discourage you from doing that.)

Once we have a `package.json`, we can go ahead and install gulp and another module we'll need, `ecstatic`:

    % npm install --save-dev gulp ecstatic

If you haven't used gulp previously, you'll also need to install `gulp-cli`:

    % npm install -g gulp-cli

At this point, we'll need to move some files around. Now that we have a build system, we can organize our repository however we want instead of putting stuff exactly where we want it in production.

You can do this however you want. The organization that you'll find most projects using, though, is to put stuff in a `src` directory. Let's make that right now.

    % mkdir src
    % git mv *.html src
    % git mv css src/styles
    % git mv js src/scripts

Finally, create a file named `gulpfile.js` and put the following in it:

    var gulp = require('gulp'),
        http = require('http'),
        ecstatic = require('ecstatic');
    
    gulp.task('build:html', function() {
    	gulp.src('src/*.html')
    	    .pipe(gulp.dest('dist'));
    });
    
    gulp.task('build:css', function() {
    	gulp.src('src/styles/*')
    	    .pipe(gulp.dest('dist/css'));
    });
    
    gulp.task('build:js', function() {
    	gulp.src('src/scripts/*')
    	    .pipe(gulp.dest('dist/js'));
    });
    
    gulp.task('watch', ['build'], function() {
    	gulp.watch('src/*.html', ['build:html']);
    	gulp.watch('src/styles/*', ['build:css']);
    	gulp.watch('src/scripts/*', ['build:js']);
    });
    
    gulp.task('serve', ['watch'], function() {
            http.createServer(
                    ecstatic({ root: __dirname + '/dist' })
            ).listen(8080);
    });
    
    gulp.task('build', ['build:html', 'build:css', 'build:js']);
    
    gulp.task('default', ['serve']);

This gives us a pretty good starting point. This gulpfile defines a couple tasks that simply copy source files into `dist`. The `watch` task watches for changes and rebuilds when they occur, and the `serve` task starts up a server, replacing Alyssa's usage of `http-server`. This provides exactly the same workflow as before: Alyssa runs one command and then she can look at her site on `localhost:8080`. You can use different task names if you want (for example, `html` instead of `build:html`, etc.), but these are what `generator-stratic` gives you.

However, there's one problem: Alyssa can't deploy her site anymore. If she pushed like this, visitors would have to visit e.g. `https://aphacker.github.io/src/projects` instead of `https://aphacker.github.io/projects`! That's no good.

In order to rectify this, we'll create a new git branch, `src`. `src` will contain the source files, and we'll put the final, built site in `master`, which is what's served by GitHub Pages. So:

    % git checkout -b src
    % git push --set-upstream origin src

Great. Now, we need to add something to put the built files (i.e. the contents of `dist`) in `master`. We'll use the `gh-pages` module for this. First install it and a dependency we'll need:

    % npm install --save-dev gh-pages gulp-util

Next, make it available in the gulpfile by adding a line at the end of `require()` statements:

    var gulp = require('gulp'),
        http = require('http'),
        ecstatic = require('ecstatic');

And finally, add a `deploy` task somewhere in the gulpfile:

    gulp.task('deploy', ['build'], function(done) {
    	ghpages.publish(path.join(__dirname, 'dist'), { logger: gutil.log, branch: 'master' }, done);
    });

Now whenever Alyssa wants to deploy a new version of her website, she just runs `gulp deploy` and it'll be taken care of for her. (ProTip™: change the default branch to `src` on GitHub. That way visitors and new clones see the source files, not the build files generated by a program.)

The very last thing we need to do is add a `.gitignore` file since we're installing Node modules and have a build directory now. We'll just use GitHub's, adding a line for `dist/` at the end:

    % curl https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore > .gitignore
    % echo "\ndist/\n" >> .gitignore

Now we've got a functionally equivalent development setup based on gulp. Success!

## Step 2: converting HTML to Jade

The next step is to convert the HTML to [Pug][]. Pug (formerly known as Jade) is a language that compiles to HTML. It lets you do useful things like inherit from a common layout as well as looping over JavaScript variables. If you're not familiar with Pug, you should go take a look at its syntax now.

The easiest way to do this conversion is to get a program to do it for you. [Here's the one I used][html2jade] way back when; you may be able to find a better one. The generated Pug will be valid but not the prettiest - you may want to wait to clean it up since we're going to do some work to reduce the duplication soon.

Once you've got the converted Pug, you should rename the relevant HTML file to have a `.pug` extention, then replace the contents with the Pug. Do this for each HTML file.

The last step here is to make gulp build the Pug. Install `gulp-pug`:

    % npm install --save-dev gulp-pug

Then add `pug = require('gulp-pug')` to the end of the `var` declaration at the top of your gulpfile. Finally, change your `html` task to look like this:

    gulp.task('build:html', function() {
    	gulp.src('src/*.pug')
    	    .pipe(pug({pretty: true}))
    	    .pipe(gulp.dest('dist'));
    });

We'll also need to fix the `watch` task so it has:

    gulp.watch('src/*.pug', ['build:html']);

which will watch Pug files instead of HTML files.

That's it! Alyssa's site is now building with Pug instead of HTML.

## Step 3: splitting out the layout

Pug's looping and flow control constructs will be very useful to us later on, but we can get some immediate productivity wins by splitting out the site layout so it's not duplicated across every Pug file.

There's one tricky thing about this: the navigation is mostly the same between pages, but not quite - the page the user is currently on shouldn't be a link. We'll solve this by using a `block` directivefor each link. That way, we can override just what needs to be changed, while introducing no duplication.

You'll have to figure out exactly what parts of your personal layout make sense to be split out. In Alyssa's case, there are three main things that are mostly or fully duplicated across pages:

1. The navigation bar
2. The footer
3. Invisible metadata and script/style includes

These are what we'll split out. First, we'll make a copy of `index.pug` and put it in `src/includes/layout.pug`. (Again, you can organize your files however you want - but in projects generated by `generator-stratic`, utility Pug files go in `src/includes`.) Next, edit out the page-specific content and replace them with `block` directives. Finally, edit each navigation bar item so it has its own `block` directive, leaving the old code as the default for the `block` directive.

Here's what this looks like when we do this to Alyssa's site:

    doctype html
    html
      head
        meta(charset='UTF-8')
        link(href='/css/main.css', rel='stylesheet', type='text/css')
        block head
      body
        block heading
        nav
          ul
            block nav-homepage
              li
                a(href='/') Homepage
            block nav-projects
              li
                a(href='/projects') Projects
    
        block body
    
        footer
          p &copy; Copyright 2016 Alyssa P. Hacker.
        script(src='/js/main.js', type='text/javascript')

Note how I've replaced the `h1` element (the contents of which vary per-page) with `block heading`, I've added a `block head` directive so we can specify the title per-page, I've made a `block` for each navigation link so we can override them if we want to individually (otherwise they'll have the default of being a link), and I've added `block body` for the main content. I've also cleaned out a bunch of the cruft the automatic converter put in there.

Now, we can edit `index.pug` so that it inherits from `layout.pug` - we'll use the `extends` keyword for this. Then we just fill in the content we want using block. Here's what this looks like after we're finished with Alyssa's site:

    extends includes/layout.pug
    
    block head
      title Alyssa P. Hacker's homepage
    
    block heading
      h1 Alyssa P. Hacker's homepage
    
    block nav-homepage
      li Homepage
    
    block body
      p This is the homepage of Alyssa P. Hacker. You can check out the projects I've worked on #[a(href='/projects') here].

You'll note that I've cleaned out some cruft here, too. We have one last thing to fix: if we change the layout, nothing will get rebuilt. We can fix this by changing the `watch` task again so that the line for watching Pug files reads:

    gulp.watch(['src/*.pug', 'src/includes/*.pug'], ['build:html']);

Sweet! `index.pug` is way shorter than what we had before and includes _just_ the content now. We can do the same thing to `projects.pug`. Then Alyssa can, for example, correct the copyright year in `layout.pug` - i.e., once - and that change will go into both `index.html` _and_ `projects.html`. I've gone ahead and made the change for her.

To give a high-level overview, here's what Alyssa's site looks like now:

    % tree -I node_modules .
    .
    ├── dist
    │   ├── css
    │   │   └── main.css
    │   ├── index.html
    │   ├── js
    │   │   └── main.js
    │   └── projects.html
    ├── gulpfile.js
    ├── package.json
    └── src
        ├── includes
        │   └── layout.pug
        ├── index.pug
        ├── projects.pug
        ├── scripts
        │   └── main.js
        └── styles
            └── main.css

    7 directories, 11 files

## Next time...

This post is long enough already, so I'll stop here. We've converted Alyssa's site to have a really solid base, so next time we'll build on top of this work to add superpowered blog features, powered by Stratic.

Now go apply this to your own site!

 [example]: https://github.com/straticjs/static-to-stratic
 [index.html]: https://github.com/straticjs/static-to-stratic/blob/18a7a7da03a2f84f525f0b699a43005067428199/index.html
 [projects.html]: https://github.com/straticjs/static-to-stratic/blob/18a7a7da03a2f84f525f0b699a43005067428199/projects.html
 [agpl]: https://www.gnu.org/licenses/agpl-3.0.en.html
 [choosealicense]: https://choosealicense.com/
 [Pug]: https://pugjs.org
 [html2jade]: http://html2jade.aaron-powell.com/

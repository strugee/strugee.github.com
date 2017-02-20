---
title: "Stratic part one is done!"
time:
  epoch: 1464473378
  utcoffset: "UTC-8"
author: "Alex Jordan"
categories:
  - development
  - stratic
---

Whooooooooooo!

I am so, so, _so_ thrilled to announce that the first part of [Stratic][1] is complete! And you can see the result right here on strugee.net, since this blog post was generated with Stratic!

**tl;dr**:

    var rename = require('gulp-rename');
    var markdown = require('gulp-markdown');
    var parse = require('stratic-parse-header');
    var straticToJson = require('stratic-post-to-json-data');
    var jadeTemplate = require('gulp-jade-template');
    var dateInPath = require('stratic-date-in-path');
    
    gulp.task('posts', function() {
    	return gulp.src('src/blog/*.md')
    	           .pipe(parse())
    	           .pipe(markdown())
    	           .pipe(dateInPath())
    	           .pipe(straticToJson())
    	           .pipe(jadeTemplate('src/blog/post.jade'))
    	           .pipe(rename({ extname: '.html' }))
    	           .pipe(gulp.dest('dist/blog'));
    });

How _gorgeous_ is that?? Let me explain how it works. (I'll assume the reader is familiar with [Gulp][2] and [Node.js][3].)

So the `gulp.src()` call is pretty obvious. We just read all the blog posts into the stream. Note, however, that `gulp.src()` doesn't stream text, per se - it streams [Vinyl][4] file objects. This will become important later.

Now, the first piece of custom Stratic code that we use is the `stratic-parse-header` module. This module takes a Markdown file with a standard Stratic header (see [my original announcement][5] for details), parses the header, strips it out, then returns the new, headerless Markdown. However, the new Vinyl file object has a couple of new properties from the parsing phase - specifically, `file.title`, `file.author`, `file.time`, and `file.categories` now exist. This is why the fact that Vinyl is used is important - now _any_ Gulp plugin downstream from where `parse()` is run can use all of these values in whatever way it wants. (See [the README][6] for more details.)

Now our Vinyl file object is _only_ the content of the post, and it has additional Stratic metadata attached to it. Awesome! The next thing that we do is render the Markdown, just using a standard Gulp plugin for this. Easy breezy. After that, we pipe to the `stratic-date-in-path` module, which adds the year and month to paths. For example, without `stratic-date-in-path`, this blog post would be at `https://strugee.net/blog/stratic-part-one`. However, since I _do_ use `stratic-date-in-path`, the post lives at `https://strugee.net/blog/2016/05/stratic-part-one` instead. Nice, right? Eventually I'll write code to generate pretty indexes for each year and month - that's what Stratic part 2 is for.

The next thing we do is pipe to the `stratic-post-to-json-data` module. This module is specifically designed to work with the `gulp-jade-template` module, which expects the file contents to be some JSON that will be given as data to a [Jade][7] template, whose rendered HTML becomes the new file contents. What sets up that JSON? You guessed it - `stratic-post-to-json-data`. That's all it does. It just creates an object that contains the metadata and the actual post text, runs it through `JSON.stringify()`, and sets the file contents equal to the result. Just how `gulp-jade-template` likes it.

And with that, we've successfully rendered a blog post. Whooooooooooo! I'm so pumped about this software. The call to `rename()` is just a little housekeeping, and then we write the whole thing back to disk with `gulp.dest()`. Awesome.

It's worth noting that the real beauty in this code isn't what the code actually does, but the extreme modularity of the whole thing. Unlike projects like [Jekyll][8] or even [Wintersmith][9], this isn't a giant, monolithic framework. It's all standard Node and Gulp. Note how (for example) we didn't need a custom plugin for Markdown - we just used the standard `gulp-markdown`. Don't like Markdown? No problem. Write something to extract post metadata from your preferred format, replace `parse()` with that and `markdown()` with a different renderer, and you're golden. All the rest will continue to work the _exact_ same - adding dates to paths, rendering the template, etc. - because everything's decoupled from everything else. Each component can be trivially swapped out and replaced with something new and better, and the rest of the system continues to work. Gorgeous.

I've got to go now, but I'm not done blogging. I'll be back soon to talk about the work going on in [pump.io][10], and I'll be back (much?) later to talk about Stratic part two (aka, pretty indexes).

Whooooooooooooooooooooo!

 [1]: https://github.com/strugee/generator-stratic
 [2]: https://github.com/gulpjs/gulp
 [3]: https://nodejs.org/en/
 [4]: https://github.com/gulpjs/vinyl
 [5]: https://strugee.net/blog/2014/11/new-blog-new-site
 [6]: https://github.com/strugee/stratic-parse-header/blob/master/README.md
 [7]: http://jade-lang.com/
 [8]: https://jekyllrb.com/
 [9]: http://wintersmith.io/
 [10]: http://pump.io/

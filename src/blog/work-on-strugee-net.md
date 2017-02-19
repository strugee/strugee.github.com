---
title: "Work on strugee.net"
time:
  epoch: 1465878614
  utcoffset: "UTC-8"
author: "Alex Jordan"
categories:
  - development
---

I realized I forgot to blog about all the work I've done on the `strugee.net` build code recently! I want to get back to working on Stratic part two (aka pretty indexes), but I thought I'd really quickly take the time to point out what's been done.

First of all, even though I rewrote the code in [Jade][1] about [a year and a half ago][2], there was still a huge amount of boilerplate code in each Jade file. Why? Because essentially the way I did that was by running each HTML file through an [HTML to Jade][3] converter, then manually fixing up the result to be, you know, less ugly. That meant that common stuff, like the navbar, footer, includes, etc. were all duplicated across all Jade files. And that sucks, because [Don't Repeat Yourself][4] is a thing.

Luckily, refactoring is a thing too! So a few weeks ago, I went and split out the common site layout into [its own Jade file][5], then made all the individual pages inherit from that common layout. The most difficult part of this was undoubtedly the navigation bar - I was pretty sure I'd have to just deal with the fact that the navbar was duplicated across pages (because each page has to have a different link deactivated), but then inspiration struck, and I ended up witht the solution I have now. Instead of treating the entire navigation as one block, I treat each _link_ as a block that is overridable via Jade's `block` directive. And, since Jade `block`s can have defaults, each page only overrides exactly what it needs to, and the rest of the links are automatically there and properly clickable.

This has a couple nice side effects. The first is that the codebase that generates `strugee.net` is now _extremely_ easy for me to change, regardless of what part of the site I touch (whereas before, individual pages were pretty easy but changing e.g. the navbar require editing each and every individual page). The second (and clearly the most important) is that Night Mode, which I implemented in a 45-minute class _over two years ago_ now (back when I was still in high school - what a crazy thing to think about not being in high school anymore!) now works on every page across all of `strugee.net`. Whooo! Silly hacks are at the core of the web, right? Might as well make them work well.

Finally, I'd be remiss if I didn't mention that I now have a proper [`deploy` task][6], so I can abandon the sketchy and genuinely terrible deploy process that I used before. (For those curious: `gulp build && git checkout master && mv dist/*.html . && git commit -m "Some bad commit message" && git push && git checkout src` - not shown here are the several attempts where I made some typo or possibly didn't think of some files in `dist/` that changed and so should have been `mv`'d, but weren't.) And, I now use root-relative includes now, e.g. `/js/main.js` instead of `js/main.js`, which is another win for DRY because now I don't have to maintain different header contents for subpages (which used to be the exact same, just with `../` prepended to all paths).

In conclusion: yay for progress! And yay for the fact that my codebase actually looks like someone competent wrote it! \o/

(Final note: I haven't forgotten my promise to blog about stuff happening in pump.io-land. But, not now.)

 [1]: http://jade-lang.com
 [2]: https://strugee.net/blog/2014/12/new-blog-new-site
 [3]: http://html2jade.aaron-powell.com/
 [4]: https://en.wikipedia.org/wiki/Don%27t_repeat_yourself
 [5]: https://github.com/strugee/strugee.github.com/blob/c5ec1634a6b038eec25adb5abcd2b578a60ec4fd/src/includes/layout.jade
 [6]: https://github.com/strugee/strugee.github.com/blob/c5ec1634a6b038eec25adb5abcd2b578a60ec4fd/gulpfile.js#L128

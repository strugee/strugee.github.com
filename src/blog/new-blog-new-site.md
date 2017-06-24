---
title: "New blog, new site!"
time:
  epoch: 1419680682
  utcoffset: "UTC-8"
author: "AJ Jordan"
categories:
  - development
  - personal
  - stratic
---

I'm back! Sort of. Very sort of.

I've known for a while that I'm going to ditch Blogger. That's a large part of why I delayed posting stuff to my blog for so long: I didn't have blog software that I really wanted to use, but I didn't want to just put more data into Blogger. Eventually, though, I realized that it would take me a while to write software that a) built an actual blog from Markdown and b) worked the way I wanted it to, so I decided that I would just start cranking out posts and write the software to build them later. And then of course there was the week or three that I spent procrastinating on writing... oh well. I'm here now.

Anyway, it's <s>two</s> three AM as I write this, so I should go to sleep soon. I have a lot of stuff I want to write about, so I'll be brief.

## Summer

I haven't written anything publicly since [Reset the Net][1], way back in June. So I should probably cover some of the things I've been doing.

First, I ran a [CryptoParty][2]! It was hosted at [Black Coffee][3]'s old location on Pine, and it was absolutely fantastic. We had a small group of people but it was really fun, anyway. The slides are [on GitHub][4] - and speaking of which, I've switched to [Bespoke.js][5] for all my presentations. Hell yeah HTML5!

Right after the CryptoParty was over, I actually had the opportunity to drive down to Portland for [DebConf '14][6], which was one of the most fantastic experiences of my entire life. I met a lot of really cool people there, I got my new [key][7] (also generated over the summer) signed by a lot of Debian folks, and I played a lot of evening games (not Werewolf - the other one). One of the coolest parts was the fact that I actually got to meet two of my heros - Linus Torvalds came and did a Q&A with us (video of it is available [here][8]) and John Sullivan, Executive Director of the FSF, did a BoF-style talk on how we can get to a point where Debian is on the FSF free distribution list. I got a chance to talk to both of them afterwards, which was undoubtedly one of the coolest things that has ever happened to me thus far.

## Robotics

Yes, the school year started and I'm a junior now. It's rough.

I'm on 5619 this year at robotics (Gabe, our main mentor, actually called me at DebConf to talk about it). I was a little annoyed to not be on 2856 at first, but it's worked out for the best. We're actually doing really well this year, and I'm so proud of the work we've been doing on the robot. It's difficult - it's much more complicated this year than last year, and there's basically no room on the thing. We had to move _wires_ out of the way to make room for our scissor lift to come down properly. Speaking of which, we have a working scissor lift, which has never been accomplished at SAAS before, at least not during a season! So that's awesome.

We had a rough time our second competition, due to a lot of things - the Field Control System lag was bothering our driver, Wilson, so I wrote up something quick to fix it. I went to test it, and as soon as I ran our scissor lift up, one of the bars - which (of course) we made out of wood - snapped. So we had to rush to fix it before we had to go on the field in three matches or something. And because the bar broke, I didn't get to test the new teleop, and when Wilson tried to drive with it on the field, it broke horribly. Luckily we did pretty well in the first competition, and that gave us a nice buffer to make up for our losses the second time. I can't claim that we're doing well, but we're not doing horribly, either. [Here's a video][9] showcasing the first competition, and [here's a second one][10] of the work the club did beforehand to prepare. Please excuse the weird camera angle of me intensely working on the code because of the time crunch of FTC competition.

## Patching Firefox

Over Thanksgiving break, I wrote my first Firefox patch! There was a bit of the DevTools that was bugging me, so I fixed it, in true free and open source software fasion. Unfortunately I'm having some trouble writing tests for it, and I haven't had time to track down the information that I need, so the patch hasn't made it into the tree yet. Soon, though! It's on my list of things to do during break. You can see everything over in [bug 1106353][11].

## Mail

I've spent hours of work, spread out over a number of months, working on steevie's mail subsystem. And I'm proud to say that as of a couple weeks ago, I'm finally done. I had to buy a block of static IPs for it, which I felt really cool for doing. There's still a lot of work to do - SPF, outbound DKIM signing, better TLS, Roundcube, ManageSieve, antispam, moving to LDAP from MySQL... the list goes on and on and on, but the system works. And I'm really proud of it. Anyway, I have a new email now: [alex@strugee.net][12]. I've even set up the customary names to forward to me: you can email [postmaster][13] for email trouble, [webmaster][14] for problems with the web server, and even [hostmaster][15] for general stuff. Or root, if you're APT or cron or somesuch. It'll all reach me.

## Christmas

It was Christmas yesterday! Merry Christmas, Internet! I got a bunch of books, including The C Programming Language, Second Edition (yes, this is _the_ book that K&R C is sort of named after), which was _very_ exciting for me. I also got a budget for steevie approved, so now I can buy a bunch of hardware that I need. Hello, RAID 10 array!

## Stratic

So, finally onto the juicy development part. [Stratic][16] is the name of my new pet project. Stratic is the STReaming stATIC site builder. It's like [Wintersmith][17], except that it runs on [Gulp][18], which I've fallen in love with over the summer. Because of that, it's a little weird - there'll be some custom components used to support it, but the main body of code is actually... a Yeoman generator.

There hasn't been much activity in the repo because I'm using the [strugee.github.com repository][19], which still runs strugee.net even though I'm not on GitHub Pages anymore, as a testbed for Stratic. Once I've ironed out all the kinks, then I'll land all my work in the [generator-stratic repository][16].

I'm very tired, and I want to go to bed, but before I do I figure I should explain the format of this post. Yes, this is Stratic format. It's pure Markdown, but with some additional semantics that Stratic will use to build out the blog. I figure that not many people will use &lt;h1&gt;s in their posts, so the Markdown equivalent (#) is used to distinguish the actual post text from what is essentially a header. I did something unusual, though, because even though the header is essentially for Stratic - who authored the post and when, what it's called, etc. - I wanted the Markdown to be at least somewhat readable in source form. Therefore, you're actually allowed to put anything you want in the header section. The values are distinguished by double quotation marks. Stratic will figure out what they mean based on their position. The first set of quotation marks contain the title, the second set contains the date, the third set contains the author, and the fourth set contains a comma-separated list of categories that the blog post should go in. The date looks a little weird - it's seconds since the epoch plus an optional UTC offset. It could be made more human-readable, but then you've got to parse stuff and it just turns into a nightmare. So I opted to sacrifice readability for elegance.

So! This is a blog post without a blog. Soon, I'll finish up Stratic and this will no longer remain solely in source form. I'm excited! I've already rewritten strugee.net in Jade, and used the opportunity to refresh [the services page][20]. Time to get crackin'.

 [1]: http://ramblingsfromalex.blogspot.com/2014/06/reset-net.html
 [2]: https://www.cryptoparty.in/
 [3]: http://blackcoffeecoop.com/
 [4]: https://github.com/strugee/cryptoparty-seattle
 [5]: https://github.com/markdalgleish/bespoke.js
 [6]: http://debconf14.debconf.org/
 [7]: https://strugee.net/gpg
 [8]: https://youtu.be/1Mg5_gxNXTo
 [9]: https://youtu.be/gJzJUveTyyo
 [10]: https://youtu.be/bdcG_WOOLwU
 [11]: https://bugzilla.mozilla.org/show_bug.cgi?id=1106353
 [12]: mailto:alex@strugee.net
 [13]: mailto:postmaster@strugee.net
 [14]: mailto:webmaster@strugee.net
 [15]: mailto:hostmaster@strugee.net
 [16]: https://github.com/strugee/generator-stratic
 [17]: https://wintersmith.io/
 [18]: http://gulpjs.com
 [19]: https://github.com/strugee/strugee.github.com
 [20]: https://strugee.net/services

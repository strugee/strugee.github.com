---
title: "RC week 2"
time:
  epoch: 1484429956
  utcoffset: "UTC-5"
author: "Alex Jordan"
categories:
  - personal
  - blaggregator
---

This is week 2 of being at the [Recurse Center][]. 

## Day 4

Arrived ~12:30; departed ~23:45; total time at RC 11h15m.

Today is day four because last week only had three days - Monday was off because of New Years.

Spent most of today working on Stratic. Paired with [Ajay][] to fix a really nasty bug in stratic-paginate-indexes caused by some [incorrect Vinyl documentation][badvinyl], during which he showed me how `Array.prototype.map` is a nice taste of functional programming available in JS, as well as [Iron Node][] - I had only previously used the built-in `node debug`. (Spent _hours_ on this bug at home but solved it in ~30 minutes while pairing.) Spent most of the rest of the day getting pagination to function properly on strugee.net, which was surprisingly hard due to there just being a lot of edge cases to handle. (That, plus the fact that it took a while for me to settle on a design I liked.) Spent some more time polishing or updating other parts of strugee.net.

In the evening, spent some time pairing with [Jacqueline][], teaching them to set up a cronjob using a DigitalOcean VPS.

## Day 5

Arrived ~10:30; departed ~23:00; total time at RC 12h30m.

Worked on Stratic almost non-stop for literally the entirety of today (again). Started and (almost) finished [stratic-indexes-to-rss][] and used the new feeds available on strugee.net to add myself to [Blaggregator][]. Took a quick poll on Zulip asking what the threshold was for there being so many repositories in a project that it warranted its own GitHub repo; instead of getting any replies, talked to [Stanley][] in person who convinced me when he said, "what are the cons?" and I said, "good question! I dunno." Hence, founded the [straticjs][] GitHub org. From there, did a huge push towards a [generator-stratic][] 1.0.0 release. It's very close - the core is done, but there are a lot of additional options that need to be added. I also can't release it before I fix up some TODOs currently in stratic-indexes-to-rss.

Additionally, took about a half hour break midday to give some ideas to [Heather][], who is teaching a workshop on Git tomorrow, and took another half-hour or so to watch non-technical lighning talks around 17:30(?).

## Day 6

Arrived ~11:00; departed ~21:50; total time at RC 10h50m.

Spent a significant portion of the morning thinking about Zulip\[1] design before and while filing [this long bug][badzulip] proposing some improvements to the way unread counts and notifications work. Also reviewed a couple [PRISM Break][] Pull Requests - I realize now I should've written about this on here (since it was _extrmemely_ exciting to me!) but I'm now a comaintainer of PRISM Break. Thanks, [@nylira][]!

Spent a little time polishing my [security presentation][] for tomorrow. At first I spent a lot of time trying to find a style I liked on my own, but eventually I just threw in the towel and used [bespoke-theme-cube][] which is what I had always previously used (since it's what [generator-bespoke][] generates).

Finally, spent some time working on pump.io. Filed a couple bugs on future improvements, notably one proposing that we add code to [automagically manage Let's Encrypt certificates][pumpbug], which I'm very excited about for several reasons. I also implemented [HTTP Strict Transport Security][hsts] which is a huge win for the network's security. The absence of HSTS was also the last remaining issue preventing me from gaining an A+ on SSL Labs for `pump.strugee.net` since I stopped using a reverse proxy setup, so that feels good.

Overall, I would say that this day was of average or slightly below average productivity. Also, while I got some useful stuff done, none of it was really related to RC (with the exception of the security presentation, thought that didn't take that much time).

 \[1]: for non-Recursers, [Zulip][] is a really excellent realtime chat tool that RC uses for communication.

## Day 7

Arrived ~12:20, departed ~22:30, total time at RC 10h10m.

Fixed a couple minor issues with my [security presentation][] before deploying it to strugee.net in preparation for my presentation. The talk itself went really well; my audience seemed to follow most of what I was presenting and I got some really good questions. As I stated at the beginning of the presentation, security is a **huge** topic, so really I looked at the list of subtopics and basically just picked one that I thought was interesting. There's a huge amount that I didn't cover so (partly) prompted by [Heather][], I'm now planning on doing weekly security presentations. Next week's will be on web application security and is already on the RC calendar.

Presented [Stratic][generator-stratic] during the weekly Thursday 5-minute presentations. I got up and said, "I'm super nervous about this talk because it's literally _all live demos_" and the audience laughed. And sure enough, I'd forgotten to add a dependency, so my `gulp serve` demonstration failed. That was okay though, because I still got to show the really interesting bits, which is the Unixy design in the gulpfile.

Finally, spent a lot of the evening with [Heather][] working on this sickass "made at Recurse Center" GitHub README badge:

<!-- TODO: fix this to use the real URL when it's up somewhere -->

!["made at Recurse Center" GitHub-style badge][badgeurl]

Whoohoo! \o/

## Friday

Arrived ~13:15, departed ~22:20, total time at RC 9h5m. As always, Friday doesn't count as a day because RC is technically not in session.

Had a very nice time walking to RC this morning which took about an hour because I kept stopping to take pictures - that felt really really good; it's been _way_ too long since I've taken any and I missed it far more than I realized. Spent some time having a very nice discussion (both on Zulip and in real life) about different approaches to managing dotfiles in version control. Also spent some time discussing the design of git (particularly history rewriting, which I've [previously written about][squashandmerge]) and resolved that something I should work on at RC is getting experience with [Mercurial][]. In between both of those I spent some time looking into where to put the badge that [Heather][] and I made. Seems like the answer is [swag.recurse.com][] so I started looking at the project setup and plan to send some more PRs in the future.

Throughout the day I also reported a couple minor [Zulip][blackemoji] [issues][zulipcompose] as well as two Firefox bugs, [one of which][muststaplebug] got marked as a duplicate and [one of which][svgbug] is still UNCONFIRMED.

## Executive summary

Pretty productive week but could've been better. In particular I didn't do a good job of working on "RC projects" and instead spent too much time on existing personal projects, primarily Stratic and pump.io.

Total time at RC 53 hours 50 minutes; cumulative time 95 hours 50 minutes (first week estimated).

 [Recurse Center]: https://recurse.com
 [Ajay]: https://github.com/atungare
 [Iron Node]: https://github.com/s-a/iron-node
 [badvinyl]: https://github.com/gulpjs/vinyl/issues/125
 [stratic-indexes-to-rss]: https://github.com/strugee/stratic-indexes-to-rss
 [Blaggregator]: https://blaggregator.recurse.com
 [Stanley]: https://stanzheng.com/
 [straticjs]: https://github.com/straticjs
 [generator-stratic]: https://github.com/straticjs/generator-stratic
 [Heather]: https://github.com/heatherbooker
 [Jacqueline]: https://github.com/Jmeggesto
 [Zulip]: https://zulip.org/
 [badzulip]: https://github.com/zulip/zulip/issues/3235
 [PRISM Break]: https://prism-break.org/
 [@nylira]: https://github.com/nylira
 [hsts]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
 [security presentation]: https://strugee.net/presentation-security-design
 [bespoke-theme-cube]: https://github.com/bespokejs/bespoke-theme-cube
 [generator-bespoke]: https://github.com/bespokejs/generator-bespoke
 [pumpbug]: https://github.com/pump-io/pump.io/issues/1259
 [badgeurl]: https://people.strugee.net/~alex/made_at_RC.svg
 [squashandmerge]: /blog/2016/10/github-squash-and-merge-default-considered-harmful
 [swag.recurse.com]: https://swag.recurse.com/
 [Mercurial]: https://www.mercurial-scm.org/
 [blackemoji]: https://bugzilla.mozilla.org/show_bug.cgi?id=1331117
 [zulipcompose]: https://github.com/zulip/zulip/issues/3300
 [muststaplebug]: https://bugzilla.mozilla.org/show_bug.cgi?id=1331117
 [svgbug]: https://bugzilla.mozilla.org/show_bug.cgi?id=1331121

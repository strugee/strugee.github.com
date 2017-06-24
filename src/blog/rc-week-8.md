---
title: RC week 8
time:
  epoch: 1488395479
  utcoffset: "UTC-5"
author: "AJ Jordan"
categories:
  - personal
  - blaggregator
---

This is week 8 of being at the [Recurse Center][]. 

<script async defer src="https://www.recurse-scout.com/loader.js?t=3d49e64361d4b897ffd2fd56dcd93ca4"></script>

## Day 27

Arrived ~10:35, departed ~0:30, total time at RC 13h55m.

Had a nice discussion about Stratic in my checkin group this morning. After that I went to the Capture The Flag introduction workshop, then spent essentially the entire rest of the day finishing up [static to Stratic][static] (which included, in a truly horrifying fashion, me rewriting and force-pushing the demo repository's history a good four times or so) so I'd have a post up for the iron bloggers meeting. Also spent some time fixing some bugs in [generator-stratic][] and published the beta 2 release with those fixes. Closed out the evening by digging into a remark problem where `<script>` tags would be stripped from posts. Ended up just asking on Gitter.

## Day 28

Arrived ~10:30, departed ~20:40, total time at RC 10h10m.

Continued to investigate the remark problem based on replies received overnight - turns out it was a bug in remark fixed in a release that had gone out the door literally the same day I asked. After that I spent the day upgrading [generator-stratic][] (which, remember, was originally scaffolded [years ago][]) to newer and newer releases of `yeoman-generator` until it used `yeoman-generator@latest`. Then I spent time adding some basic tests - they're kind of just smoketests for now (are the correct files generated, does `gulp serve` work) but I [intend][] to expand them. Also moved over some issues to the new [straticjs/RFCs][rfcs] repository and attended Casual Presentations.

## Day 29

Arrived ~10:50, departed ~20:35, total time at RC 9h45m.

Didn't do a whole lot codewise today. However, I did teach Unix fundamentals for Beginner Club, which went pretty well - I just spent the entire time in the commandline, demonstrating different commands. We spent a little time talking about shell scripting, but not much. I forgot to cover conditionals, which was dumb since they're pretty weird in shell scripting. Spent some time in the afternoon starting a draft of [How I passed 2k GitHub contributions][2k]

Watched Kiki's Delivery Service in the evening.

## Day 30

Arrived ~10:35, departed ~00:05, total time at RC 13h30m.

Finished and published [How I passed 2k GitHub contributions][2k]. Presented [cryptography basics][] at Security Club, then spent a lot of time fixing miscellaneous items on steevie. In particular ejabberd was apparently configured to use a standalone certificate bundle (instead of symlinking to something in `/etc/letsencrypt/live`) - this was because ejabberd requires the private key and the full chain to be in the same file. TLS certificate renewal didn't properly update this bundle, so XMPP client connections weren't working. ZNC was broken in the same way, so I fixed both of those. I also spent some time setting up a system to publish everything custom in `/usr/local` [on GitHub][usrlocal] so that it's public and version-controlled. So that's nice.

## Friday

Arrived ~15:50, departed ~1:00, total time at RC 9h10m. As always, Friday doesn't count as a day because RC is technically not in session.

Came in super late (though I woke up earlier). Almost immediately after that I attended an initial meeting about starting an RFC reading group (an idea I floated on Zulip a couple days ago). Spent most of the day poking at IETF things as well as responding to [hubot-seen][] PR comments. I just got write access! \o/

Closed out the evening by attending Bottle Share Friday, where I had a long discussion with [Alex][] about running my own email server (which spun off into a discussion of how completely terrible and busted email is), followed by a long discussion about whether Apple's release schedule for Safari and attitude towards new web features and third-party iOS rendering engines is justifiable.

## Saturday

Arrived ~11:15, departed ~23:30, total time at RC 12h15m. Saturday doesn't count as a day because RC is not in session.

Marathoned Lord of the Rings today. The showing was small and people drifted in and out but most of the time there were a couple people watching, which was fun. The original plan was to watch the director's cut versions, watching The Return of the King on Sunday, but we ended up watching the regular versions because you can't rent the director's cuts off Amazon, and I wasn't about to pay $30 for movies that I _already own_ on DVD back home. We probably would've still watched on Sunday, except that I went out to get pizza for dinnr and found out that it was pouring rain (with thunder/lightning and everything). So I decided we'd watch The Return of the King and wait for the rain to let up, which worked beautifully.

[Hussein][] came in just as I was about to leave and stated that he almost had a heart attack because he sprinted literally from his apartment to Duane Reade, which truthfully was absolutely _hilarious_. We had some fun wandering around Duane Reade trying to find soap (which I needed to buy) before we both headed home.

(As a side note, my favorite brand of mac 'n' cheese by far is Annie's, which my local supermarket does not carry. But apparently Duane Reade does!? Wat???)

## Executive summary

This week was weirdly divided - some parts were hyper-productive and some parts were pretty terrible. I certainly got a lot of work done on Stratic, and I taught a lot. But I didn't really do a good job of working on stuff that pushed my programming abilities forward.

Total time at RC 68 hours 45 minutes; cumulative time 363 hours 10 minutes.

 [Recurse Center]: https://recurse.com
 [static to Stratic]: https://strugee.net/blog/2017/02/static-to-stratic
 [generator-stratic]: https://github.com/straticjs/generator-stratic
 [years ago]: https://strugee.net/blog/2014/12/new-blog-new-site
 [intend]: https://github.com/straticjs/generator-stratic/issues/11
 [rfcs]: https://github.com/straticjs/RFCs
 [2k]: https://strugee.net/blog/2017/02/how-i-passed-2k-github-contributions
 [cryptography basics]: https://strugee.net/presentation-cryptography-basics
 [usrlocal]: https://github.com/strugee/steevie-usr-local
 [hubot-seen]: https://github.com/hubot-scripts/hubot-seen
 [Alex]: http://www.aberke.com/
 [Hussein]: https://github.com/Husseinfarah93

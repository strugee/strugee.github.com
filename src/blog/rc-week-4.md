---
title: "RC week 4"
time:
  epoch: 1485800191
  utcoffset: "UTC-5"
author: "AJ Jordan"
categories:
  - personal
  - blaggregator
---

This is week 4 of being at the [Recurse Center][].

<script async defer src="https://www.recurse-scout.com/loader.js?t=3d49e64361d4b897ffd2fd56dcd93ca4"></script>

## Day 11

Arrived ~10:50, departed ~23:20, total time at RC 12h30m.

Arrived 20 minutes late for my checkin, but checked in with [Stanley][] and [Heather][] anyway. Started [an experiment][nohttp] where I turned on [HTTPS Everywhere][]'s "block all unencrypted requests" option, which has been, uh, _interesting_ so far. Spent most of the day working on blog-related things - finishing up and publishing [RC week 3][] (which I just straight up forgot to publish on Saturday) along with [Surveillance priorities][] which I finished exactly two minutes before\[1] the start of this week's Iron Blogger challenge meeting. Other than that, poked a little at implementing [OCSP stapling support][stapling] in [ejabberd][], which is something I want to do for a number of reasons:

 1. It'll give me a chance to look at some Erlang, which will be a really interesting experience
 2. It'll give me a chance to try doing something with the OpenSSL API, which is a complete horror show but nonetheless something I would like (some) experience in
 3. I run ejabberd in production and, you know, really want stapling support

Ended the night by going to Fat Cat.

 \[1]: I actually already had a longer post mostly written, but I realized as I was going to finish it that the experiment that I was proposing had a) been done before and b) mostly failed. So I ended up writing "Surveillance priorities" from scratch in a hurry instead.

## Day 12

Arrived ~10:50, departed ~17:50, total time at RC 7h0m.

Arrived late again, despite leaving a good _15 to 20 minutes earlier_. Freaking subway. ANYWAY. Checked in on Zulip instead of in person. The day was semi-productive - I worked a little on my operational security presentation for tomorrow, but a lot of my time was spent talking with Rose, discussing the programming language I'm planning to work on/invent. Left early to do laundry at home and then closed out the evening by finishing my presentation as well as finding and reporting a (common and uninteresting) security vulnerability in a web application\[2] - unnamed for obvious reasons.

As a side note, as Stanley put it, [I'm RC famous][famous]! Kind of, I guess. \o/

 \[2]: I actually thought I found the same problem in another project, except it turned out that I totally missed something and so instead of being cool I ended up embarrassing myself on GitHub instead. Sadface :(

## Day 13

Arrived ~10:35, departed ~00:10, total time at RC 13h35m.

Arrived in the middle of my checkin. Spent the morning taking care of some general maintenance tasks, including getting ready to present on operational security, which I did in the afternoon. Spent most of the rest of the day thinking about the design of my programming language and putting it together into a blog post. In the evening, started trying to fix [a bug in Sandstorm][sandcats] which was breaking my production install. Also, had my Princeton interview via Skype, which I think went extremely well. Yay! My interviewer was awesome and we had a really interesting conversation.

As a side note, I got to wear my new libuv shirt today, and it is seriously [the coolest shirt I've ever seen][libuv].

## Day 14

Arrived ~10:35, departed ~1:40, total time at RC 15h5m.

Arrived in the middle of my checkin again (still better than earlier in the week, though). It wasn't anything groundbreaking, but it did give me the opportunity to get more hands-on Mercurial experience (and learn a lot about Mercurial's different branching styles). Working in an unfamiliar codebase was also a good experience, as was dealing with Sandstorm's custom UDP protocol. It wasn't really what I meant to do with the day, but also not a total wash.

Attended Thursday presentations followed by Game Night in the evening which was _very_ fun - I played some poker, then lost at chess a bunch of times to Hussein (even when we played Blitz Chess, which he said he was bad at). Then we switched to Go for a while. Finished out the evening by just hanging out with [Fenimore][], [Hussein][], and [James][], which was a lot of fun.

## Friday

Arrived ~15:10, departed ~23:50, total time at RC 8h40m. As always, Friday doesn't count as a day because RC is technically not in session.

Slept in pretty late today. Attended the monthly pump.io meeting immediately upon arrival (sadly Evan wasn't there). Spent the rest of the day responding to PRs - which took a lot of time but didn't actually result in a lot of code - then authoring a Huginn PR to [add titles][] to all pages.

## Executive summary

In a shocking turn of events, this week was relatively productive, but could've been better. I challenged myself a little bit, but I think I can and should do more.

Checkins really helped. Even when I missed the checkin it provided motivation to get up and get moving. 10:30 may be a little too early for me though, so I'm not sure if I'll continue doing it next week.

Total time at RC 56 hours 50 minutes; cumulative time 198 hours 5 minutes.

 [Recurse Center]: https://recurse.com
 [Stanley]: https://stanzheng.com/
 [Heather]: https://github.com/heatherbooker
 [nohttp]: https://pump.strugee.net/alex/note/q1vco7XwRk6JsYteqTQqPA
 [HTTPS Everywhere]: https://www.eff.org/https-everywhere
 [RC week 3]: https://strugee.net/blog/2017/01/rc-week-3
 [Surveillance priorities]: https://strugee.net/blog/2017/01/surveillance-priorities
 [stapling]: https://github.com/processone/ejabberd/issues/1364
 [ejabberd]: https://www.ejabberd.im/
 [famous]: https://www.recurse.com/blog/112-how-rc-uses-zulip
 [all titles]: https://github.com/cantino/huginn/pull/1884
 [sandcats]: https://github.com/sandstorm-io/sandcats/issues/153
 [libuv]: https://pump.strugee.net/alex/image/zAFejrr9RY6pLFHpSlXBbQ
 [Fenimore]: http://another.workingagenda.com
 [Hussein]: https://github.com/Husseinfarah93
 [James]: http://kacyjam.es/

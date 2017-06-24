---
title: RC week 11
time:
  epoch: 1490064565
  utcoffset: "UTC-4"
author: "AJ Jordan"
categories:
  - personal
  - blaggregator
---

This is week 11 of being at the [Recurse Center][]. 

<script async defer src="https://www.recurse-scout.com/loader.js?t=3d49e64361d4b897ffd2fd56dcd93ca4"></script>

## Day 7

Arrived ~13:30, departed ~22:45, total time at RC 9h15m.

Brought in cookies and spent a lot of time discussing things on Zulip, honestly. Also figured out when I'm teaching things for Web Dev 101. Spent most of the day, however, writing about [default-secure systems][].

## Day 8

Arrived ~16:15, departed ~21:00, total time at RC 4h45m.

Arrived super late today because I woke up in the morning, saw the blizzard outside my window, and said "hell no." When I _did_ go in, the blizzard was still going, so I put on snow pants, snow boots, a thick sweater and my winter jacket, and my hat and gloves. Which took a while.

Spent some time discussing 10 different reasons not to put arsenic in the milk with [Jackie][] and [Andrew][], which she later wrote a blog post about [here][arsenic]. Spent the rest of the day doing [maintenance][stratic-data] on some Stratic modules. Also spent a little time on the phone with my dad diagnosing my server's disk problems. I had him reseat the SATA cables, with no effect, unfortunately.

## Day 9

Arrived ~12:15, departed ~23:25, total time at RC 11h10m.

Didn't do a lot of new stuff, but took care of some miscellaneous business. In particular I did some work on polishing [hubot-seen][], including putting out a 1.0.0 release (and then a 1.0.1 release when that turned out to have broken the world). In the evening, _finally_ found the bug preventing us from upgrading pump.io to Express 4.x, which was unbelievably satisfying. Turned out that the bug was in some test code, not the application itself, and so I had been misreading the stack trace for _months_. (The top item was a test file, but I incorrectly assumed that that was just some test code invoking a bunch of internal stuff. Nope.) Also has a meeting with some of the other Winter 1s about feelings and the end of the batch and stuff.

Last but not least, caught up on weekly blogging. (I've been really bad for a while now...)

## Day 10

Arrived ~11:45, departed ~00:00, total time at RC 12h15m.

Did a ton of pump.io work. I merged the Express 4.x branch, then went in and did a bunch of other more minor dependency upgrades. Also went to a soldering workshop run by [Claire][] immediately before presenting HTTPS Part 2 in the afternoon.

In the evening, went to presentations and then game night, where I spent the entire time playing poker. I put in $3 and got back $7.95 (read: $8). Sick.

## Friday

Arrived ~13:30, departed ~21:45, total time at RC 8h15m. As always, Friday doesn't count as a day because RC is technically not in session.

Did some work on improving pump.io's dependency situation. The result is a system that is very, very close to being 100% up-to-date, which I'm _super_ proud of to be honest. That also let me turn on dependency security monitoring through [Node Security Platform][nsp], with plans to enable [Greenkeeper][] as well. Had the monthly meeting in the middle of all that which went really well and was very productive.

In the evening, went to Bottle Share, then put pump.io on the Linux Foundation's [best practices badge app][badgeapp], the result of which you can find [here][pumpbadges].

## Executive summary

Well, I got a lot done on pump.io (and Stratic) this week. So it was relatively productive. But I did basically nothing that was personally productive (i.e. that pushed me forward as a programmer). Hopefully next week will go better.

Total time at RC 45 hours 40 minutes; cumulative time 510 hours 30 minutes.

 [Recurse Center]: https://recurse.com
 [default-secure systems]: https://strugee.net/blog/2017/03/default-secure-systems
 [Jackie]: https://jmeggesto.github.io/
 [Andrew]: https://github.com/andrewrk
 [arsenic]: https://jmeggesto.github.io/blog/2017/03/poisonmilk
 [stratic-data]: https://github.com/straticjs/RFCs/issues/2
 [hubot-seen]: https://github.com/hubot-scripts/hubot-seen
 [Claire]: https://github.com/eeclaire
 [nsp]: https://nodesecurity.io/orgs/pumpio/projects/32213bb8-f9a6-4dd0-8fc6-5caa8ea5f8fc
 [Greenkeeper]: https://greenkeeper.io
 [badgeapp]: https://bestpractices.coreinfrastructure.org
 [pumpbadges]: https://bestpractices.coreinfrastructure.org/projects/804

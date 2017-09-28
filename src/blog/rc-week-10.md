---
title: RC week 10
time:
  epoch: 1489621360
  utcoffset: "UTC-5"
author: "AJ Jordan"
categories:
  - personal
  - tor
  - blaggregator
---

This is week 10 of being at the [Recurse Center][].

<script async defer src="https://www.recurse-scout.com/loader.js?t=3d49e64361d4b897ffd2fd56dcd93ca4"></script>

## Day 35

Arrived ~13:00, departed ~21:30, total time at RC 8h30m.

Decided (in the morning) to sleep in because honestly, I was just really behind on sleep.

Didn't do a whole lot today. Took care of the monthly pump.io release, but spent most of the day writing [Driftless at 1,000 mph][driftless]. In the evening (i.e. after the Iron Blogger meeting) I spent some time fixing ejabberd's configuration to use the new access control syntax (I'd rewritten the config a while back, but hadn't deployed it yet because it broke logins).

## Day 36

Arrived ~10:40, departed ~23:40, total time at RC 13h0m.

Spent basically all day working on [realtime.recurse.com][]. I (mostly) finished up the bits that watch the filesystem and dispatch events (including the "periodic" submission logic), then started in on an automatic update mechanism. I'm pretty pleased with how it's turning out - I think it's pretty elegant. And, it's secure - updates are required to be cryptographically signed by yours truly. Went out to Black Burger with a _bunch_ of people before going to Fat Cat in the evening. Then came back, worked on the updater a little more, and went home.

## Day 37

Arrived ~14:40, departed ~23:20, total time at RC 8h40m.

Overslept by accident this morning. Spent a bit of time in the afternoon dealing with email, then focused on realtime.recurse.com - basically I was just working on the autoupater I started yesterday. My Python is _definitely_ improving!

I'm actually really pleased with the updater. It's pretty elegant, I think. Basically whenever the server sees a request coming from the client, it checks the `User-Agent` header to see if the client's out of date and, if so, sends back an `X-Requires-Upgrade` header. Upon receiving this header the client will go fetch version information, which it'll use to download and verify an update bundle cryptographically signed by me. Yay for secure updates, and yay for simplicity! (Note that this design basically just reuses the connections the client is already making to the server, so it doesn't have to poll for updates all the time.)

I also spent a couple hours talking with Mikhail, discussing a lot of things - ranging from how Node.js's event loop works to the `is` keyword in Python to static site generator architecture compared to dynamic site architecture.

## Day 38

Arrived ~9:50, departed ~23:00, total time at RC 13h10m.

Woke up, completely naturally, around 7 AM despite going to sleep at 3 AM. This was so surprising - and this is a true story - that I thought I had woken up at 7 PM and missed the entire day, including Security Club, Abstract Salad Factory, and Thursday night presentations. I was _really_ mad, honestly. But then I looked at my watch and realized that I was on 24-hour time but it didn't say "19:00" and also my alarms were in the future and my phone was in 24-hour time too and also Anja on Zulip said "?" when I said I'd slept through Security Club. Despite the overwhelming evidence in the end, though, I still had a weird feeling that it was 7 PM. So that's the story of how, for a good 5 or 10 minutes, I genuinely believed I'd slept through the entire day.

Once I got to RC, I spent the morning finally(!) merging in a bunch of upstream `ejabberd.yml` config changes to steevie's ejabberd configuration, which got me closer to fixing the awful spam problem I have. Then I went to Abstract Salad Factory, followed by Security Club. Then in the afternoon (and after presentations) I started reading [FreeBSD][] documentation since that's what I'm running my new Tor relay on - as I discovered a couple days ago, my old one apparently got hung during boot and was consuming 100% CPU due to the kernel image being corrupted or something. I chose FreeBSD because a) it's a rock-solid system, b) it's a good opportunity to gain experience with administrating a BSD, and c) it increases the diversity of the Tor network. Also, had a conference call in the afternoon with the [EFF][] and Paul from [TA3M Seattle][] about TA3M Seattle joining the EFF's [Electronic Frontier Alliance][EFA], which was exciting for everyone.

## Friday

Arrived ~13:00, departed ~22:30, total time at RC 9h30m. As always, Friday doesn't count as a day because RC is technically not in session.

Didn't do a whole lot of coding. Spent a while helping [Jason][] debug [Datamost][]'s 3.0.0 upgrade (which apparently broke uploads). Attended presentations for the RC Game Jam, then fixed the documentation that caused Jason's problems. Spent a little bit of time polishing the website and README, too.

In the evening, fixed people being banned from ejabberd MUCs, then proceeded to fix my spam problem. Whoooooo! Then I kept working on my Tor relay.

## Executive summary

Like any week, this had moments where I wasn't very productive. But overall I think it was pretty good - I made a lot of progress on realtime.recurse.com (and improved my Python in the process), and I made a lot of progress on setting up my Tor relay again (and learned a bunch about FreeBSD in the process). Also, I fixed my ejabberd spam problem. I learned nothing from that, but thank _god_ I did it because the spam problem was honestly _awful_. The one issue was that I just didn't do a very good job getting up and making it to checkins.

Total time at RC 52 hours 50 minutes; cumulative time 464 hours 50 minutes.

 [Recurse Center]: https://recurse.com
 [driftless]: https://strugee.net/blog/2017/03/driftless-at-1000-mph
 [realtime.recurse.com]: https://github.com/strugee/realtime.recurse.com
 [FreeBSD]: https://www.freebsd.org/
 [EFF]: https://www.eff.org/
 [TA3M Seattle]: https://ta3mseattle.org/index.php/Main_Page
 [EFA]: https://www.eff.org/electronic-frontier-alliance
 [Jason]: https://jxself.org/
 [Datamost]: https://datamost.com/

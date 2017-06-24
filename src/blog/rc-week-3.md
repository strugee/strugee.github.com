---
title: "RC week 3"
time:
  epoch: 1485200304
  utcoffset: "UTC-5"
author: "AJ Jordan"
categories:
  - personal
  - blaggregator
---

This is week 3 of being at the [Recurse Center][]. 

<script async defer src="https://www.recurse-scout.com/loader.js?t=3d49e64361d4b897ffd2fd56dcd93ca4"></script>

## Monday

Arrived ~12:50, departed ~00:10, total time at RC 11h20m. Not Day 8 because Martin Luther King Day was today, so RC was not technically in session.

Lazy day today. Participated in an interesting discussion in the [Conversations][] MUC about [Easy XMPP][] which led to me spending a couple hours working on [this onboarding webpage project][onboarding-project] (live version [here][onboarding]). Spent about 5 minutes deploying OCSP Must Staple to [nodecompat.com][] and [isthefieldcontrolsystemdown.com][] and then about 30 discussing exactly what OCSP Must Staple is with [Jesse][]. Also, submitted a talk on [Stratic][] to [LinuxFest Northwest][lfnw].

Truthfully I spent a fair amount of my time in #pump.io on Freenode and in particular, got confirmation that [Evan][] will be able to attend this month's pump.io meeting, which is fantastic. Closed out the evening by finishing my last college app and then spending several hours (i.e. waaay longer than I meant to) looking into parts for building an [xkcd-style robot][robot] for the space.

## Day 8

Arrived ~13:10, departed ~23:00, total time at RC 9h50m.

Truthfully, not really sure where today's time went. The biggest real thing I did was fixing a pretty serious [regression][] in pump.io (introduced during the Express 3.x migration) that caused realtime functionality not to work. Plus I wrote the above text (under "Monday") because I didn't have time the previous night. \*sigh\*

However, I _did_ spend a lot of the evening starting and then finishing my presentation on [webapp security][] for tomorrow. So that's something.

## Day 9

Arrived ~13:40, departed ~21:30, total time at RC 7h50m.

Arrived only just in time for my presentation on [webapp security][] due to a series of unfortunate (mostly subway-related) mishaps. It went really, really well - although we did run for 30 minutes longer than I'd planned, which I was surprised at since last week we only ran a couple minutes over but I had twice as many slides. Covered (mostly SQL) injections, cross-site scripting, password handling, and Cross Site Request Forgery. After that, had an extensive discussion with [Deniz][] and [Heather][] about security and related subjects (email, selfhosting, the law, and how I think about security systems, mostly) before heading out to Walgreen's to buy some Airbourne, since I think I may be on the verge of getting a bit sick. :(

(Heather and Deniz also suggested I use the word "obviously" less, although it seems like other than that people really like my teaching style. So that feels good.)

The rest of the day was pretty boring: did a [patch release][] for pump.io so that the regression fix that landed yesterday would go out to users. Took care of some system administration maintenance, then did some pump.io issue triaging and some minor fixups in the GitHub repository (notably improvements to the wiki homepage and fixing the Releases page, which was kinda borked).

Finally, since I've been doing a bad (read: _terrible_) job trying Mercurial so far, I've decided to force myself to use it:

    $ cd Development
	$ rm -rf icalc
	$ # Muck around for a bit because I thought the following would work out-of-the-box, but it didn't
	$ hg clone git+ssh://github.com:strugee/icalc.git

I'll end up using it tomorrow since I'm committing to work on icalc for the entire day. I've been really bad about working on it.

## Day 10

Arrived ~13:10, departed ~17:45, total time at RC 4h35m.

Arrived riiiight as Abstract Salad Factory was starting. Had a delicious salad and came up with an excellent idea for an RC activity\[1] before attending Beginner's Club, which was on testing (and also conveniently in the same room). Spent a little time taking care of business (emails, etc.) before digging into Mercurial by looking at the "Migration from Git" wiki page and just reading links. Feel like I'm on a good track there.

Attended Thursday presentations; came up with a really awesome web standards idea during that that I was _extremely_ excited to propose to the standards community. Looked it up while the jobs fair was getting started - turns out it's [already a thing][mixedcontent]. So that was disappointing. Left for home pretty soon after that.

 \[1]: one weekend where we take over the main space and marathon through all three extended director's cut Lord of the Rings movies

## Friday

Arrived ~1:00, departed ~00:50, total time at RC 11h50m. As always, Friday doesn't count as a day because RC is technically not in session.

Spent a lot of time today pairing with [Heather][] on improving the [Abstract Salad Factory webapp][asf] before devolving into silly shell-related projects like installing [thefuck][] and perusing [underhanded][], which we actually learned a lot from (because we kept looking up the options and commands the aliases used). Also found out that the version of [sl][] packaged in Debian is weirdly old. Like 10 years old.

In the evening, went to Bottle Share Friday which really ended up being "have lots of food and play a game of Codenames but mostly just talk" Friday. Very fun.

Wrapped up the evening with a little bit of Just Dance followed by some [pump.io work][datadir] and more pairing on the Abstract Salad Factory app, which ended with me and Heather wondering if the  version deployed to Heroku didn't actually match the version on GitHub.

Also, signed up for checkins for next week as an accountability tool.

## Executive summary

Week started out similar to the past week or two - I wasn't terribly good about sticking to RC stuff. However, I brought it back in the end! So I think I'm back on track.

Total time at RC 45 hours 25 minutes; cumulative time 141 hours 15 minutes.

 [Recurse Center]: https://recurse.com
 [Conversations]: https://conversations.im
 [Easy XMPP]: https://wiki.xmpp.org/web/Easy_Onboarding
 [onboarding-project]: https://github.com/ge0rg/easy-xmpp-invitation
 [onboarding]: https://yax.im/i/#alex@strugee.net
 [nodecompat.com]: https://nodecompat.com
 [isthefieldcontrolsystemdown.com]: https://isthefieldcontrolsystemdown.com
 [Jesse]: https://jessewalling.com/
 [Stratic]: https://github.com/straticjs/generator-stratic
 [lfnw]: https://www.linuxfestnorthwest.org/
 [Evan]: https://e14n.com/evan
 [robot]: https://xkcd.com/413/
 [regression]: https://github.com/pump-io/pump.io/issues/1266
 [webapp security]: https://strugee.net/presentation-webapp-security
 [Deniz]: https://github.com/ebb-tide
 [Heather]: https://github.com/heatherbooker
 [asf]: https://github.com/asinghamgoodwin/AbstractSaladFactory
 [thefuck]: https://github.com/nvbn/thefuck
 [underhanded]: https://github.com/ayust/underhanded
 [mixedcontent]: https://w3c.github.io/webappsec-mixed-content/#strict-opt-in
 [patch release]: https://github.com/pump-io/pump.io/blob/master/CHANGELOG.md#211---2017-01-18
 [datadir]: https://github.com/pump-io/pump.io/pull/1272

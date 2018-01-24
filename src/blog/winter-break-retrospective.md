---
title: "Winter break retrospective & spring semester goals"
time:
  epoch: 1516755063
  utcoffset: "UTC-4"
author: "AJ Jordan"
categories:
  - personal
  - development
  - blaggregator
---

Tonight I'll have been back at college for a full week, and I wanted to write up a little retrospective of winter break to see what I accomplished (and in particular, which [goals](/blog/2017/12/winter-break-priorities-2017-18) I completed or missed).

You may wish to skip directly to the [executive summary](#executive-summary).

# Resolved goal: Node.js manpage PR

I didn't _complete_ this goal per se, but I did at least resolve it [by closing the Pull Request](https://github.com/nodejs/node/pull/14164#issuecomment-357909699). I felt pretty bad about it (especially because I kept saying I intended to finish it) but honestly, it became clear to me that I'd just lost the motivation to keep going with it. I would love it if this was included in Node.js core, but I just consistently have higher priorities. So rather than leave it hanging and cluttering up the Pull Requests view, I just closed it to reflect reality. I made sure not to delete the branch though, in case someone (distant future me?) wants to pick it up again.

# Failed goal: deal with GPG keysigning

I did nothing to push this goal forward. While I made [numerous improvements to my GPG setup][gpg], I did not actually sign anyone's key, which was what this goal was about. This feels unfortunate. (I also do not have access to the private key material in college, and am _certainly_ not about to ask that it be shipped to me.)

# Partially completed goal: push Debian packaging work forward

There were two components to this: [Profanity packaging](https://tracker.debian.org/pkg/profanity) upgrades and getting the new [filter-other-days](https://github.com/strugee/filter-other-days) packaging into Debian. I made no progress on the Profanity packaging. However, I did [fix a misconfiguration in my `.reportbugrc`](https://github.com/strugee/dots/commit/2b477a7079de9ff675fd4e2d22f58938ffbb7bc9) (which annoyingly had previously sent my incredibly detailed email about Profanity packaging to `/dev/null`) and then submitted [an ITP](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=886310) (Intent To Package bug, which is a Debian thing) for filter-other-days. I then used that ITP bug number [to fix the last `.deb` Lintian warning](https://github.com/strugee/filter-other-days/commit/d09943c6ac4eea07720cc88596bed3594c3f4644) (although see below). Then I paired with [Anja](https://github.com/anjakefala) who is, as always, an angel, and we figured out the weirdness that is `dput` and [mentors.debian.net](https://mentors.debian.net/). Finally I was able to upload filter-other-days(!) BUT I was in for a rude awakening - apparently Lintian checks for `.deb`s and `.dsc`s are different. So while my binary package was Lintian-clean, my source package unfortunately wasn't. This is something I will need to work on in the weeks to come. That being said, I'm still pretty proud of what I've accomplished here! I've made significant progress on this front.

# Completed goal: lazymention v1

One of the first things I did was ship lazymention 1.0.0 - and I wrote [an announcement blog post][lazymention] to accompany it! (In fact, I syndicated that blog post to [IndieNews](https://news.indieweb.org/) _using lazymention_, which felt pretty damn awesome.) I got some great feedback on it from the IndieWeb community, and my [lobste.rs submission](https://lobste.rs/s/kip3yk/announcing_lazymention_elegant) - which also got some great engagement - even made the front page, which was pretty unreal! I still have a lot more work to do with lazymention - in particular, it doesn't actually respect edits (so it'll resend Webmentions with every job submission) - but for now it works well. I'm super pleased with it, and have integrated it into my site deployment workflow. I even wrote [a module](https://github.com/strugee/ping-lazymention/) so other people can do this, too!

# Failed goals: ActivityPub in pump.io core, pump.io PR review

No progress on this front. I did start hacking on a [telemetry server](https://github.com/pump-io/telemetry) which will eventually be helpful for our ActivityPub rollout, but that did not in any way _directly_ help fulfill these goals. I also [released 5.1 stable][5.1], but that's pretty routine by this point.

# Partially completed goal: two blog posts per week

I stuck with this goal all the way up until the final week, where I didn't write any. (Although I wrote about my [GPG keys][gpg] around the time I actually flew back to college.) The first week, I wrote about [my thoughts on shell script](/blog/2017/12/shell-script-is-one-of-the-purest-forms-of-human-expression) and about [lazymention][]; the second, I wrote about the [pump.io 5.1 stable release][5.1] and about [talking to Pull Request reviewers if you think they're wrong](/blog/2018/01/tell-your-pr-reviewers-theyre-wrong).

# Failed stretch goal: paper editing

I did absolutely no editing on the paper I intend to get published (which I originally wrote for a writing class). This was a stretch goal though, so that's totally fine.

# Additional activity: steevie maintenance

After I finally found the cable I needed, I swapped out the cable that connects steevie's motherboard with the drives' SATA ports. This seemed to significantly improve disk performance, although there are still noticeable performance problems. I'm very, _very_ happy to have finally gotten this done.

# Additional activity: Tor relay migration from Amazon EC2 to DigitalOcean

After getting some advice on [tor-relays](https://lists.torproject.org/cgi-bin/mailman/listinfo/tor-relays), I _finally_ sat down and looked into moving my relay away from Amazon Web Services. This is because AWS bills by usage, which for a Tor relay ends up being incredibly inefficient. It turned out to actually be way easier than I thought, which only served to make me mad that I hadn't done it sooner. In any case, I now save approximately $240/year AND I can push 1000GB/month as opposed to the 10GB/month I pushed before. In the words of [the commit where I made this change](https://github.com/strugee/torrc/commit/8b9fe85378adc834b8b7a9953de45f508b76bc3e): "this change made possible by the fact that I'm no longer getting billed up the wazoo by Amazon Web Services." Here's a of [a Tor Metrics graph](https://atlas.torproject.org/#details/C3CFCC9B5993A6F0D1349858C598C4A78AFE51F9) (captured today) that shows the jump:

![Tor Metrics graph](/images/tor-relay-graph.svg)

Anyway, I'm super happy I can contribute more to the Tor network _and_ save lots of money in the process. That being said I am pretty damn salty I didn't realize this in the four _years_ I've been running a Tor relay.

# Additional activity: offandonagain.org maintenance

After turning on [NodeSecurity](https://nodesecurity.io/) monitoring for [offandonagain.org](https://offandonagain.org), I found out that the module that underlies it, [node-serve-random](https://github.com/strugee/node-serve-random), had some vulnerable dependencies. Not only did I fix this, I wrote a large test suite for the module and found (and fixed!) [several bugs](https://github.com/strugee/node-serve-random/blob/master/CHANGELOG.md#200---2018-01-13) in the process. Writing a test suite also allowed me to turn on [Greenkeeper](https://greenkeeper.io/) for the module, which will be a huge help to me in keeping the module up-to-date.

# Additional activity: Stratic work

First off, I released [beta 7](https://github.com/straticjs/generator-stratic/blob/master/CHANGELOG.md#100-beta-7---2017-12-3) of [generator-stratic](https://github.com/straticjs/generator-stratic)! Nothing major, just some polishing stuff. Stratic is getting very close to the point where I might want to start promoting it more aggressively, or declaring it stable, and (with a _lot_ of super-helpful feedback from my family) I worked on something that's super important before we get there: [a logo][logo]!

Here are two of my favorites so far:

<div class="two-image-container">

![Yellow background with a centered black file icon and a asteroid coming up from earth in the midddle and a pipe to the right](/images/stratic-logo-asteroid-with-pipe.svg) ![Yellow background with a centered black file icon and a rocket coming up from earth in the midddle and a pipe to the right](/images/stratic-logo-rocket-with-pipe.svg)

</div>

These are based off the JS logo, in case you hadn't seen it before:

![Black JS text in the bottom-right corner of a yellow background](/images/js-logo.svg)

Anyway, I have to post another iteration in the [GitHub issue][logo] based on some feedback from [Saul](http://saul.pw/) (who I had a lovely lunch with) - he thinks I should reverse it so the pipe is on the left, so it looks like the file is coming out of the pipe. But anyway you should comment there if you have feedback!

# Additional activity: IndieWeb stuff

I attended Homebrew Website Club in San Fransisco, which was _incredible_. I got to meet a bunch of new people, as well as say hi to [Ryan](http://snarfed.org/) and [Tantek](http://tantek.com/) again, which was so nice - it's always just _better_ to talk in real life. Tantek said (at least if I recall correctly) that my laptop was one of the best-stickered laptops he'd ever seen, which made me feel just unbelievably special. He also gave me a [microformats](http://microformats.org/) sticker (and helped me figure out where to put it), which I had on my old laptop and had been really missing, as well as a [Let's Encrypt](https://letsencrypt.org/) sticker. The latter was so special I elected to put it on the inside of my laptop, which I reserve only for _really_ special things (basically a [Recurse Center](https://www.recurse.com/) refucktoring sticker and a sticker of [Noah](https://github.com/SwartzCr) in [this video](https://www.eff.org/encrypt-the-web), which he handed to me like a business card the first time we met). Anyway, every time I look at the Let's Encrypt sticker I just feel so happy. I love Let's Encrypt so damn much.

Homebrew Website Club was super inspiring, so when I got back to where I was staying (at my mom's boyfriend's house) I started implementing an [IndieWeb](https://indieweb.org)-style social stream for strugee.net. It still needs some polishing but is actually pretty close to being done. Who knows when I'll have time to finish it, but it's getting there! I'm so freaking excited, honestly. Also, I added proper timestamp mf2 metadata to my site, as well as a visual display for post edits, and I expanded what type of Webmentions the display code recognizes too!

<!-- TODO nuke this when I actually do proper header anchors -->
<span id="executive-summary"></span>
# Executive summary

I resolved or completed 2 goals, partially completed 2 goals, failed 3 goals, and failed 1 stretch goal. Additionally I did significant work in 5 other areas. Out of the goals I set for myself, I completed 51% (Debian packaging work is ~2/5 complete; blog posts were written 2/3 of the time); not counting the stretch goal, I completed 61.2%. I'm pretty happy with what I got done during this period; however, while I was productive, the numbers show that I did a mediocre job sticking to my goals. In the future I should focus on making more realistic goals and then sticking to them (though not too much - it is a break, after all!).

Speaking of which, partway through break I felt like I was on the edge of burnout, which to me was a _very_ clear sign that I was pushing myself way too hard during a time I should have been unwinding. Because of that I cut what I was doing a _lot_, which helped pretty dramatically. In fact, I think without that I wouldn't have been able to do some of the later stuff, like all the IndieWeb work. So that's another reason I have to find a way to balance sticking to goals and just relaxing (which doesn't necessarily mean not coding, just doing whatever coding I feel like in the moment) - I feel like I was pushing myself too hard to meet my goals (and then getting distracted and not meeting them) and that's what led to the feeling. Obviously there are different constraints for e.g. schoolwork; here I'm referring _only_ to free time like breaks.

# Spring semester goals

With that in mind, I want to set some very broad goals for spring semester. I may update this list as time goes on, but for now I have four overarching goals I want to accomplish (besides the usual day-to-day code maintenance stuff):

* Finish editing the paper I wrote last semester on freedom-respecting software and intersectionality, and get it published
* Make _some_ measurable progress on my [Push-based Two-factor Authentication IETF draft](https://github.com/strugee/draft-webpush-2fa)
* Get access to the University of Rochester darkroom and start developing/printing photos again
* Start pushing the University of Rochester library (and _maybe_ the journalism department?) to start adopting Tor technologies

I'm excited to see how it goes!

 [gpg]: /blog/2018/01/improving-gpg-security
 [lazymention]: /blog/2017/12/announcing-lazymention-elegant-outbound-webmention-for-static-sites
 [5.1]: /blog/2018/01/pump.io-5.1-stable-published-to-npm
 [logo]: https://github.com/straticjs/RFCs/issues/22

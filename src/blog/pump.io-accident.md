---
title: "How I accidentally started maintaining a social network with thousands of users"
time:
  epoch: 1494647513
  utcoffset: "UTC-8"
author: "Alex Jordan"
categories:
  - development
  - personal
  - pump.io
---

As some of my readers (particularly Recursers) know, a couple of weeks ago I became an Invited Expert at the [W3C][] (World Wide Web Consortium). The W3C is a standards body. That means it's responsible for defining things like how things work on sthe web, such as how web pages are styled using CSS and how web developers can protect their apps from security vulnerabilities using [Content Security Policy][].

My first thought when I got the email that my application had been accepted was, "_**WHOOOOOOOOO!**_" It was probably one of the most thrilling moments of my whole life. My second thought was, "how in the _world_ did I get here!?" The truth is, it was almost an accident.

It started when I got involved in the [pump.io][] project. pump.io, for those who haven't heard me talk about this endlessly (e.g. at RC), is a decentralized social network. That means that there can be multiple servers run by different people that are part of the social network, but the users on those servers can interact with each other in just the same way they could if it was just one big centralized server\[1]. I first got involved in the pump.io project in August 2015. I was experimenting with different social networking software and decided to [deploy][] pump.io on my server. When I did I realized that pump... well, it didn't work very well. The web UI was kinda basic\[2], everything was pretty buggy, and there were a lot of problems with the overall user experience. In fact, I know the exact day I set up pump.io (August 12th) because all throughout the experience [I][] [was][] [filing][] [bugs][] on things needing improvement. It was a shame, I thought, because this software seemed really neat. I thought it had a lot of potential.

After about two weeks it became clear that there was no activity in the upstream pump.io project. So after some deliberation, I ended up forking it (briefly). You can watch [this talk][] around 16:00 to hear me talk about this a bit, though to be honest it's kind of just a footnote in the project's history. In the end Evan Prodromou, pump.io's author, ended up handing off some commit rights to community members.

Well, I thought, that was the end of that. Everything's smooth sailing from here on out! There were some big problems, though: the people who now had commit rights all were involved in other things and, more importantly, none of them knew JavaScript or Node.js! This makes me chuckle to this day, honestly.

So I started triaging issues. When people sent Pull Requests, I'd review them since it seemed like no one else was going to do it. [#1114][] was, as far as I can tell (or remember), the very first of these "unofficial" PR reviews. I kept going; I even reviewed Menno Vossen's [epic PR which fixed all the tests][testpr] (fixing the tests being a feat which, having tried to start that work myself, I am to this day in awe of and _incredibly_ thankful for). For that last one in particular, you'll note that _I_ merged it, not Chris Webber. At some point in January(?), he asked me in `#pump.io` on IRC if I'd like write access to the repository, to which I said (paraphrased) "heck yes!" So he made it happen.

I never really intended for that to happen. However, I _was_ the one doing almost all of the work. After a while it just made sense. This is what, among other things, I find so incredible about freedom-respecting software: you can just _do_ things. I didn't ask anyone for permission to do those reviews. I just saw the need for a reviewer, and decided I'd help out.

Fast-forward to today, and I'm now an owner of the pump.io organization on GitHub. I make technical decisions about what to prioritize and what should go into pump.io core. I do a lot of the day-to-day work running the project, too, and setting up technical and policy infrastructure (with a lot of help from the community, of course, plus input from Evan). That, too, just made sense, as did my becoming an Invited Expert - I was pretty deeply engaged with the ActivityPub specification already since it's based on the pump.io protocol, and I was really excited about said protocol being standardized. So I was participating pretty heavily and I think it just made sense to people in the Working Group for me to join. In fact, that also kinda happened by accident. I couldn't get edit access to the W3C wiki so we were speculating in `#social` on the W3C IRC server that it might be because I wasn't a "W3C member" or something. So some people at W3C were pinging the sysops team, etc., trying to mark me as a "trusted" user when someone - [Sandro Hawke][], I believe - said, "the other option is for you to just join the Working Group." To which I said, "well, but I'd have to join as an Invited Expert, and I don't think I qualify as an expert." Chris Webber's response? "You're just as much of an expert as me when I joined!"

tl;dr how in the world did I get here? I tried some software and got annoyed at it, so I just kind of _"did some stuff"_ that led to me doing code reviews. That led to me getting involved in the decentralized social web which led to me _"doing some more stuff"_ that got me involved in standards. Then because of that, I tried to edit a wiki and ended up being invited to apply as a W3C Invited Expert.

I mean, what the hell? Honestly. I can't emphasize enough that I didn't plan ANY of this. It just sort of... happened. And that, I think, is what's so cool about the free software community. It isn't about who you are, where you come from, or what your goals are. It's only about, do you show up? Do you show up and do awesome stuff?

I showed up, kind of by accident, and I now run a decentralized social network with thousands of users called pump.io.

What will happen if _you_ show up?

\[1]: I really hope this explanation makes sense and if it doesn't, I apologize - I use diagrams to explain this in real life.

 \[2]: Still is, but that should improve now that the technical debt work I've been focusing on for the past year is now [basically done][]!

  [W3C]: https://www.w3.org/
 [Content Security Policy]: https://www.w3.org/TR/CSP3/
 [deploy]: https://pump.strugee.net/
 [I]: https://github.com/pump-io/pump.io/issues/1093
 [was]: https://github.com/pump-io/pump.io/issues/1094
 [filing]: https://github.com/pump-io/pump.io/issues/1095
 [bugs]: https://github.com/pump-io/pump.io/issues/1096
 [this talk]: https://media.libreplanet.org/u/libreplanet/m/pump-io-the-federated-extensible-social-network/
 [#1114]: https://github.com/pump-io/pump.io/pull/1114
 [testpr]: https://github.com/pump-io/pump.io/pull/1136
 [Sandro Hawke]: https://www.w3.org/People/Sandro/
 [basically done]: https://strugee.net/blog/2017/03/express-4.x-in-pump.io-core

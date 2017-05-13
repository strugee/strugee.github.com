---
title: "How I accidentally started maintaining a social network with thousands of users"
time:
  epoch:
  utcoffset:
author: "Alex Jordan"
categories:
  - development
  - personal
---

So as some of you (particularly Recursers) know, a couple of weeks ago I became an Invited Expert at the [W3C][], the World Wide Web Consortium. The W3C is a standards body, and that means it's responsible for defining things like how web pages are styled using CSS, or how web developers can protect their apps from security vulnerabilities using [Content Security Policy][].

When I got the email that my application had been accepted, my first thought was, "_**WHOOOOOOOOO!**_" It was probably one of the most thrilling moments of my whole life. My second thought was, "how in the _world_ did I get here!?" The truth is, it was almost an accident.

I first got involved in the pump.io project in August 2015. I was experimenting with different social networking software and decided to [deploy][] pump.io on my server, and when I did I realized that pump... well, it didn't work very well. The web UI was kinda basic, everything was pretty buggy, and there were a lot of problems with the overall user experience. In fact, I know the exact day I set up pump.io (August 12th) because all throughout the experience [I][] [was][] [filing][] [bugs][] on things needing improvement. It was a shame, I thought, because this software seemed really neat. Like it had a lot of potential.

After about two weeks it became clear that there was no activity in the upstream pump.io project. So, after some deliberation, I ended up forking it (if only briefly). I'm not going to go into this a ton because it was brief and not super interesting and if you really want you can watch [this talk][] around 16:00 to hear me talk about this a little. Suffice it to say that the end result was Evan Prodromou, pump.io's author, handing off some commit rights to community members.

Well, that was the end of it, I thought. Everything's smooth sailing from here on out. There was only one problem: the people who now had commit rights all were involved in other things and, more importantly, none of them knew JavaScript or Node.js! This makes me chuckle to this day, honestly.

So I started triaging issues. When people sent Pull Requests, I'd review them since it seemed like no one else was going to do it. [#1114][] was, as far as I can tell, the very first. I kept going, even reviewing Menno Vossen's [epic PR which fixed all the tests][testpr] (fixing the tests being a feat which, having tried to start that work myself, I am to this day in awe of and incredibly thankful for). For that last one in particular, you'll note that I was the one that merged it, not Chris Webber. That's because, at some point in January(?), he asked me in `#pump.io` on Freenode IRC if I'd like write access to the repository, to which I said (paraphrased) "heck yes!" So he made it happen.

I never really intended for that to happen. But I was the one doing all the work, so after a while it just made sense. This is what, among other things, I find so incredible about free software: you can just _do_ things. I didn't ask anyone for permission to do those reviews. I just saw the need for a reviewer, and decided I'd help out.

Fast-forward to today, and I'm now an owner of the pump.io organization on GitHub. I make technical decisions about what to prioritize and what should go into pump.io core, and I do a lot of the day-to-day work running the project and setting up technical and policy infrastructure (with a lot of help from the community, of course - plus input from Evan). That, too, just made sense, as did my becoming an Invited Expert - I was pretty deeply engaged with the ActivityPub specification already since it's based on the pump.io protocol, and I was really excited about the pump.io protocol being standardized. So I was participating pretty heavily and I think it just made sense to people in the Working Group for me to join. In fact, that also kinda happened by accident - I couldn't get edit access to the W3C wiki and in `#social` on the W3C IRC server we were speculating that it might be because I wasn't a "W3C member" or something. So some people at W3C were pinging the sysops team, etc., trying to mark me as a "trusted" user and things like that when someone - [Sandro Hawke][], I believe - said, "the other option is for you to just join the Working Group." To which I said, "well, but I'd have to join as an Invited Expert, and I don't think I qualify as an expert." Chris Webber's response? "You're just as much of an expert as me when I joined!"

So the answer to my original question, how in the world did I get here? I tried some software and got annoyed at it, so I did some stuff that led to me doing some code reviews. That led to me getting involved in the decentralized social web which led me to doing some stuff that got me involved in standards. And then because of that I tried to edit a wiki and ended up being invited to apply as a W3C Invited Expert.

I mean, what the hell? Honestly. I can't emphasize enough that I didn't plan ANY of this. It just sort of... happened. And that, I think, is what's so cool about the freedom-respecting software community. It isn't about who you are, or where you come from, or what your goals are. It's only about, do you show up? Do you show up and do awesome stuff?

I showed up, kind of by accident, and I now run a decentralized social network with thousands of users called pump.io.

What will happen if _you_ show up?

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

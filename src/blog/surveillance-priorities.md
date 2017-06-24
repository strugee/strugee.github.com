---
title: "Surveillance priorities"
time:
  epoch: 1485208527
  utcoffset: "UTC-5"
author: "AJ Jordan"
categories:
  - politics
  - privacy
  - musings
---

For several years now I've been really interested in technology policy - things like security, privacy and censorship, and especially how those things relate to both mass surveillance and freedom-respecting software. That's why I follow organizations like Fight for the Future and the EFF, and why I e.g. participated in the movement to stop SOPA and PIPA, the internet censorship bills.

But a week or so ago I had a realization: I'm not interested in surveillance law anymore.

It's clear to me that Congress is completely busted. The 113th Congress came [very, very close][productive] to being the least productive Congress in modern history. Our current Congress isn't particularly good either, although they are (as far as I know) not as bad as the 113th - but they're still not good enough that I'm confident in their ability to actually, you know, pass laws. Even if we _could_ get Congress to pass laws at all, it's unclear whether we could actually get them to pass laws curtailing mass surveillance. Over and over again we see Congress trying to pass misguided laws that weaken encryption, damage the DNS, and do all sorts of other seriously nasty (and hacky!) things - it just doesn't seem very reasonable to me to assume that they'd change their minds and decide to do (what we think is) the right thing\[1].

This is why I'm not interested in surveillance law anymore. I find it to be a waste of time. Instead, I've shifted my focus towards systems that are fundamentally designed to resist surveillance and censorship. That's why I advocate for [Signal][] and why I work on [pump.io][]: because these are both systems designed from the ground up to, among other things, essentially be unaffected by surveillance law. Who cares if Congress passes a law that says they can surveil pump.io users? Congress saying a bunch of words doesn't change the fact that technically speaking, that's quite hard to do. Certainly it's more difficult than surveilling e.g. Facebook.

As Moxie Marlinspike puts it in [this talk][moxie] on PKI's flaws and an alternative system called Convergence:

> And, you know, with this legislation that's been coming up recently like COICA and PROTECT IP and this kind of thing, you know - to me the real lesson here isn't whether this passes or not because there's been, you know, some kind of heroic efforts to prevent this legislation from going through. But I think, you know, the thing to take away from this is that they're _trying_. To pass regulation that messes with this stuff. And maybe one day they'll succeed.

Trying to make Congress do the right thing is, I feel, akin to an endless arms race: they don't seem to be getting the message and it's doubtful that they'll stop in the near- or medium-term future.

A much better solution is this: implement secure-by-default, freedom-respecting, encrypted and/or federated systems, and be done. Forever.

 \[1]: honestly, I think a big problem with this is that a lot of Congress is old white guys. Emphasis on old. The problem of people in the legal sphere not understanding technology, especially technology relating to security, privacy and encryption, has cropped up before. Consider, for example, the judge who [ruled][] that a Tor user had "no reasonable expectation of privacy" because he literally could not wrap his head around how Tor worked and what the FBI did.

 [productive]: http://www.pewresearch.org/fact-tank/2014/12/29/in-late-spurt-of-activity-congress-avoids-least-productive-title/
 [moxie]: https://youtu.be/xIiklPyS8MU?t=33m54s
 [ruled]: https://nakedsecurity.sophos.com/2016/07/01/judge-decides-we-dont-have-any-right-to-privacy/
 [Signal]: https://whispersystems.org/
 [pump.io]: http://pump.ioe

---
title: "Make ReCaptcha's \"I'm not a robot\" accurate"
time:
  epoch: 1555812358
  utcoffset: "UTC-4"
author: "AJ Jordan"
categories:
  - development
  - blaggregator
---

A month or two ago, my friend Evan [tweeted][]:

> Fuck reCaptcha.
>
> I am sick of doing unpaid labour classifying images for Google.
>
> We need a captcha widget that contributes to the global commons instead of siphoning value into yet another proprietary lockbox.

Frankly I agree. Not only am I being forced to do Google's dirty work, but ReCaptcha is known to make life extremely difficult for Tor users. I've literally spent 15 minutes before trying to solve a stupid captcha and eventually I gave up because Google just wouldn't let me past. ReCaptcha profits off of innocent users who are just trying to go about their business on the web, and Google is exploiting people in order to build a locked-up, proprietary image recognition system. Why are we, the users, not allowed to have access to the fruits of the labor that we are forced to provide for free? Because of this, today I am announcing an advanced, next-generation, cutting-edge platform that is poised to _revolutionize_ this problem space.

Nah, just kidding (mostly). Inspired by [another tweet from Evan][tweet], I threw together a browser extension in like 30 minutes that changes "I'm not a robot" to "I want to do unpaid image classification". After a long exchange with the fine folks behind addons.mozilla.org (because my account is so old that when I logged in I hit [this bug](https://github.com/mozilla/addons-server/issues/8765) and got 500 Internal Server Error), I've finally sorted out my logins, and today I've uploaded the latest version of this extension to both addons.mozilla.org and the Chrome Web Store. So at least if you're getting screwed by Google, you'll be able to make them be honest about how they're screwing you.

In the words of the README:

> This was Evan Prodromou's idea unless you like it, in which case the idea to follow through and make an actual extension was totally all mine.

I hope people enjoy this extension! _Make ReCaptcha's "I'm not a robot" accurate_ is available as a [Firefox extension](https://addons.mozilla.org/en-US/firefox/addon/make-recaptcha-text-accurate/) and as a [Chrome extension](https://chrome.google.com/webstore/detail/make-recaptchas-im-not-a/olbjmgkbokabjfaelgogjjllpnfjgdoe).


 [tweeted]: https://twitter.com/evanpro/status/1098367574969077761
 [tweet]: https://twitter.com/evanpro/status/1098987608020008961

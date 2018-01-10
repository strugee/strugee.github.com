---
title: "Tell your PR reviewers they're wrong"
time:
  epoch: 1515405895
  utcoffset: "UTC-7"
edited:
  epoch: 1515574508
  utcoffset: "UTC-7"
author: "AJ Jordan"
categories:
  - tips
  - culture
  - blaggregator
---

Have you ever submitted a Pull Request and had the maintainer give you feedback that says something is wrong? This is of course, perfectly natural, and is why we do Pull Request reviews in the first place. But have you ever thought it was actually the _maintainer_ doing the review who was wrong?

I'm the maintainer of a number of open source/free software projects and I have a message for you: **_tell this to the maintainer_, even if you're new, even if you feel like you have no idea what you're doing**.

I'm sure to some people more experienced this sounds like obvious advice, but when you're new to this stuff getting feedback can be really scary. Maintainers have often spent years in the free software community and are super comfortable with how things work, not to mention that they might be more experienced in the language or framework their project uses. So it's super easy to just take their word as gospel. But I think it's super important to remember that everyone's human just like everyone else, and _everyone_ has something to learn.

As a concrete example, take [this comment][] on a Pull Request I received. If you read it and the following comment, I seem like an expert on `eval()`, but what you don't see until you read all the way to the bottom is that I spent about 20 minutes composing that comment because I had to double-check MDN to make sure I was actually correct. And honestly, that was _great_. That Pull Request forced me to recheck what I thought about the way `eval()` worked, _and_ the contributor learned from it too! So it ended up being a win-win. Even if I was wrong, that would have been great too, since I would've learned something new. Sometimes the thing being discussed is just a really tough or confusing problem, and getting feedback on a PR can be a really awesome chance for both you _and_ the maintainer to collaborate more closely and figure it out together!

I'm sure this won't work in every community. But honestly, if it doesn't, the maintainer you're running into is probably an ass and not worth bothering with anyway. This is what doing things in the open is all about - [freedom 1][], after all, is "the freedom to study the source code and make changes", the operative word being "study". The fact that knowledge is shared out in the open with anyone who wants it is one of the most amazing parts of this community, and I want to encourage you to stay curious and ask lots of questions.

So if you've ever walked away from a Pull Request review feeling like something wasn't quite right, consider this your permission slip to politely _tell your reviewer you think they're wrong_[1] - just make sure to be polite and explain why you think so! And remember, whatever they say, they're not criticizing you personally. I hope you embrace it as an opportunity to grow.

Footnotes:

[1]: Phrasing this as "I think you're wrong" instead of "you're wrong" is great for a lot of reasons, but one notable and less obvious one is that if the maintainer _does_ end up being right, you won't feel silly.

_Edited to clarify that I'm not advocating inpoliteness, to change the phrasing to "I_ think _you're wrong", and to add some nice framing around a chance to collaborate on a difficult problem. Thanks to the Recurse Center folks whose feedback turned into these changes, particularly [Sumana Harihareswara][] and [Julia Evans][]._

 [this comment]: https://github.com/pump-io/pump.io/pull/1310#issuecomment-291554491
 [freedom 1]: https://www.gnu.org/philosophy/free-sw.html
 [Julia Evans]: https://jvns.ca/
 [Sumana Harihareswara]: https://www.harihareswara.net/

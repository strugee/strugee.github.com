---
title: How I passed 2k GitHub contributions
time:
  epoch: 1487871979
  utcoffset: "UTC-5"
author: "Alex Jordan"
categories:
  - personal
  - development
  - blaggregator
---

So the other day I logged into GitHub and saw something crazy:

![Screenshot of my GitHub contribution graph showing 2,054 contributions over the past year](/images/github-2k-contributions.jpg)

How in the hell did I end up with that many contributions? Well, I think I know why - it happened because of a couple related, small habits I have. I thought I'd share them with everyone else as a sort of trivia - maybe you can adopt these habits too! (Although hopefully because you think they're good ideas, not because you just want to make yourself look cool on GitHub.)

## Fix typos

If projects are freedom-respecting, that means that anyone is welcome to contribute if they're able to offer something valuable. How many times have you seen a typo in some docs? GitHub makes it super, super easy to fix these (just click the pencil icon in the upper-right of GitHub file views), and they're a fantastic way to contribute a little back to projects. Even if you aren't reading docs on GitHub, it often doesn't take that much time to find where they're hosted (which is frequently GitHub anyway). Really good docs will even have a link to their source right on the generated page.

So whenever I see a typo, I send a Pull Request. It's become an automatic response to seeing something that needs fixing, and is pretty routine for me nowadays.

Oftentimes there are changes that aren't as easy as a typo, but are still super easy to fix. Take [this Homebrew PR][homebrewpr] - I authored it on a tablet and it took me under 3 minutes to make the suggested change\[1]. That's not a lot of effort, and it'll help lots of people looking for the Homebrew change log. The next time you find yourself thinking "it kinda sucks that..." ask yourself - can I fix this myself? And if you can, go for it! Even if you screw up, I promise most projects will want to help you out instead of making fun of you\[2] - as someone who runs several freedom-respecting projects, I know that getting new contributors is very, very valuable and because of that I'll do a lot to make contributing a good experience. I would encourage everyone to, as Mike McQuaid puts it in that Homebrew PR, "be the change you want to see in the world."

 \[1]: of course, that's partly because I'm pretty good at git and grok things like `rebase -i`. But even if that's not you and it would take you longer, it sounds like a great opportunity to improve your git skills to me!

 \[2]: I feel obligated to point out that not every project is like this - there are some projects that have a terrible culture (\*coughcough\*Linuxkernel\*cough\*). Screw them. They're not that common in my experience and it's their loss, anyway. Don't let them deter you from trying to improve things outside of their bubble of suck.

## File issues

I just talked about making small changes whenever you see something you can improve with a couple minutes' time. But what if you're in a hurry, or it would take longer?

Filing issues is a super easy way to solve this. Get into the habit of filing issues for everything that irks you\[3] - you're not allowed to say "such-and-such a project sucks because it's buggy!" when you haven't told the developers about the bug you're experiencing!

Filing issues also takes very little time and is super helpful to the developer. Probably a lot of the people who read this blog are software developers, so I'm betting you can understand how great it is to receive an issue that gives you lots of details that you can then use to fix a bug or a design problem. So why not give the gift of issues? Just make sure to search for duplicates! (This accounts for a significant amount of those 2,000 contributions on my GitHub profile. Over the course of my time on GitHub, I've filed 619 issues, 438 of which were on other people's projects. Of course, that's just on GitHub - I also do this frequently _outside_ of GitHub.)

Again, every time you find yourself saying, "why doesn't it..." or "I wish it..." or "it's so annoying when...", let the developer know! You'll help them make their project better.

  \[3]: this is not to suggest that you file ridiculous issues that don't really say anything or just complain. But a focused bug report describing something concrete that's problematic is awesome.

## Publish by default

This is the last and biggest habit I have that I think led to those 2k contributions: I publish everything by default, no matter what. It doesn't matter how bad or hacky or ugly I think a software project is, I just publish it. Because honestly, why not?

Keeping projects public doesn't get in anyone's way. It's not like someone will look at your GitHub and be _annoyed_ that you give so much software to the world. And there's even a chance that your hacky script may actually be _useful_ to someone. Even if I think a project is "bad" I'll still publish it because the reality is that no one is going to go around GitHub specifically trying to find people to make fun of.

Publishing projects also gives me incentive to clean them up - write a README, write tests, and keep a change log (if relevant). My standards are higher because I know all my work is all in the open - not because I'm afraid of other people telling me I'm doing it wrong, but because I want to create high quality code that has a better chance of being useful to the wider community.

## In summary

All of these habits are related. The tl;dr is this: engage by default. Get used to being involved instead of shrugging off a problem and moving on. Put your work out there for other people to see. The open source/freedom-respcting software community belongs to everyone - and that means we can all contribute to improving it. We just have to start.

 [homebrewpr]: https://github.com/Homebrew/brew/pull/1634

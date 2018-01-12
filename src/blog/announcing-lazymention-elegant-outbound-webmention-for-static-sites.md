---
title: "Announcing lazymention: elegant outbound Webmention for static sites"
time:
  epoch: 1514598724
  utcoffset: "UTC-7"
edited:
  epoch: 1515726606
  utcoffset: "UTC-7"
author: "AJ Jordan"
categories:
  - development
  - indieweb
  - releases
  - blaggregator
syndicate:
  - indienews
---

Last night I hit publish on version 1.0.0 of a new project, [lazymention][]! Whoohoo!

tl;dr: lazymention exists to add Webmention support to static sites!

To elaborate a little bit, I developed lazymention because I had a problem with this site: I wanted to send outbound [Webmentions][] when I link to things, but my website is completely static. (Webmention, in case you didn't know, is a way to notify another website that you linked to them, so the other website can display some UI about your reply or whatever.) The page builds happen on my local machine, not on the server. One option would be to just send Webmentions from my local machine too, but this isn't really a good solution for a couple reasons. First, I couldn't do it automatically at build-time because the built pages wouldn't have been deployed to the server yet, so receivers of my Webmentions would reject the mentions due to the source being nonexistant. That meant that I would have to have a separate step, which wouldn't really be _that_ big of a deal (lazymention reqires pinging a server too) except for the second reason: I would need some way to keep track of where I'd already sent Webmentions to, and that would require synchronizing across computers. Probably the only decent way to do that would be to check it into Git, but having a program's data store checked in right next to the source code just feels kinda ugly. Plus, then it can't be shared with other people as a service.

So instead of doing it locally, I elected to build a server instead. Here's how it works: you mark up your stuff with [`h-feed`][] and [`h-entry`][], and whenever anything happens (e.g. you publish a new blog post or whatever), you ping lazymention with the URL (either the feed or the post itself). lazymention will use your microformats2 markup to find the canonical location for a given post, then it will find all the links in the post and send Webmentions for them. And presto! You've just sent Webmentions for your blog. lazymention also records when it's sent mentions, so if you ping it again, nothing will happen unless you've updated your content. I'm also planning to add [WebSub][] support to lazymention, too, and that'll work in the exact same way.

lazymention is super easy to get started with, especially because I've provided thorough documentation in the [README][]. If you find anything that's confusing or missing, please let me know by [filing an issue][]! I'd love to get it fixed. In fact, I'd be thrilled to hear about both positive _and_ negative installation experiences.

Oh, and one more thing - lazymention is reusable in other applications. If you're writing a Node.js app and want to reuse its HTTP API, you can use its embedding API to get at the Express application and `Router` used internally. I'm not sure if people will actually find this useful, but I wrote it just for kicks anyway. See [the embedding documentation][embed] for more!

Cheers, and happy mentioning! Elegant outbound Webmention for static sites is here.

 [lazymention]: https://github.com/strugee/lazymention
 [Webmentions]: https://indieweb.org/Webmention
 [`h-feed`]: https://indieweb.org/h-feed
 [`h-entry`]: https://indieweb.org/h-entry
 [WebSub]: https://indieweb.org/WebSub
 [README]: https://github.com/strugee/lazymention/blob/master/README.md
 [filing an issue]: https://github.com/strugee/lazymention/issues/new
 [embed]: https://github.com/strugee/lazymention/blob/master/README.md#embedding

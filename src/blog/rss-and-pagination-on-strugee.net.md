---
title: "RSS and pagination on strugee.net"
time:
  epoch: 1484074081
  utcoffset: "UTC-5"
author: "AJ Jordan"
categories:
  - development
  - blaggregator
---

RSS and pagination are now enabled on strugee.net's blog, thanks to [stratic-indexes-to-rss][] and [stratic-paginate-indexes][] respectively.

The pagination code is already pretty solid although there's always room for [improvement][] - thanks to [Ajay Tungare][] for pairing with me at the [Recurse Center][] and helping me catch the bug! However, I'm not particularly confident in the RSS code, since RSS is actually somewhat tricky to properly handle. Because of that, I would seriously appreciate it if people tried adding the RSS feeds to their readers and seeing if anything breaks. If so, [let me know][]!

Cheers!

 [stratic-indexes-to-rss]: https://github.com/strugee/stratic-indexes-to-rss
 [stratic-paginate-indexes]: https://github.com/strugee/stratic-paginate-indexes
 [Ajay Tungare]: https://github.com/atungare
 [Recurse Center]: https://recurse.com
 [improvement]: https://github.com/strugee/stratic-paginate-indexes/issues
 [let me know]: https://github.com/strugee/stratic-indexes-to-rss/issues/new

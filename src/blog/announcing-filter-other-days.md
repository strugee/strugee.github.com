---
title: "filter-other-days: Artificial Ignorance-compatible logfile date filtering"
time:
  epoch: 1508541591
  utcoffset: "UTC-4"
edited:
  epoch: 1515726606
  utcoffset: "UTC-7"
author: "AJ Jordan"
categories:
  - development
  - security
  - sysadmin
  - releases
  - blaggregator
aggregators:
  lobsters: https://lobste.rs/s/kfav4c/filter_other_days_artificial_ignorance
---

I've just published version 1.0 of my latest project, `filter-other-days` - a shell script to filter logfiles for today's date in an Artificial Ignorance-compatible way.

If you haven't heard of [Artificial Ignorance][], it's something you should look into cause it's pretty awesome. Here's the tl;dr: it doesn't make sense to look for all the "interesting" things  in logfiles, because it's not actually possible to enumerate all the failure conditions of a system. So instead what we do is _throw away_ entries that we're _sure_ are just routine. Since we've gotten rid of all the uninteresting entries, whatever is left has to be interesting.

I find this pretty compelling, and decided to start implementing it on my Tor relay. I quickly realized that my ideal workflow would be to configure cron to send me email with a daily report of interesting log entries. However, this presented a problem: how to get just today's log entries? I wanted to be able to handle all logfiles at once instead of receiving different reports for different logs, so I had to be able to parse all logfiles in the same way. My relay runs on FreeBSD, so the logs are unstructured text files, and even worse, several daemons (like Tor itself) write timestamps in a different format - this makes parsing all logfiles at once super difficult because I couldn't just trivially `grep` for today's date since that would end up dropping legitimate entries from logfiles that formatted their timestamps differently.

I briefly considered trying to write a regex to match all sorts of different timestamp formats, but quickly rejected this idea as too fragile. There are a lot of moving parts in a modern operating system - what if e.g. a daemon changed its defaults about how to format timestamps? Or, more likely, what if I simply missed a particular format present in my logs? Then I'd be accidentally throwing away an entire logfile. To solve this problem, I decided to apply the same idea behind Artificial Ignorance - if I couldn't reliably, 100% match log entries from today's date, I could do the next best thing and attempt to discard all entries from _other_ dates. In this case the worst that could happen is me recieving irrelevant information, and I'd be basically guaranteed to never miss an legitimate entry from today.

`filter-other-days` is a working implementation of this design. Originally I put it with the other random scripts I keep with my [dotfiles][], but it quickly became obvious that it was useful as a standalone project. So I [extracted][] it into its own repository, which now lives [on GitHub][]. From there I continued to improve the script while adding a test suite and writing extensive documentation (including a Unix manpage - I always feel like a wizardly hacker when writing those things). This took, by my estimation, somewhere between 10 and 15 hours because this is actually a shockingly non-trivial problem, but mostly because regexes are hard.

But today I finally finished! So I'm super excited to announce that version 1.0 of `filter-other-days` is now available. You can either clone it from GitHub or download a [tarball][] (and the accompanying signature, if you want). It works pretty well already, but I have some ideas for future directions the project could go:

1. Logic allowing you to actually specify the date you want to filter for, instead of assuming it's today (though you actually can already get this behavior using `faketime`; that's what the test suite does)
2. Removal of the dependency on GNU `seq` - this is, to my knowledge, the only non-POSIX requirement of `filter-other-days`
3. Debian package, maybe?
4. More log formats (please [report bugs][] if you have formats `filter-other-days` doesn't recognize - which you probably do!)

If you find this project useful, let me know! I'd love to hear about how people are using it. Or if it breaks (or doesn't fill your usecases), please [report bugs][] or send patches - I love those, too! Either way, may the logs be with you!

 [Artificial Ignorance]: http://www.ranum.com/security/computer_security/papers/ai/index.html
 [dotfiles]: https://github.com/strugee/dots/tree/master/bin
 [extracted]: https://github.com/strugee/dots/commit/7dd7e2755c55194cdff1c7b24b24bca72581e346
 [on GitHub]: https://github.com/strugee/filter-other-days
 [tarball]: https://github.com/strugee/filter-other-days/releases/tag/v1.0.0
 [report bugs]: https://github.com/strugee/filter-other-days/issues

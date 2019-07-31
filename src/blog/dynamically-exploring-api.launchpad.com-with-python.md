---
title: "Dynamically exploring api.launchpad.com with Python"
time:
  epoch: 
  utcoffset:
author: "AJ Jordan"
categories:
  - development
  - explanations
  - blaggregator
draft: true
---

A couple months ago I was working on a toy project of mine, [count-your-issues][], whose job is literally just to count how many bugs you've filed in your life (because I was curious about that for myself). I was working on adding providers for more bug trackers, and specifically, I was adding a provider for [Launchpad][], a bug tracker most notably used by [Ubuntu][]. In the process, I ended up coming up with a really great way to interactively extract the URLs and request parameters I needed from Launchpad's Python library.

Launchpad has a pretty okay API, but unfortunately, [its documentation][docs] is not really up to par - it has information on all the resources you can access through the API, but it lacks specifics and in particular, examples. The wiki page linked from the API documentation isn't a lot better. I read lots of those pages and while they _helped_, I still couldn't completely get where I needed to go. It shouldn't be this hard, right?

Then I hit on an idea. Lots of those pages talked about [launchpadlib][], the Python library maintained officially by Canonical. I should be able to do something with that, so I tried reading the sources of a program or two that I could find using launchpadlib, and then the sourpce of launchpadlib itself. It was organized in a way I wasn't familiar with, though, so I decided to bust out an [IPython][] REPL and try to figure out how to get launchpadlib to show me the data I wanted. This is a wonderful way to explore this kind of library and I highly recommend it; you can just poke ppat object and property names that seem interesting, maybe read a page of documentation or two here and there to get some more context, and then continue exploring.

After a while of poking at it in the REPL, I had a few lines of code in the REPL that were giving me the data I wanted, in the right format. Exactly what those lines were I can't remember, since it was a couple months ago (and to be honest I'm feeling lazy and don't want to go digging for them in my REPL history). That's okay though, because they're not that interesting anyway. What's really interesting is what I realized next: somewhere, _launchpadlib was actually making the **exact** request I wanted to make_. So what if I just found that place?

Turns out that launchpadlib uses [Requests][], the de-facto standard HTTP library in the Python world. 

 [count-your-issues]: 
 [Launchpad]: https://launchpad.net/
 [Ubuntu]: https://ubuntu.com
 [docs]: https://api.launchpad.net/
 [launchpadlib]: https://help.launchpad.net/API/launchpadlib
 [IPython]: https://en.wikipedia.org/wiki/IPython
 [Requests]: https://2.python-requests.org/en/master/

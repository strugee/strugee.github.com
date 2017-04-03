---
title: "Getting on board with configuration management"
time:
  epoch: 1490734796
  utcoffset: "UTC-4"
author: "Alex Jordan"
categories:
  - development
  - sysadmin
  - blaggregator
---

For a long while I've really disliked configuration management. This mostly stemmed from my experience [managing Apache via Puppet][puppet], which I found indirect and unnecessary - the only reason I did this was basically to get version control. In fact, I even started a project called [bindslash][] which I literally described as "not configuration management".

However, last Thursday, steevie (my primary server) crashed _again_. So I went into a fallback DigitalOcean VM I'd set up the last time this had happened and updated stuff. I presented my [LibrePlanet slides][] from that. And eventually I bit the bullet and set up a secondary email server which, to my great surprise, has not received a flood of spam yet (though I'm sure it will at some point).

The whole ordeal really made me understand the benefit of configuration management. I would've spent less time and been less stressed if I could just plug in a config management system to get a useful failover system. So as of today, I'm on board with configuration management, and bindslash is dead.

I still kinda hate Puppet, so I think I'll try out Ansible and _maybe_ Chef. Ansible's agentless model in particular probably makes a lot of sense for my needs. It also makes me sad to kill bindslash, since I still think it would be a useful project and there's definitely a place for it in the world. But I no longer have any reason to work on it, so I'm just going to stop pretending I'll ever finish it. If anyone is interested in that approach, talk to me and I'll happily give you the name, the repo, my thoughts on its design, etc.

Anyway. Now to set up outbound mail on the failover VM.

\*big sigh\*

 [puppet]: https://github.com/strugee/steevie/blob/3069f53ee82c6b1709f22285b71ccdc0e5e0bced/apache-config/apache-config.pp
 [bindslash]: https://github.com/strugee/bindslash
 [LibrePlanet slides]: https://strugee.net/presentation-pumpio/libreplanet/

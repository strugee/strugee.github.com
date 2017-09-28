---
title: "Revisiting my Tor relay"
time:
  epoch: 1441413269
  utcoffset: "UTC-8"
author: "AJ Jordan"
categories:
  - sysadmin
  - tor
---

(Okay, so I _miserably_ failed my blog-every-day thing. Shut up. Maybe next time I'll try every week or something... anyway.)

A couple of days ago I logged into the [Tor relay I run][1] to show someone the ARM graphs. I had a fair amount of traffic, so the graphs were fairly impressive, but I'm also in the habit of running `apt-get update; apt-get upgrade` every time I log into a server, so I did that too. To my surprise, I got a message telling me that there was a dependency problem with my kernel! So like the great sysadmin I am, I looked at such a fundamental system problem, shrugged my shoulders, and said, "oh, I should probably fix that". And then logged out.

Well, I did end up fixing it today. And boy, was it an adventure. My first step was to ignore the APT problems and edit my `torrc`, to reflect a) the fact that I'm not eligible for the AWS Free Tier anymore (so I needed to throttle bandwidth), b) my new email, and c) my new GPG key. With that being done, I knew that I could easily have the system fix dependency problems by doing a simple `apt-get install -f`. Easy!

Well, no. That tried to install some Linux kernel headers, which seemed all well and good, until I got this:

    Unpacking linux-headers-3.2.0-90 (from .../linux-headers-3.2.0-90_3.2.0-90.128_all.deb) ...
    dpkg: error processing /var/cache/apt/archives/linux-headers-3.2.0-90_3.2.0-90.128_all.deb (--unpack):
    unable to create `/usr/src/linux-headers-3.2.0-90/arch/arm/plat-pxa/include/plat/dma.h.dpkg-new' (while processing `./usr/src/linux-headers-3.2.0-90/arch/arm/plat-pxa/include/plat/dma.h'): No space left on device
    No apport report written because the error message indicates a disk full error
    dpkg-deb: error: subprocess paste was killed by signal (Broken pipe)

Um, what? How am I out of free space? Okay, whatever. I knew that there were probably a lot of packages cached in `/var/cache/apt/`, including old, vulnerable packages that had been replaced by the unattended upgrades system. I did an `ls`, and found only about five `.deb` files - something must have been automatically cleaning that directory. I was getting a little worried now, but I nuked the files anyway and reran `apt-get install -f`. _Same thing_. Well, okay, maybe I didn't get rid of enough stuff? How much did I need?

    $ df -h /
    Filesystem      Size  Used Avail Use% Mounted on
    /dev/xvda1      4.0G  2.2G  1.6G  59% /

At this point I'm in full-on "something-is-seriously-wrong-and-I-_need_-to-recover" mode. How was it possible that I had only used 59% of the filesystem, but `dpkg` was saying my disk was full? A little searching the internet later, I found the culprit:

    $ df -i
    Filesystem     Inodes  IUsed IFree IUse% Mounted on
    /dev/xvda1     262144 257479  4665   99% /
    udev            74758    377 74381    1% /dev
    tmpfs           76179    259 75920    1% /run
    none            76179      3 76176    1% /run/lock
    none            76179      1 76178    1% /run/shm

I hadn't run out of disk space. But I _had_ run out of inodes. (Isn't this supposed to happen to _other_ people?)

I tried removing some stuff via APT, but that refused to do anything due to the dependency problems. My next thought was that there were probably a bunch of old processes running that were essentially holding a bunch of inodes hostage. I couldn't install `debian-goodies`, so I couldn't use `checkrestart`, but I improvised by looping over all running services in a for loop, and restarting them.

Still nothing.

I'm not proud of what I did next. But I was backed into a corner, so I did something only `dpkg` is supposed to do. I ran `rm -r` on a couple directories in `/usr/src`. And boy, it was like magic. Suddenly `apt-get install -f` worked like a charm. It started to upgrade a couple packages, rebuilding some GRUB configuration files... and then came to a screeching halt.

    Setting up linux-headers-3.2.0-90-virtual (3.2.0-90.128) ...
    dpkg: dependency problems prevent configuration of linux-headers-virtual:
    linux-headers-virtual depends on linux-headers-3.2.0-68-virtual; however:
    Package linux-headers-3.2.0-68-virtual is not installed.
    dpkg: error processing linux-headers-virtual (--configure):
    dependency problems - leaving unconfigured
    No apport report written because the error message indicates its a followup error from a previous failure.
    dpkg: dependency problems prevent configuration of linux-virtual:
    linux-virtual depends on linux-headers-virtual (= 3.2.0.68.81); however:
    Package linux-headers-virtual is not configured yet.
    dpkg: error processing linux-virtual (--configure):
    dependency problems - leaving unconfigured
    No apport report written because the error message indicates its a followup error from a previous failure.
    Errors were encountered while processing:
    linux-headers-virtual
    linux-virtual
    E: Sub-process /usr/bin/dpkg returned an error code (1)

Are you kidding?? _More_ errors?

Turns out that APT is essentially the only thing on this system that makes large changes to the filesystem. So the probability that APT would be the program to trigger the inode limit was pretty high. It started an upgrade run, then got interrupted in the middle by the "no space left on device" error, leaving the dependency tree in a state that we in the tech community call "100% totally screwed". (This is the technical term.)

I'll spare you the gory details, but I ended up trying to chase down packages in the Ubuntu archive, running `ubuntu-support-status` beacuse I was wondering if the packages I was looking for actually _weren't in_ the archive, because they were unsupported, using `aptitude` instead of `apt-get` (because `aptitude`'s dependency resolver tends to be better), etc. Finally the solution turned out to be doing `dpkg --install` on the exact right `.deb`s in the exact right order, which finally satisfied APT's dependency woes, allowed `apt-get install -f` to fix the configuration problems, and allowed the hundreds of packages which had been waiting for an upgrade to _finally_ install. Whew!

Anyway, I need to upgrade the version of Ubuntu the system is on (currently it's 12.04.5 LTS), because Tor is out of date (among other reasons). However, since that will involve taking the system down for a reboot, I wanted to memorialize the following:

    $ uptime
    00:01:47 up 392 days, 17:15,  1 user,  load average: 0.05, 0.04, 0.05

Holy moly. This system is bordering on 400 days of uptime. That's over a year of continuous run time! Astonishing.

Wish me luck with this upgrade...

**tl;dr**: inode limits are _killer_.

 [1]: https://atlas.torproject.org/#details/710E9E3A0A443E3FD33D2801298042783CAD2EAE

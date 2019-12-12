---
title: "filter-other-days 1.1.0 and 2.0.0 are now available"
time:
  epoch: 1576104324
  utcoffset: "UTC-5"
author: "AJ Jordan"
categories:
  - development
  - releases
  - sysadmin
  - blaggregator
aggregators:
  lobsters: https://lobste.rs/s/2pi2tz/filter_other_days_1_1_0_2_0_0_are_now
---

I'm pleased to announce that `filter-other-days` 1.1.0 and 2.0.0 are now available. In fact, they were both released simultaneously over three weeks ago while I was at [SeaGL](https://seagl.org/), but things at college have been so hectic I'm only just finding time to write about them! If you're not already familiar with `filter-other-days` - which provides reliable, Artificial Ignorance-compatible logfile date filtering even in the face of unknown formats - I would encourage you to read my blog post [introducing the tool for the first time](https://strugee.net/blog/2017/10/announcing-filter-other-days). Or, if you read this post late enough, you could even watch video of the [talk I gave at SeaGL](https://osem.seagl.org/conferences/seagl2019/program/proposals/682), which talks about `filter-other-days` before pivoting into a broader discussion of the kind of runaway complexity `filter-other-days` is designed to address.

1.1.0 and 2.0.0 are both feature releases. Due to `filter-other-days` 2.0.0 breaking compatibility with OpenBSD, I'm providing 1.1.0 which contains everything that `filter-other-days` 2.0.0 does _except_ for the feature that breaks OpenBSD support - localization in the logfile filters. (Localization does not and to my knowledge cannot work on OpenBSD because OpenBSD does not support the POSIX features that `filter-other-days`' localization relies on.)

Here are the highlights of the engineering that both 1.1.0 and 2.0.0 share:

* `filter-other-days -d` operates on any day instead of the current date on supported systems
* `filter-other-days` is portable to OpenBSD, NetBSD, OpenIndiana and OmniOS (i.e. illumos), and Cygwin
* GNU `seq` is no longer required; the only requirement for core functionality is now POSIX
* Several bugs have been fixed
* Release artifacts are built [reproducibly](https://reproducible-builds.org/)
* Automated testing has been improved

Note that `filter-other-days -d` _does_ require more than POSIX - it needs a system with either GNU `date -d` semantics or BSD `date -r` semantics. This is because POSIX does not provide enough support to implement this feature otherwise. If your system does not support either of these, `filter-other-days` will simply turn the feature off. You can check if `-d` is available by looking for it in the help output - it will show up only if the system supports it.

In addition to the above, `filter-other-days` 2.0.0 _also_ includes support for filtering logfiles in different locales. This means that if your system logs things like month names in languages other than English, `filter-other-days` will now be able to process these logs! `filter-other-days` will automatically use the C locale (which is mandated to be available by POSIX) and will additionally use the locale defined by the `$LANG` environment variable, if set. You can also specify more locales to be loaded by specifiying the `-l` command line flag. `filter-other-days` extracts the information it needs using specific keywords in the system locales, which means that if you want `filter-other-days` to load a particular locale to filter with, you need to have that locale installed.

Unfortunately, there's one more complication: some systems are buggy and do not have keywords that properly conform to POSIX. [FreeBSD 12.0 and below](https://bugs.freebsd.org/bugzilla/show_bug.cgi?id=237752) as well as [NetBSD](https://gnats.netbsd.org/cgi-bin/query-pr-single.pl?number=54693) are known to have these bugs. Since these systems are relatively popular, I am providing patched versions of `filter-other-days` that will work around these bugs. You can recognize these versions because they have `freebsd` in the tarball filename. They will also tell you they've been patched for FreeBSD (and NetBSD) in all relevant places, like the version output and the manpage.

So, to summarize what version to use:

* If you're on OpenBSD, use 1.1.0
* If you're on FreeBSD 12.0 or below, or on NetBSD, use 2.0.0 with FreeBSD patches
* Otherwise, use the unpatched 2.0.0 tarballs

I hope these releases of `filter-other-days` are useful to people! I'm super proud of them and I couldn't be more excited for people to try them out. And as always, feel free to [report any bugs](https://github.com/strugee/filter-other-days/issues) you find!

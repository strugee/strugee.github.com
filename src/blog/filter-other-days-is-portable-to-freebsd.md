---
title: "filter-other-days is portable to FreeBSD"
time:
  epoch: 1509583193
  utcoffset: "UTC-4"
author: "AJ Jordan"
categories:
  - development
  - releases
  - sysadmin
  - blaggregator
---

I'm pleased to announce `filter-other-days` 1.0.1. This is a bugfix release primarily improving portability to other Unix-like operating systems; in particular, the test suite now fully passes under FreeBSD. Specifically:

* Various portability bugs in the test suite itself were fixed - the test suite no longer relies on a GNU `date` (with GNU `date -d` semantics) or a fully-functional `/dev/fd` (the fallback option is named pipes), and it doesn't hardcode bash's install path as `/bin/bash`
* Some non-portable uses of `echo "\n"` which break under BSD systems were replaced with `printf` invocations
* Travis CI now checks `filter-other-days` with Debian's `checkbashisms` script, which is run in strict mode
* Non-portable uses of `test`'s `-o` option were caught by `checkbashisms` and replaced with `||`

With these changes I expect that `filter-other-days` will probably run on all major BSD distributions. I intend to confirm this hypothesis soon and have filed bugs for [OpenBSD][] and [NetBSD], plus [illumos][] just for kicks.

As with 1.0.0, you can clone `filter-other-days` [from GitHub][] or you can download a (signed) [tarball][]. Please do [report any bugs][] you find in the release.

Enjoy!

 [OpenBSD]: https://github.com/strugee/filter-other-days/issues/12
 [NetBSD]: https://github.com/strugee/filter-other-days/issues/13
 [illumos]: https://github.com/strugee/filter-other-days/issues/14
 [from GitHub]: https://github.com/strugee/filter-other-days
 [tarball]: https://github.com/strugee/filter-other-days/releases/tag/v1.0.1
 [report any bugs]: https://github.com/strugee/filter-other-days/issues/new

---
title: New temporary signing keys
time:
  epoch: 1524020493
  utcoffset: "UTC-4"
author: "AJ Jordan"
categories:
  - personal
  - security
  - blaggregator
---

So unfortunately, recently I have lost my Nitrokey, which I liked very much. In addition to this being fairly upsetting, I am now left with the sticky situation of not being able to sign code - while I have a master key (from which I can generate new subkeys), I'm currently at college and my copy of the key is sitting 3,000 miles away at home.

To get around this situation, I've generated a temporary signing keypair. This keypair is set to expire after 3 months (and I don't intend to renew it). When I have access to my master keypair, I will revoke the old subkeys, generate new subkeys (it was probably time, anyway) and revoke the temporary keypair.

The new fingerprint is `D825FD54D9B940FF0FFFB31AA4FDB7BE12F63EC3`. I have uploaded the key to [GitHub][] as well as the Ubuntu keyserver and `keys.gnupg.net` (just as my original was). The key is also incorporated into my Keybase account so that you can bootstrap trust in it, if you want to verify software signatures or whatever.

 [GitHub]: https://github.com/strugee.gpg

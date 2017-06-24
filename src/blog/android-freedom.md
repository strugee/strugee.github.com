---
title: "Android freedom"
time:
  epoch: 1476758443
  utcoffset: "UTC-7"
author: "AJ Jordan"
categories:
  - musings
---

Recently I backed up and restored both my Android phone and my Android tablet. There were a couple reasons for both of these. The tablet had been borked for quite a long time (any time I tried to upgrade it from the Android 5.0 build it was running, it failed - also the thing just froze randomly). The phone was on the CyanogenMod nightly channel and I wanted to switch to the snapshot channel, plus within the past couple days both WiFi and the cell network data connection straight up stopped working so it was pretty unusable. At first I wanted to switch to [CopperheadOS][1] on both devices. CopperheadOS doesn't support GApps and will probably never support GApps (for very good reasons), and I said, maybe I can make it work. Sadly, I couldn't - I still regrettably need stuff from the Google Play Store. (The tablet ended up back on stock because I want fast upgrades, and the phone ended up on CyanogenMod because they have the fastest upgrades while still offering root.)

The whole experience made me think, though - what would it take to create something that functioned like GApps, but respected your freedom? I'm sure some people reading are already scrambling to link me to their favorite Google Play Services reimplementation, but this isn't the only thing that's in GApps. You gotta think about the user experience, too. Such a system should be able to:

* Provide the nice APIs that Google Play Services does
* Store your photos in the cloud, like Google Photos
* Related to the above, automatically backup and restore apps and their data
* Transfer from other devices, similar to the above item
* Support functionality like Google Now
* Ditto for Google Assistant
* Integrate into the initial device setup to configure all this stuff

I'm sure there are more that I've missed.

Honestly, we're actually quite close to this. The first bullet can be mostly accomplished with something like [microG][2]. Automatic backup and photo storage needs a UI, but fundamentally can be accomplished with any generic WebDAV implementation. F-Droid can be used as the app store. Imagine this: you take a bunch of photos and install a bunch of freedom-respecting apps on your phone. Then, you get a new one. When you set it up, the phone prompts you to sign in to your WebDAV account (which could be e.g. ownCloud, or a WebDAV implementation on [Sandstorm][3]) and then automatically reinstalls all your apps from F-Droid, as well as retrieving their data from ownCloud. When you open the built-in gallery app, all your photos are already there because they're seamlessly backed up to the cloud. _Your_ cloud. Transfer can be accomplished in a lot of ways, but I can easily see it building on the above.

Supporting something like Google Now is non-trivial, but I've even already proposed [a feature for Huginn][4] that would make this possible. Google Assistant would be very, very difficult, but even without that, we'd have come a long way.

This reality is not that far off. What's missing is some UI pieces and a nice ZIP that can be flashed on top of ROMs, similar to how GApps are flashed today. So who's going to put it all together?

(I suppose I've just volunteered myself - oh well... I'll just add it to my endless list of projects.)

 [1]: https://copperhead.co/android/
 [2]: https://microg.org/
 [3]: https://sandstorm.io/
 [4]: https://github.com/cantino/huginn/issues/1583

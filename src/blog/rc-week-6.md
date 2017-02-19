# Post information

This post was published as "RC week 6" on "1487490172 UTC-5" by "Alex Jordan", and was categorized as "personal,blaggregator".

# Post text

This is week 6 of being at the [Recurse Center][]. 

(I feel obligated to point out that this is being published a week later than it's supposed to be because I got behind. I am, however, very confident that the following is accurate. I used GitHub history and location data to help me remember the parts that were fuzzy.)

## Day 19

Not at RC. Total time at RC 0h0m.

Traveled back from [FOSDEM][].

## Day 20

Arrived ~16:45, departed ~22:10, total time at RC 5h25m.

Somewhat unproductive day. Spent most of it just trawling the web. I was completely exhausted since I got back to my apartment from the airport at 3 in the morning. (My flight got in late, I waited at the airport for a while to see my sister, and at 12:30 I got on my train away from the AirTrain station except that it was in the wrong direction. Also, fun fact, subways and trains run _really_ infrequently at 1 AM. Who knew!?)

I did, however, write the slides for the next day's Security Club presentation on the basics of cryptography. Started them pretty late, though, and mostly finished them at home, which was unfortunate since I was up real late again.

## Day 21

Arrived ~13:00, departed ~22:00, total time at RC 9h0m.

Arrived with a little time to spare before teaching Cryptography Basics for Security Club. Didn't do much in the afternoon before leaving to walk down to the waterfront with 15 people or so, which took an hour and was really, really lovely, honestly. Especially since the Winter 1 batch is ending so soon.

## Day 22

Arrived ~12:00, departed ~5:00, total time at RC 17h00m.

Spent the morning and early afternoon pairing with [Jackie][] on [icalc][]. We fixed a maddeningly weird bug where, when the user input an incorrect value, the operation type prompt would be displayed twice. You can see the fix [here][icalcbug] - the problem was that `getchar()` was retrieving the newline used to "submit" the operation type when the function was called again (recursively). In other words, the stdin stream had _two_ characters on it - the incorrect character, and the newline. The solution was to just use a different function from libc that did this correctly. The entire process was pretty educational, since it required delving into C strings, the libc manpages, etc. After fixing that, Jackie and I paired on [a JavaScript project][bank-prettify] that will display Bank of America account balances on the commandline (a non-trivial problem, since Bank of America requires JavaScript).

In the late afternoon, switched gears a bit to review a PRISM Break PR.

In the evening, I gave a presentation at Thursday night presentations entitled "Mercurial for Git folks". I put zero effort into slides and instead simply opened up a bunch of tabs and terminal windows with content I wanted to point to while I was talking. Then I got up there and just... talked about why Mercurial is neat. At the beginning I asked who used Git (most hands, including mine, went up) and who hated Git (a fair number of hands, including mine, went up). So that was pretty amusing. I talked about how the design was pretty similar to Git, how Mercurial has extensions (because it's written in Python), how that plays into its "disable confusing/dangerous stuff like the staging area and rebase by default" philosophy, and how I've been learning it by just using [hg-git][] with GitHub. I thought it went pretty badly, because I didn't feel like it was very coherent. But the people I asked about it said it was actually pretty good, so that feels nice.

After that, we had the end-of-batch/goodbye Rose party. :'(

I spent a lot of time discussing politics and education with [Stephanie][], which was lovely, and had some other long and interesting conversations that I wish I remember but don't, truthfully. Spent quite a bit of time with [Pieter][], [Heather][], and Nicholas Wagner(?)\[1] messing around on top of the desk chairs, which completely filled Hopper. Eventually ended up sitting in Babbage with Rose, James, Heather, and some other folks (can't remember, honestly) just hanging out. We jacked the space heater way up so it felt like a sauna (aka reeeeeeal nice) and just talked about stuff. Around the 2-3 AM mark Heather and I got bundled up and went out to go to the pharmacy (which turned out to actually be literally right next door) and buy chocolate and nail polish. And then I spent somewhere between 1.5 to 2 hours painting my nails a fabulously sparkly red color called "Devil's Stare" from a brand called "Sinful Colors" - a combination which strikes me as being nothing short of _wild_.

At around 5 AM, everyone decided to go to sleep. I was the only person to go home, and honestly the only reason I did so was because I knew I'd want a shower in the morning. So I spent about 15 minutes trying to find the stupid switch to turn off the kitchen lights, finally gave up and went home, and fell asleep a short while after the sun rose.

 \[1]: I have - embarassingly - forgotten this person's name. Based on comparing a picture taken at this time with the RC directory, this person seems to be Nicholas, but I'm not actually sure. \*deep sigh\*

## Friday

Arrived ~18:00, departed ~1:15, total time at RC 7h15m. As always, Friday doesn't count as a day because RC is technically not in session.

Arrived exceedingly late since I woke up around, you know, 5. Got to RC and did very little before noticing a very large party leaving for dinner, which I joined and ate with (despite saying before I left that I'd had breakfast recently, so I "wasn't going to get anything"). We went out to get Chinese food, then went to a place that served Asian dessert of some kind (I've forgotten). It was beyond lovely, honestly.

(I also mentioned at dinner that I'd missed a week of blogging, so during a discussion with [Chris][] about it I posted to a Zulip topic named "shame AJ" soliciting ideas for a punishment as well as moving the regular Iron Blogger meeting to Tuesday due to the Spring 1 introduction day.)

## Executive summary

This week was particularly unproductive. I only did a little bit of work on icalc, my C project, and other than that the only really RC-related project I did was my security club presentation on cryptography basics. This was mostly because my sleep schedule was super messed up from Brussels, and then got messed up again (just as it was getting back to normal) on Thursday.

This week was also very emotional, since it was the Winter 1s' last week. To all my Winter 1 friends: you made my time at RC amazing and welcoming and exciting and wonderful and I loved being around you all. And I will miss you for a very long time. <3

(\*_starts crying a lil bit_\*)

Total time at RC 38 hours 40 minutes; cumulative time 239 hours 25 minutes.

 [Recurse Center]: https://recurse.com
 [FOSDEM]: https://fosdem.org/2017/
 [Jackie]: https://github.com/Jmeggesto
 [icalc]: https://github.com/strugee/icalc
 [icalcbug]: https://github.com/strugee/icalc/commit/fb20487c5385cb0ae6192cd6540c98fbd82ff2d0#diff-2045016cb90d1e65d71c2407a2570927
 [bank-prettify]: https://github.com/Jmeggesto/bank-prettify
 [hg-git]: https://hg-git.github.io/
 [Stephanie]: https://github.com/steph-rage
 [Pieter]: https://github.com/inytar
 [Heather]: https://github.com/heatherbooker
 [Chris]: https://github.com/chirs

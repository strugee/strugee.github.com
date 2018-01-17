---
title: "Improving GPG security"
time:
  epoch: 1516168873
  utcoffset: "UTC-7"
author: "AJ Jordan"
categories:
  - security
  - personal
  - blaggregator
---

Recently I've been putting some effort into improving the security of my [GPG key](/gpg) setup, and I thought I would take a moment to document it since I'm really excited!

# Nitrokey

First, and most importantly, I have recently acquired a [Nitrokey Storage](https://www.nitrokey.com/). After I initialized the internal storage keys (which took a _really_ long time), I used `gpg --edit-key` to edit my local keyring. I selected my first subkey, since in my day-to-day keyring the master key's private component is stripped, and issued `keytocard` to move the subkey to the Nitrokey. Then I repeated the process for the other subkey.

In the middle of this I _did_ run into an annoying issue: GPG was giving me errors about not having a pinentry, even though the `pinentry-curses` and `pinentry-gnome3` packages were _clearly_ installed. I had been dealing with this issue pretty much since I set up the system, and I had been working around it by issuing `echo "test" | gpg2 --pinentry-mode loopback --clearsign > /dev/null` every time I wanted to perform a key operation. This worked because I was forcing GPG to not use the system pinentry program and instead just prompt directly on the local TTY; since I had put in the password, `gpg-agent` would then have the password cached for a while so I could do the key operation without GPG needing to prompt for a password (and thus without the pinentry error). However, this didn't seem to work for `--edit-key`, which I found supremely annoying.

However this turned out to be a good thing because it forced me to _finally_ deal with the issue. I tried lots of things in an effort to figure out what was going on: I ran `dpkg-reconfigure pinentry-gnome3`, `dpkg-reconfigure gnupg2`, and I even manually ran `/usr/bin/pinentry` to make sure it was working. Turns out that, like many helpful protocols, the pinentry protocol lets you send `HELP`, and if you do so you'll get back a really nice list of possible commands. I played around with this and was able to get GNOME Shell to prompt me for a password, which was then echoed back to me in the terminal!

Despite feeling cool because of that, I still had the pinentry problem. So finally I just started searching all the GPG manpages for mentions of "pinentry". I looked at `gpg(1)` first, which was unhelpful, and then I looked at `gpgconf(1)`. That one was also _mostly_ unhelpful, but the "SEE ALSO" section _did_ make me think to look at `gpg-agent(1)`, where I hit upon the solution. Turns out `gpg-agent(1)` has a note about pinentry programs right at the very top, in the "DESCRIPTION" section:

> Please make sure that a proper pinentry program has been installed under the default filename (which is system dependent) or use the option `pinentry-program` to specify the full name of that program.

The mention of the `pinentry-program` option led me pretty immediately to my solution. I had originally copied my `.gnupg` directory from my old MacBook Pro, and apparently GPGTools - a Mac package that integrated GPG nicely with the environment (as well as providing a GUI I never used) - had added its own `pinentry-program` line to `gpg-agent.conf`. That line pointed at a path installed by GPGTools, which of course didn't exist on my new Linux system. As soon as I removed the line, `--edit-key` worked like a charm. (I've also just added `gpg-agent.conf` to my [dotfiles](https://github.com/strugee/dots/blob/master/.gnupg/gpg-agent.conf) so I notice this kind of thing in the future.)

So far, I'm really enjoying my Nitrokey. It works really well and the app is pretty good, although the menu can be pretty glitchy sometimes. I've used the password manager for a couple high-security passwords (mostly bank passwords) which is great, and I've switched my two-factor authentication for GitHub from FreeOTP on my phone to the Nitrokey since GitHub is a super important account and I really want to make sure people can't push code as me.

There are only two problems I've had with the Nitrokey so far. The first is that it's slow. I notice a significant pause when I do any crypto operation, probably somewhere between a half a second to a second. This hits me quite often since I sign all my Git commits; however I suspect I'll get used to this, and the security benefits are well worth the wait anyway. The other problem is that the Nitrokey doesn't support FIDO U2F authentication. This wasn't a surprise (I knew it wouldn't when I was shopping models) but is nevertheless a problem I would like to deal with (which means getting a second device). The basic reason is just that U2F is newer than the Nitrokey I have. Other than those, though, I would highly recommend Nitrokey. The device is durable, too - I just carry it around in my pocket. (I briefly considered putting it on my keychain - for those of you who haven't met me in person, I have my keychain on an easily-detachable connector attached to a belt loop - but I decided against it because my keychain is kinda hefty.)

# Keybase

In addition to the Nitrokey, I've also finally started using [Keybase](https://keybase.io/)!

For a long time I wasn't too sure about Keybase. I felt like people should really be meeting in person and doing keysigning parties, and I didn't like that they encourage you to upload a private key to them, even if it's password-protected. Eventually I softened my position a little bit and got an invite from [Christopher Sheats](https://keybase.io/yawnbox) (back then you needed an invite) but I only made it halfway through the install process before getting distracted and forgetting about it for, you know, several years.

This time, though, I decided to finally get my act together. Do I still kinda think it's a bummer that Keybase encourages private key uploads? Sure. Are real-life keysignings better? _Absolutely_. But even though they're better, a lot of experience trying to do them and teach them has thoroughly convinced me that they're just too impractical. There are lots of people who might need to at least have _some_ trust in my key - for example, to verify software signatures - and this is a pretty decent solution for them. Not to mention a novel and interesting solution. Plus, it's possible to use Keybase in such a way that you're not compromising security in any way, which is the way I do it.

So tl;dr: I'm on the Keybase bandwagon now. [My profile](https://keybase.io/strugee) is also now linked to from my [GPG keys](/gpg) page.

# Safe for master key

Finally, my dad's wife's safe has recently been moved into our house and is conveniently sitting next to my computer. Currently, I keep my master key in a file on a flash drive with an encrypted LUKS container. When I need to access my master key, this file gets unlocked with `cryptsetup` and then mounted somewhere on my laptop, and I pass the `--homedir` option to `gpg` to point it at the mount location. This is better than just keeping the master lying around day-to-day, but still pretty unideal as I'm exposing it to a potentially compromised, non-airgapped computer. Therefore I plan to get a Raspberry Pi (or something similar) and put it in the safe so I can use it as a fully trusted computer that's never been connected to the internet (and is therefore _very_ hard to compromise). I'll keep the Pi in the safe to provide greater assurance that it hasn't been tampered with, as well as to provide a physical level of redundancy for the key material's security. This will hopefully happen Real Soon Now™ - I can't wait!

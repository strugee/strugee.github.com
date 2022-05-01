---
title: "Getting started with version-controlled configurations"
time:
  epoch: 1397584800
  utcoffset: "UTC-7"
author: "AJ Jordan"
categories:
  - development
  - tips
  - tutorials
canonical: https://web.archive.org/web/20150911232841/http://unix.blogoverflow.com/2014/04/getting-started-with-version-controlled-configurations/
---

Hey everyone, welcome to the inaugural [Unix & Linux](https://unix.stackexchange.com/) community blog post. Let’s get started.

# Introduction

If you’re like me, you work on many different kinds of computers. I have two [Darwin](https://en.wikipedia.org/wiki/Darwin_(operating_system)) machines that I regularly work on; I have about four different installs of [Arch GNU/Linux](https://archlinux.org/), and I am planning to add even more esoteric distributions to one of my boxes. I work in Cygwin. And I have a Debian Sid box, which needs to be converted to something else.

My point is not that I like distribution-hopping. My point is that many of us use very diverse environments, and even if we don’t use very diverse environments, we all have a _lot_ of environments that we work in. I’m also guessing that most of us here have at least some basic configurations accumulated, and many of us have extremely tricked-out shells. Wouldn’t it be nice if there was a coherent way to manage all of your configurations?

Enter version control. Not only can you use version control to synchronize your configurations between computers, but you’ll also inherit all the other benefits of (hosted) version control:

* A nice history of everything you’ve ever done to your configurations – and if you write good, proper commit messages, a nice history of why you made those changes!
* The ability to link to your configuration when you’re [asking for help](https://unix.stackexchange.com/questions/ask), so that people can see the overall context of the snippets that you post
* Nice ways to track subprojects (e.g. frameworks like [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh))
* Show off your stuff way more easily

In this post, I’ll show you how to recreate the [exact setup](https://github.com/strugee/dots) that I use to control my configurations. I prefer to use git, but you should be able to adapt most (if not all) of this guide to your preferred VCS. The only reason you might run into trouble is if your VCS has no equivalent of git submodules.

# The initial import

First, create your repository online. The details will, of course, vary depending on what VCS host you use. Personally, I use GitHub, but again, anything will work.

Next, we need to import all our stuff to the repository. First create a local clone.

    git clone git@github.com:strugee/dots.git

If you don’t like whatever name you chose for the repository, you should rename it now, before you do anything else.

    mv dots configs

Now, copy all the configs that you like into the repository.

    cp .z* configs/ # copies all the zsh stuff

Take care to ensure that you create the directory structure properly and safely. For example, the following is a terrible idea:

    cp -r .gnupg configs/

If you do this, you may accidentally commit `.gnupg/secring.gpg` into git! This is obviously something that you don’t want to do. Instead, do this:

    mkdir configs/.gnupg
    cp .gnupg/gpg.conf configs/.gnupg/

Another thing that you should definitely watch out for is the `.ssh` directory, but you may have other tools that store secret data next to config files. Just be smart.

That’s it! We’re done importing. Now let’s commit.

    cd configs
    git status # double-check what you're commiting
    git commit -m "Initial commit"
    git push

We’re done. Your configuration is live on the internet. There’s just one problem…

# Hooking up your configurations

…and that is that all of your _real_ configurations are separate from your version controlled configurations! If you make changes in one, it won’t do anything to the other.

When I was originally setting all this up for myself, I put my configurations straight into `~`. This is a horrible idea for two reasons:

* Every directory that’s a child of your home, indirect or direct, will be considered a part of a git repository, because a parent of that directory (said parent being `~`) has a `.git` directory.
* You either risk accidentally introducing tons of crap from your home directory into your repository, or you have to maintain a [large and ugly `.gitignore`](https://github.com/strugee/dots/blob/e8d7a133bd852794d8147fdeeab9651145f79409/.gitignore).

The solution that I now use is simply symlinking all my configurations into `~` (or wherever). If you find that this approach incurs too much overhead, you may want to look into a framework to do this for you, as I mention in the “taking it further” section. That being said, I’d encourage you to try simply symlinking, at least at first. It’s surprisingly robust.

Anyway, creating your symlinks is dead-simple. Watch out for things that fail (you’ll want to remember them; if you’re feeling especially forgetful, redirect `stderr` to a file or something).

    cd ~
    ln -s configs/.* configs/* .

This will symlink _everything_ that’s in `configs/` into your home directory. This is probably not exactly what you want, so let’s do some cleanup:

    # pwd is still ~
    rm .git # if you don't remove this, git will think that ~ is a repository!
    rm COPYING # license information that doesn't need to be in your home directory

Notice that we haven’t removed `.ssh` and `.gnupg`. Why? These (probably) didn’t get symlinked when you ran `ln` because they’re (probably) already there. You’ll have to fix these manually, along with anything else that failed when you ran `ln`.

    ln -s configs/.gnupg/gpg.conf .gnupg/
    ln -s configs/.ssh/config .ssh/
    # you'll have a fair amount of stuff in .config; anything that respects XDG_CONFIG_HOME puts stuff there
    ln -s configs/.config/awesome/ .config/awesome

All done! You’re now managing your configurations with git.

# Adding a framework

If you’re like me, you use a framework, like the excellent [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh), or something like [liquidprompt](https://github.com/nojhan/liquidprompt), or whatever other whizzbang what-have-you project you have a preference for. What you’ve probably done right now is simply copied the directory of your framework straight into your repository. This means that whenever your framework updates, you have to commit all the new stuff into your repo. Not only that, but when you clone to a new computer, you have to do some black magic to restore the “repository state” on the new computer, because git automatically ignores any `.git` directory that isn’t a direct child of the root of your current repository. (It all gets very confusing to talk about at this point.)

The solution is to use git submodules. If you’ve never used git submodules before, I’d encourage you to read up on them, either by invoking `man git-submodule` or by reading [the relevant page of Pro Git](https://git-scm.com/book/en/v2/Git-Tools-Submodules). I won’t go into details here, since it would just be duplicating information, but the tl;dr is that git submodules let you embed another git repository into your main repository, but in the Right Way(tm).

Let’s take my old `.oh-my-zsh` setup and fix it to use git submodules.

First, we simply get rid of the old stuff.

    # pwd is ~
    cd configs/
    rm -r .oh-my-zsh

Then we add it back as a git submodule:

    git submodule add git://github.com/robbyrussell/oh-my-zsh.git .oh-my-zsh

And then we commit the result into the repository:

    git add .gitmodules .oh-my-zsh
    git commit

And you’re done! Just push.

Oh your other computers, you’ll have to initialize the submodule after you pull. This is also super easy. Just run:

    git submodule init # only needs to be run the first time
    git submodule update

# Taking it further

There are a number of things that you can do (one of which you _should_ do) to take your version-controlled configurations to the next level.

## License your stuff (this is the thing that you _should_ do)

Your configurations are now public and usable by other people. That means that you should add a license, otherwise people aren’t legally allowed ot reuse your stuff. At risk of starting a flame war, I’ll state that my personal preference for small projects like this is the [WTFPL](http://www.wtfpl.net/).

_Please, **please**_ do this. The public thanks you.

## Getting something to manage it for you

There’s a bunch of stuff in our new setup that you need to run manually. You need to pull. If there are new files, you need to link them. If there are submodule updates, you need to run `git submodule update`. Wouldn’t it be nice if something could do all this for you?

There are a bunch of solutions to this problem. Some people write makefiles. Some people write shell scripts. Some people use a real framework. It’s all up to you.

Personally, I used this problem as an excuse to learn to use `make`. With the [Makefile](https://github.com/strugee/dots/blob/cd3d2c5b3f54538d87478f2ed56a5bf6ad53fe62/Makefile) that I’m in the process of writing, I can pull, update my submodules, and reinstall all my symlinks, all with a simple invocation of

    cd configs/
    make

However, like I said, it’s all up to you. If you prefer to use a framework, you should check out [Zach Holman’s dotfiles](https://github.com/holman/dotfiles) (he has a `Rakefile` that helps you manage this stuff), [Homesick](https://github.com/technicalpickles/homesick) (which is an even more organized framework), [Ben Alman’s dotfiles](https://github.com/cowboy/dotfiles) (which has a more casual, loose organization), [Eduardo Lundgren’s dotfiles](https://github.com/eduardolundgren/dotfiles) (which has a Grunt-powered configuration tool), [ghar](https://github.com/philips/ghar), and [vcsh](https://github.com/RichiH/vcsh) (this may be especially interesting if you just _hate_ the fact that you have to have a separate directory for your config repo). [fresh](https://github.com/freshshell/fresh) is also pretty neat – it’s like a package manager for dotfiles.

While I haven’t used any of these myself, they’re all excellent projects.

## Further reading

[dotfiles.github.io](https://dotfiles.github.io/) is an excellent resource for all this stuff (and, in fact, it’s where I pulled the above list of frameworks from). You may also be interested in a [list of all dotfiles repositories on GitHub](https://github.com/search?q=dots+OR+dotfiles&type=Repositories&ref=advsearch&l=), sorted by popularity. [dotfiles.org](https://web.archive.org/web/20150601022443/http://www.dotfiles.org/) is also a place where people share dotfiles, albeit in a much less organized fashion. I’ve never used it myself, but I’d encourage you to try it out.

# Conclusion

git is awesome. Configurations are awesome. Sketchy `rsync` scripts aren’t the best when you could have organization (and history!) instead.

Good luck and have fun! Let me know in the comments if you run into problems, find new resources, or have anything else to say. (Flames to `/dev/null`, but constructive criticism welcomed.)

Thanks to [@terdon](https://unix.stackexchange.com/users/22222/terdon) for editing this post prior to publication.

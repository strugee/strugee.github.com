# Post information

This post was published as "GitHub's 'squash and merge' default considered harmful" at "1476924018 UTC-7" by "Alex Jordan", and was categorized as "musings".

# Post text

Recently GitHub launched two new ways to merge Pull Requests: "rebase and merge" and "squash and merge". That means that projects now have three ways to merge PRs:

* Merge - creates a merge commit merging the branch (even if it's fast-forwardable)
* Rebase and merge - rebases on top of the target branch and fast-forwards
* Squash and merge - rebases on top of the target branch, squashes all commits into a single commit, and fast-forwards

Now, the default is "squash and merge", because apparently that's what people find to be the "prettiest" history. This bothers me for one simple reason: a squash and merge default means a _history destruction_ default[1].

The whole point of commit squashing is to destroy history. Sometimes that's fine - for example, I might squash a typo fix into an earlier commit, because who cares that I typo'd `vare` instead of `var`? However, anything less trivial than typo fixes is valuable information about how the project evolved. Even if all of the commits just add stuff, and don't change what's happened earlier in the branch (i.e. even if the direction the implementation's taking doesn't change part-way through) the history contained in the branch is _still_ valuable, because the branch's shortlog will give you a nice overview of exactly what changes happened in the branch. Now, you could of course make the argument that commit squashing shows that same information because by default, in both Git and GitHub, the commit messages being squashed are included in the suggested final commit message. I prefer keeping the individual commits, but that's a valid argument.

However, that doesn't change the fact that in cases where the implementation direction _does_ change part-way through, GitHub's default is actively promoting the irrevocable[2] destruction of valuable history. Lots and lots of people use the GitHub Merge Button, especially those who are new to Git. This default is causing those people to unwittingly destroy valuable information. Sure, it looks nicer in the commit log, and I totally advocate for using squash and merge when it makes sense. But those cases are few and far between - it's basically just a small changes, plus a couple typo fixes or additions. And besides, I think it's far better to have a default of an ugly history rather than a default of an incomplete history. The former may not be the prettiest to look at, but the latter has the potential to actively stop people from doing their jobs[3].

For those curious, here's when I use each mode of the GitHub Merge Button:

* Merge - when I have a long-running branch that made significant changes and/or diverged significantly from the target branch. In this case, it's valuable to clearly distinguish what's part of the project and what isn't. Rebase and merge is no good because then it's not clear in the history when the branch started and ended. This is particularly evident when looking at `git log --graph`.
* Rebase and merge - what I use most of the time. I use this when there were a couple small commits that were interesting enough to preserve the difference, but the overall change wasn't so huge that it needs to be clearly distinguished in the history. This provides a nice and pretty commit graph.
* Squash and merge - I rarely use this. When I do, it's because all of the commits on some branch are _so_ trivial, they really don't matter. Mostly this means that the overall change is tiny, and the only additional commits that are added are small additions to the first.

So there you have it. How I use GitHub's Merge Button, and why I think the "squash and merge" default should be considered harmful.

Footnotes:

 \[1]: I'd like to point out that this is only a problem in Git. Mercurial has (or will have shortly) [Changeset Evolution][1], which keeps track of how changesets evolve over time. I.e. when you rewrite history, you're not losing any information.

 \[2]: I'm sure some of you are about to excitedly tell me about a fantastic tool called the reflog, and I really should read Pro Git because it's a fantastic book and has an entire chapter on data recovery. _I know_. The reflog is _not_ the right answer for this; not only is it local to (likely) a single developer's machine, but it only stretches back a couple months and only works if the old, dangling commits aren't garbage-collected. By the time someone might be interested in looking at the history that was lost, it's probably far, far too late.

 \[3]: Another rarely-encountered but very serious problem with both "squash and merge" _and_ "rebase and merge" is when people merge upstream changes in a PR. This is a perfectly legitimate workflow - PRs are great for discussing changes, etc. (although a lot of people think they're the _only_ way to merge things, so they open PRs and then immediately merge them - this, IMHO, is very much _not_ a legitimate workflow) - but if you do anything but merge (which includes both GitHub's "Merge" option and fast-forwarding locally on the CLI), you may have a Very Bad Time the next time you go to merge upstream changes to your fork. Why? Because in Git's view, the changes you merged the first time _haven't actually been merged_. After all, commit SHAs are nowhere to be found in the tree, since when you rewrote history you changed those IDs! Git has no way of knowing that your rewritten commits and the supposedly "unmerged" commits are basically equivalent. (Mercurial, on the other hand, would've kept track of this information and would have no problem at all.)

 [1]: https://www.mercurial-scm.org/wiki/ChangesetEvolution

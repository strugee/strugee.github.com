---
title: "Shell script is one of the purest forms of human expression"
time:
  epoch: 1514444900
  utcoffset: "UTC-7"
author: "AJ Jordan"
categories:
  - musings
  - blaggregator
---

While I was at the [Recurse Center][], I came up with an interesting theory, and today I thought I'd finally formally write about it on my blog. Here it is: shell script is one of the purest forms of human expression, at least as far as technology is concerned.

Why? Well, shell script is this weird mix of actual programming language things and macro expansions, and even the programming things tend to be... odd, to put it politely. As a trivial example, did you know that this:

    $ echo {1..10}

results in this output:

	1 2 3 4 5 6 7 8 9 10

Shell scripts[1] know how to expand number sequences; it's just built-in to them. Variables work with substitution too, and you can even build commands with them:

    PAGER=less
	$PAGER longfile.txt

The key thing to note here is that the second line is replacing `$PAGER` with the literal text `less`, and then running the resulting command line. The "variable access" is basically just an inline macro expansion, and the shell doesn't really handle it very intelligently. (This is also why you often need to quote variables when you access them - if they have whitespace in them, the shell will interpret the variable as more than one word.)

Or take the type system of the shell: it has none[2]. For example, what does `0` mean? It could represent any one of these things:

1. The number 0
2. The string "0"
3. A binary we're invoking (well, trying to invoke) called `0`
4. An argument to a binary
5. File descriptor 0 (stdin)
6. A file named `0`

All of these things combine to make the shell incredibly flexible and powerful - you can often express a _lot_ in shell script with very little characters by writing "macros" in the right way.

It's also what makes shell such a god-awful programming language.

Think about it - as programmers, much of what we do seeks to impose order on our systems. We lint our code and run it through style checkers. I personally like to turn up my linter settings to maximum. And we use the concept of types to help organize our code - sure, there's disagreement on how _much_ order types should impose, but we all pretty much agree that there should be _some_ concept of types and type safety. Hell, for the languages whose type systems are basically "wtf are types", we make tools to impose additional safety on top of that - take [TypeScript][] and [Flow][], for example. We also love to (hate to) write tests to ensure that our code fulfills some interface or behavior contract. (Even the idea of an interface seeks to organize and compartmentalize complexity in the system.)

Humans are inherently messy. We're scatterbrained and easily distracted, and our thoughts (or at least, my thoughts) tend to jump all over the place. Shell script is an amazing way to express your ideas because it lets you get directly to the goal so quickly, in a way that matches that messiness that defines us as a species. But since so much of our work as programmers is about trying to counteract our messiness, shell script is a _terrible_ way to write real programs, for the exact. Same. Reason.

Footnotes:

 \[1]: Those written in `bash`, at least.

 \[2]: Note that this is different from having a type system of "wtf are types?? [wat][]" - JavaScript is a good example of a language with such a type system, as is (to my understanding) PHP. The shell, on the other hand, has no type system _at all_.

 [Recurse Center]: https://www.recurse.com/
 [TypeScript]: http://www.typescriptlang.org/
 [Flow]: https://flow.org/
 [wat]: https://www.destroyallsoftware.com/talks/wat

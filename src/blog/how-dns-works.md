---
title: "How to evaluate domain registrars: a DNS story"
time:
  epoch: 1517457642
  utcoffset: "UTC-4"
author: "AJ Jordan"
categories:
  - explanations
  - blaggregator
---

> _Adriel_: Any recommendations of where I should buy domain names from?
>
> _Me_: I've heard gandi.net is good and they support free software projects and organizations - I'm on Namecheap at the moment but it's janky and sometimes unreliable, and basically the only reason I'm still with them is inertia
>
> _Adriel_: What makes the difference? Why does it matter where it comes from? I guess a better question is, what am I actually buying when I buy a domain?
>
> _Narrator_: DNS is fraught with peril and complexity, and many hours would go by before Adriel got his answer...

This is a cleaned-up version of an explanation of how the DNS works and what owning a domain name really means. The original was much worse, because I typed it on my phone into a WhatsApp group chat and didn't edit at all. But you, dear reader, get the new-and-improved version! I'll start with [Adriel](https://github.com/aarsenault)'s original question - why does it matter where my domain name comes from - and then transition into talking about how the DNS works and how the domain registar plays into that picture.

Here is, in my _highly_-opinionated opinion, the golden rule of registrar shopping - the #1 thing you have to know: _all registrars are sketchy. Therefore you are looking for the least terrible option._

Once you understand this, you're looking at four things registrars have to provide:

1. DNS services
2. Whois data
3. The web UI for managing everything
4. Support

These are the most important, but depending on your usecase you might also want to examine value-add services registrars provide. Most registrars will also host your email and provide shared hosting, or sometimes a virtual private server, or VPS. A VPS is a box where you get root and can do whatever you want, including hosting a web server (but you have to do it yourself); shared hosting is where you get a managed web server installation that's shared (get it?) with other people. You get write access to a particular 
directory on the box that the web server is configured to serve from. (Registrars often also provide TLS/HTTPS certificates, but now that [Let's Encrypt](https://letsencrypt.org/) exists, why you'd pay for one unless you need an [EV cert](https://en.wikipedia.org/wiki/Extended_Validation_Certificate) is beyond me.)

The third and fourth responsibilities are pretty easy to understand. Is the web UI butt-ugly or buggy, and is the support staff friendly and responsive. So I want to focus on the first responsibility, DNS, because that can be super confusing (I don't really understand the second, Whois, and anyway this post is long enough already). Here's the tl;dr: the registrar provides the servers that are responsible for answering DNS queries. Even if you use a third-party provider your registrar is involved, because they have to serve `NS` records that basically say "hey look over at this other provider for the REAL records."

Let's break down exactly what that means. Before I start I should note that if you've ever heard people say something along the lines of, "it'll take up to 24 hours for DNS to propogate," you should forget that. It's a convenient lie that people (including myself sometimes!) use to explain DNS' caching behavior more easily.

DNS works by recursively resolving each component in a domain name. It's probably easiest to demonstrate how this works by walking through the steps clients like browsers take when they're trying to resolve a domain name into a numeric IP address. So say we're trying to resolve `example.com`, with no help from anybody else.

Our first step is to look up the authoritative nameservers for the `com` component. In other words, we're looking up the servers that have the absolute final word as to what DNS records `com` has. (More on exactly how this first step works later.) Once we've found the `com` nameservers, we issue a DNS query asking them where we can find the nameservers for `example.com`. The answer we get back will point to `example.com`'s registrar. Always. Even if they're using a different DNS service - the registar just points to the other service with `NS` records.

Let's pause in our journey to resolve `example.com` for a second to consider the implications of this. This means that the registrar is **always** involved in DNS lookups for a domain, which is important for two reasons:

1. If the registrar's DNS goes down so does your website
2. If you want to use DNSSEC on your domain (which of course I have Opinions™ on but whatever) your registrar has to support it, because the way DNSSEC works is that EVERY link in the lookup chain MUST be signed, or the entire chain of trust falls apart[1]

Just things to bear in mind.

Anyway, we're almost done resolving `example.com`. We've found its nameserver, so all we have to do is issue our original query. Maybe we need an IPv4 address, in which case we'd ask the nameserver for all `A` records for `example.com`; maybe we want IPv6 addresses instead in which case we'd ask for `AAAA` records. (If you want to know more about DNS record types, [Wikipedia has a nice list](https://en.wikipedia.org/wiki/List_of_DNS_record_types)!) If the registrar is the authoritative nameserver for `example.com` it'll respond normally, if `example.com` uses a 3rd-party DNS host, the registrar will respond with `NS` records. In the former case, we've gotten the data we originally set out to get; in the latter, we simply issue our query again to the nameserver the registrar pointed us at - which we now know to be authoritative - and if all goes well, we'll get a regular response and be done. As a reminder, the "authoritative nameserver" for a given domain is whatever nameserver contains the authoritative data **for that domain**. So we say e.g. "such-and-such a registrar's nameservers are _authoritative for_ `example.com`." For `example.net` the authoritative nameservers could be completely different.

The overarching goal of the recursive resolution procedure I just laid out is simply to find that veeery last nameserver in the chain which can speak authoritatively for the domain we're interested in. Your registar's job, as far as DNS is concerned, is to put the domain in the nameservers for the top-level domain (or TLD - `com` in `example.com`'s case) and to either serve regular DNS records or point recursive DNS resolvers at the authoritative nameserver that will. There's also some other paperwork involved I think, but I wouldn't know much about that.

As an aside, I should note that normally, your computer doesn't do all this recursive stuff. There will be some DNS server upstream - perhaps running on your router or run by your ISP - that does it for you. This is to alleviate your computer from having to know how to do this and also because it makes stuff like caching work better. Speaking of caching, let's talk about the _real_ explanation behind the admittedly super-convenient "24 hour propogation" lie. Now that we know how DNS resolution works the idea of "DNS propogation" is pretty simple to understand - it comes from caching. All that recursion stuff is expensive in terms of time (and nameserver load), so we want to avoid doing it whenever possible by generating responses from a local cache. This is accomplished by a Time To Live (TTL) associated with every DNS record response. The TTL basically says how long the record is valid for, and therefore how long it can be cached. When you change your DNS records and wait for it to "propogate", really you're just waiting for caches to expire. That means, though, that if you plan ahead you can lower your TTL to a few seconds, wait until everybody's cache expires (so everyone sees the new TTL), and then make your change[2]. This would lower downtime to a minimum. To be polite you'd then raise your TTL again. If you want to know more about this, [here](https://serverfault.com/a/125378/167999) is an excellent Server Fault question that rehashes this explanation and then describes an exponential backoff strategy you might use to make such a change as efficiently as possible.

And with that, we've covered most of what you need to know about how DNS works, except for one thing - that mysterious first step. How did we get the nameservers for `com`?

The answer is the [DNS root](https://en.wikipedia.org/wiki/Root_name_server). The DNS root servers are at the absolute top of the DNS hierarchy, and they're responsible for resolving TLDs. In fact, if I was to nitpick, I'd point out that I lied earlier when I said we were trying to resolve `example.com`. In reality, we're trying to resolve `example.com.` (note the trailing `.`). If we read this new domain name, which is now _fully qualified_, from right-to-left, we get the chain we used to lookup the final authoritative nameserver. It goes: empty string, indicating the root "zone" (to use DNS parlance) -> `com` -> `example`. DNS is technically distributed but organizationally highly centralized around the DNS root, and trust in the DNS root, and people who don't like that tend to run alternative DNS roots (your friendly author is sympathetic to this position). But that's a story for another time.

Hopefully you now have a much better idea of how the DNS works and why your registrar has to be involved in it. I'm 95% sure this post is accurate, but I could always be wrong so if you spot a mistake, please feel free to contact me either by [the usual ways](/contact) or by Zulip if you're a Recurser. Good luck!

Footnotes:

 \[1]: FWIW this is how Namecheap screwed up my domain - I turned on their DNSSEC option, but they had messed up their signing so that suddenly any resolver which validated DNSSEC would reject the legitimate responses as invalid. This was made extremely difficult to debug by the fact that you don't really know if a resolver is doing this for you, and often if DNSSEC validation fails that failure won't be passed directly on to the client (the client instead will get `NXDOMAIN` or something, which is basically the DNS way of saying "there's nothing there"). So resolution would fail on half the networks I tested from, with no clear difference. To make matters worse, when I went to turn of Namecheap's DNSSEC support because my website was down for a basically semi-random sampling of my visitors, the change didn't actually propogate to production! Like, I flipped the switch in the admin panel and it literally did _nothing_. So I had to escalate a support ticket to get them to purge all the DNSSEC stuff from production. Kinda ridiculous!

 \[2]: do note, however, that [people sometimes don't follow the standard](https://serverfault.com/a/740637/167999) and set a lower bound (i.e. minimum) on TTLs. So if you make a change make sure stuff running on your old IP address won't wreak havoc if it gets production traffic.


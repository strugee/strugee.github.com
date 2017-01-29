# Post information

This post was published as "New programming language part I: Handlers" on "1485446360 UTC-5" by "Alex Jordan", and was categorized as "personal,blaggregator".

# Post text

So my latest project at the [Recurse Center][] is a new programming language, as yet unnamed. Basically this was inspired by my [security design][] presentation in which I laid out a couple ways you can improve programs' security designs, like process separation. And it occurred to me: why is this so difficult? Something should be doing this for me. Enter... whatever the hell I end up calling my language.

One of the most important building blocks of the language is something that I'm currently calling a "Handler". A Handler is basically a segregated piece of application code that handles some task or problem domain. For example, a Handler for outgoing DNS requests (syntax subject to change, obviously):

	Handler DNS {
		function getAddressFromHostname(hostname) {
			// Very much pseudocode - all function calls here are example OS calls

			sendDnsQuery(hostname);
			while (!haveDnsResult()) {
				sleep(1);
			}
			
			return getDnsResult();
		}
	}

This Handler has one simple method, `getAddressFromHostname()`. It sends a DNS query, blocks until it has a result, and then returns the result.

What's cool about this Handler is that it will be run in its own process - in other words, each Handler is automatically transformed into a privilege-separated process. However, `getAddressFromHostname()` can still be called from other, high-level Handlers! The language will do all the data marshalling for you, so from a language perspective it looks like a regular function call even though in practice it's going cross-process.

Now, let's improve our Handler a little bit. It's pretty unfortunate that we can only make one DNS request at a time (since it's blocking), so let's use an event loop.

	Handler DNS is eventLoop {
		function getAddressFromHostname(hostname) {
			// Still pseudocode

			return sendDnsQuery(hostname, function(address) {
				return address;
			});
		}
	}

We specified that the `DNS` Handler is an event loop, so the language automatically set up a Node-style event loop - we never actually called anything to enter an event loop, it just sort of happened as a construct of the language. Note also the nice async-aware return syntax - the result of `sendDnsQuery()` is returned to `getAddressFromHostname()`'s caller, and the result of `sendDnsQuery()` is specified by the return value of the anonymous function callback.

We can improve correctness even more by specifying that the Handler is not allowed to make syncronous I/O calls at all:

	Handler DNS is eventLoop, async {
		// ...
	}

Handlers let you pick and choose different elements and design choices for different parts of your application. For example, if you had a Handler responsible for processing data, it might make sense to restrict it to being entirely functional:

	Handler incomingData is functional {
		// ...
	}

In such a Handler, any functions with side effects wouldn't be callable, enforced at compile-time (possibly parse-time, depending on whether I can make it compiled or not given the type system). Perhaps you want to spawn a new sandbox process for each piece of incoming data (OpenSSH does this, for example, when first receiving authentication data from untrusted users):

	// The `ephemeral` keyword will probably be something better, but for now...
	Handler incomingData is functional, ephemeral {
		// ...
	}

If your application requires root - for example, if you were writing an NTP daemon that needed to call `setTimeOfDay()` - that's also specified at the Handler level:

	Handler incomingData is root {
		// ...
	}

This should give you some idea of why Handlers are really interesting, even beyond the process separation concept that underlies them. (It's also worth noting that while I've focused mostly on daemons, this can also be used to securely implement e.g. `file`.) I'm really excited to get these ideas out there so I'll stop for now, but pretty soon I'll write another blog post talking about the type system.

 [Recurse Center]: https://recurse.com
 [security design]: https://strugee.net/presentation-security-design

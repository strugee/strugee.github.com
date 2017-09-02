/*

© Copyright 2016 Alex Jordan

This file is part of strugee.net.

strugee.net is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

strugee.net is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with strugee.net.  If not, see <http://www.gnu.org/licenses/>.

*/

// Polyfills

if (!window.Promise) {
	require('es6-promise').polyfill(); // eslint-disable-line global-require
}
require('whatwg-fetch');

(function() {
	'use strict';

	function strip(html) {
		// https://stackoverflow.com/a/822486/1198896
		var div = document.createElement('div');
		div.innerHTML = html;
		return div.textContent || div.innerText || '';
	}

	// TODO this actually doesn't really handle the document load event
	// ...but we get away with it because in practice the fetch will always take longer

	fetch('https://webmention.io/api/mentions?target=' + window.location)
		.then(function(response) {
			return response.text();
		})
		.then(function(body) {
			var data = JSON.parse(body);
			var mentionsElement = document.getElementById('webmentions');

			if (data.links.length === 0) {
				// No replies, so we bail
				var noReplies = document.createElement('p');
				noReplies.appendChild(document.createTextNode('No replies - yet! Maybe you\'d like to be the first?'));
				mentionsElement.appendChild(noReplies);

				var webmentionDocs = document.createElement('p');
				var webmentionLink = document.createElement('a');
				webmentionDocs.appendChild(document.createTextNode('See '));
				webmentionLink.appendChild(document.createTextNode('webmention.net'));
				webmentionLink.href = 'https://webmention.net';
				webmentionDocs.appendChild(webmentionLink);
				webmentionDocs.appendChild(document.createTextNode(' for the docs.'));
				mentionsElement.appendChild(webmentionDocs);

				return;
			}

			data.links.forEach(function(link) {
				// TODO handle this, maybe?
				if (link.private) return;

				// TODO this probably doesn't handle all types? But I couldn't find sufficient documentation

				// TODO look at what "verified" actually means
				if (!link.verified) return;

				var p = document.createElement('p');

				// Avatar
				var avatarLink = document.createElement('a');
				avatarLink.setAttribute('href', link.data.author.url);
				var avatar = document.createElement('img');
				avatar.classList.add('webmention-avatar');
				avatar.setAttribute('src', link.data.author.photo);
				avatar.setAttribute('alt', link.data.author.name + '\'s avatar');
				avatarLink.appendChild(avatar);
				p.appendChild(avatarLink);

				p.appendChild(document.createTextNode(' '));

				// "Alyssa P. Hacker"...
				var author = document.createElement('a');
				author.setAttribute('href', link.data.author.url);
				author.appendChild(document.createTextNode(link.data.author.name));
				p.appendChild(author);

				switch (link.activity.type) {
				case 'link':
					// ..."replied with"...
					// TODO is 'link' always a reply?

					p.appendChild(document.createTextNode(' replied with '));

					// ..."check out this article! http://example.com"
					var source = document.createElement('a');
					source.setAttribute('href', link.data.url);
					source.appendChild(document.createTextNode(strip(link.data.content)));
					p.appendChild(source);
					break;
				case 'like':
					// ..."liked this"
					p.appendChild(document.createTextNode(' '));
					var likeSource = document.createElement('a');
					likeSource.appendChild(document.createTextNode('liked this'));
					likeSource.setAttribute('href', link.data.url);
					p.appendChild(likeSource);
					break;
				}

				mentionsElement.appendChild(p);
			});
		})
		.catch(function(err) {
			console.log('Encountered Webmention error:', err);
			document.getElementById('webmentions')
				.appendChild(document.createTextNode('Couldn\'t fetch Webmentions. Try refreshing?'));
		});
	// TODO add in some "Loading..." text or something
})();

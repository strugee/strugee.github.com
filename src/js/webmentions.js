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

	fetch('https://webmention.io/api/mentions?target=https://strugee.net/blog/2016/08/pump.io-1.0.0-is-now-available')// + window.location)
		.then(function(response) {
			return response.text();
		})
		.then(function(body) {
			var data = JSON.parse(body);
			console.dir(data);
			var mentionsElement = document.getElementById('webmentions');

			data.links.forEach(function(link) {
				var el = document.createElement('p');
				el.appendChild(document.createTextNode('WebMention'));

				//  mentionsElement.appendChild(el);
			});
		});
	// TODO handle errors
})();

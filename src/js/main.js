/*

© Copyright 2012-2017 AJ Jordan

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

require('whatwg-fetch');

(function() {
	'use strict';

	var nightmodeStylesheet, monospaceStylesheet, icon, monospaceIcon; // eslint-disable-line init-declarations
	var isNightMode = false;
	var isMonospace = false;

	// Wait for the DOM to be ready
	document.addEventListener('DOMContentLoaded', init, false);
	var oldListener = document.onreadystatechange;
	document.onreadystatechange = function() {
		if (document.readyState === 'interactive') {
			init();
			if (typeof oldListener === 'function') oldListener();
		}
	};

	function init() {
		// Sets up event handlers, initializes element variables, etc.
		nightmodeStylesheet = document.createElement('link');
		nightmodeStylesheet.id = 'nightmode-stylesheet';
		nightmodeStylesheet.rel = 'stylesheet';
		nightmodeStylesheet.type = 'text/css';
		nightmodeStylesheet.href = '/css/nightmode.css';

		monospaceStylesheet = document.createElement('link');
		monospaceStylesheet.id = 'monospace-stylesheet';
		monospaceStylesheet.rel = 'stylesheet';
		monospaceStylesheet.type = 'text/css';
		monospaceStylesheet.href = '/css/monospace.css';

		icon = document.getElementById('lightbulb-icon');
		monospaceIcon = document.getElementById('monospace-icon');

		icon.addEventListener('click', handleIconClick, false);
		monospaceIcon.addEventListener('click', handleMonospaceIconClick, false);

		// Abort if the browser can't do what we're looking for
		if (!Array.prototype.forEach || !document.querySelectorAll || !window.history.pushState || !window.DOMParser || !window.Promise) {
			console.warn('Either Array.prototype.forEach(), document.querySelectorAll(), DOMParser(), history.pushState(), or window.Promise support is missing from your browser! Night mode/monospace state will not persist. Please upgrade.'); // eslint-disable-line max-len
			return;
		}

		bindNavLinkHandlers(document.querySelectorAll('.navlink'));

		window.onpopstate = handlePopState;
	}

	function bindNavLinkHandlers(nodeList) {
		console.log('Binding event handlers to some navigation links.');
		var navLinks = [];

		for (var i = 0; i < nodeList.length; i++) {
			navLinks.push(nodeList[i]);
		}

		navLinks.forEach(function(el) {
			el.addEventListener('click', handleNavLinkClick, false);
		});
	}

	function handlePopState() {
		console.log('Handling a popState event.');
		replaceContentWithTarget(window.location.pathname);
	}

	function handleNavLinkClick(event) {
		/* eslint no-invalid-this: "off" */
		console.log('Handling navigation click.');

		if (typeof this !== 'object') {
			console.error('Something has gone seriously wrong, and `this` isn\'t an instance of Node. Letting the browser handle the link click.'); // eslint-disable-line max-len
			return;
		}

		event.preventDefault();

		var element = this.children[0];
		var target = element.attributes.href.value;

		replaceContentWithTarget(target);
	}

	function replaceContentWithTarget(target) {
		console.log('Requesting URL: ' + target);
		fetch(target)
			.then(function(response) {
				return response.text();
			})
			.then(function(body) {
				var parser = new DOMParser();
				var doc = parser.parseFromString(body, 'text/html');

				var nav = doc.getElementById('navbar');
				var content = doc.getElementById('content');
				var oldNav = document.getElementById('navbar');
				var oldContent = document.getElementById('content');

				bindNavLinkHandlers(nav.querySelectorAll('.navlink'));

				document.title = doc.title;
				oldNav.parentNode.replaceChild(nav, oldNav);
				oldContent.parentNode.replaceChild(content, oldContent);

				history.pushState({}, doc.title, target);
			});
	}

	function handleIconClick() {
		if (isNightMode) {
			dayMode();
		} else {
			nightMode();
		}
	}

	function handleMonospaceIconClick() {
		if (isMonospace) {
			proportional();
		} else {
			monospace();
		}
	}

	function nightMode() {
		document.head.appendChild(nightmodeStylesheet);
		isNightMode = true;
		console.log('welcome to night mode, you beautiful person!');
	}

	function dayMode() {
		document.head.removeChild(nightmodeStylesheet);
		isNightMode = false;
		console.log('let the sun shine upon all! welcome to day mode.');
	}

	function monospace() {
		// Night mode takes precedence, otherwise styles get suuuper screwey
		if (isNightMode) {
			document.head.insertBefore(monospaceStylesheet, nightmodeStylesheet);
		} else {
			document.head.appendChild(monospaceStylesheet);
		}
		isMonospace = true;
		console.log('oh, you retro, you.');
	}

	function proportional() {
		document.head.removeChild(monospaceStylesheet);
		isMonospace = false;
		console.log('hmm. returning to a vague sense of modernity. how quaint!');
	}
})();

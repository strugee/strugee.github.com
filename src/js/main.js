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

var Turbolinks = require('turbolinks');
Turbolinks.start();

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

/*

© Copyright 2012, 2013, 2014 Alex Jordan

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

(function() {

	'use strict';
	
	var nightmodeStylesheet, icon;
	var isNightMode = false;
	
	// Wait for the DOM to be ready
	document.addEventListener('DOMContentLoaded', init);
	document.onreadystatechange = function() {
		if (document.readyState === 'interactive') {
			init();
		}
	};
	
	function init() {
		// Sets up event handlers, initializes element variables, etc.
		nightmodeStylesheet = document.createElement('link');
		nightmodeStylesheet.id = 'nightmode-stylesheet';
		nightmodeStylesheet.rel = 'stylesheet';
		nightmodeStylesheet.type = 'text/css';
		nightmodeStylesheet.href = '/css/nightmode.css';
		
		icon = document.getElementById('lightbulb-icon');
		
		icon.addEventListener('click', handleIconClick);
	}
	
	function handleIconClick() {
		if (isNightMode) {
			dayMode();
		} else {
			nightMode();
		}
	}
	
	function nightMode() {
		document.head.appendChild(nightmodeStylesheet);
		isNightMode = true;
		console.log("welcome to night mode, you beautiful person!");
	}
	
	function dayMode() {
		document.head.removeChild(nightmodeStylesheet);
		isNightMode = false;
		console.log("let the sun shine upon all! welcome to day mode.");
	}
})();

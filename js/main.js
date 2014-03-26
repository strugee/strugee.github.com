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

$(document).ready(function(){
	// Register an event handler for the lightbulb
	$('#lightbulb-icon').click(nightmode);
});

function nightmode() {
	$('head').append('<link id="nightmode-stylesheet" rel="stylesheet" type="text/css" href="css/nightmode.css" />');
	$('#lightbulb-icon').unbind('click').click(daymode);
	$('#lightbulb-icon').attr("href", "javascript:void(0);");
	$('#lightbulb-icon').attr("alt", "Lightbulb icon");
	console.log("welcome to night mode, you beautiful person!");
}
	
function daymode() {
	$('#nightmode-stylesheet').remove();
	$('#lightbulb-icon').unbind('click').click(nightmode);
	$('#lightbulb-icon').attr("href", "javascript:void(0);");
	$('#lightbulb-icon').attr("alt", "Lightbulb icon");
	console.log("let the sun shine upon all! welcome to day mode.");
}

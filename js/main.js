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

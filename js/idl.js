window._idl = {};
_idl.variant = "modal";
_idl.campaign = null;
(function() {
	var idl = document.createElement('script');
	idl.type = 'text/javascript';
	idl.async = true;
	idl.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'members.internetdefenseleague.org/include/?url=' + (_idl.url || '') + '&campaign=' + (_idl.campaign || '') + '&variant=' + (_idl.variant || 'banner');
	document.getElementsByTagName('body')[0].appendChild(idl);
})();
console.log("IDL initialized");

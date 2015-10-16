/*
	Mr21 - EventsManager.js - 1.4
	http://mr21.fr/JsExt/
*/

window._addEvent = Node.prototype._addEvent = function() {
	var ev = arguments.length - 1;
	var fn = arguments[ev];
	if (this.addEventListener)
		while (--ev >= 0) this.addEventListener(arguments[ev], fn, false);
	else
		while (--ev >= 0) this.attachEvent("on" + arguments[ev], fn);
};

window._delEvent = Node.prototype._delEvent = function() {
	var ev = arguments.length - 1;
	var fn = arguments[ev];
	if (this.removeEventListener)
		while (--ev >= 0) this.removeEventListener(arguments[ev], fn, false);
	else
		while (--ev >= 0) this.detachEvent("on" + arguments[ev], fn);
};

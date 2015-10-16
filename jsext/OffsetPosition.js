/*
	Mr21 - OffsetPosition.js - 1.1
	http://mr21.fr/JsExt/
*/

HTMLElement.prototype._position = function() {
	var el = this, x = el.offsetLeft, y = el.offsetTop;
	while (el = el.offsetParent)
		if (el.offsetTop !== undefined && el.clientTop !== undefined) {
			x += el.offsetLeft + el.clientLeft;
			y += el.offsetTop  + el.clientTop;
		}
	return {x:x, y:y};
}

var offsetMouse = new function() {
	this.xRel = 0;
	this.yRel = 0;
	this.x = 0;
	this.y = 0;
};

function setOffsetMouse(event) {
	offsetMouse.xRel = event.clientX + window.pageXOffset - offsetMouse.x;
	offsetMouse.yRel = event.clientY + window.pageYOffset - offsetMouse.y;
	offsetMouse.x    = event.clientX + window.pageXOffset;
	offsetMouse.y    = event.clientY + window.pageYOffset;
}

function offsetMouseOn()  { document._addEvent("mousemove", setOffsetMouse); }
function offsetMouseOff() { document._delEvent("mousemove", setOffsetMouse); }

offsetMouseOn();

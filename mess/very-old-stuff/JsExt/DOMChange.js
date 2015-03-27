/*
	Mr21 - DOMChange.js - 1.2
	http://mr21.fr/JsExt/
*/

Node.prototype._remove = function() {
	return this.parentNode.removeChild(this);
};

Node.prototype._clone = function(withChildren) {
	return this.cloneNode(withChildren || true);
};

Node.prototype._insertBefore = function(elem) {
	return this.parentNode.insertBefore(elem, this);
};

Node.prototype._insertAfter = function(elem) {
	return this.parentNode.insertBefore(elem, this.nextSibling);
};

Node.prototype._insertFirstChild = function(elem) {
	if (this.firstChild === null)
		return this.appendChild(elem);
	return this.insertBefore(elem, this.firstChild);
}

Node.prototype._insertLastChild = function(elem) {
	return this.appendChild(elem);
}

Node.prototype._movePrev = function() {
	var el = this._prev();
	return el ? el._insertBefore(this._remove()) : null;
};

Node.prototype._moveNext = function() {
	var el = this._next();
	return el ? el._insertAfter(this._remove()) : null;
};

Node.prototype._swapWith = function(elem) {
	var thisNext = this._next();
	if (thisNext === elem)
		this._moveNext();
	else if (this._prev() === elem)
		this._movePrev();
	else {
		var thisParent = thisNext ? null : this.parentNode;
		elem._insertBefore(this);
		if (thisNext)
			thisNext._insertBefore(elem);
		else
			thisParent.appendChild(elem);
	}
	return this;
};

Node.prototype._cleanDom = function() {
	for (var el = this.firstChild; el !== null; )
		if (el.nodeType === 1)
			el = el.nextSibling;
		else {
			var tmp = el;
			el = el.nextSibling;
			tmp._remove();
		}
	return this;
}

/*
	Mr21 - DOMNavigate.js - 1.3
	http://mr21.fr/JsExt/
*/

function DOMNavigate_sibling_loop(self, el, dir, n) {
	if (n !== 0) {
		if (n === undefined)
			n = 1;
		if (el && el.nodeType === 1)
			--n;
		for (; el && n !== 0; --n)
			while ((el = el[dir]) && el.nodeType !== 1);
	} else 
		return self;
	return el;
};

Node.prototype._parent = function(n) {
	return n < 0 ? document.getElementsByTagName("html")[0] :
		DOMNavigate_sibling_loop(this, this.parentNode, "parentNode", n);
};

Node.prototype._prev = function(n) {
	return n < 0 ? this.parentNode._firstChild() :
		DOMNavigate_sibling_loop(this, this.previousSibling, 'previousSibling', n);
};

Node.prototype._next = function(n) {
	return n < 0 ? this.parentNode._lastChild() :
		DOMNavigate_sibling_loop(this, this.nextSibling, 'nextSibling', n);
};

Node.prototype._firstChild = function(n) {
	return n < 0 ? this._lastChild() :
		DOMNavigate_sibling_loop(this, this.firstChild, "nextSibling", n);
};

Node.prototype._lastChild = function(n) {
	return n < 0 ? this._firstChild() :
		DOMNavigate_sibling_loop(this, this.lastChild, "previousSibling", n);
};

Node.prototype._children = function() {
	var arr = [], el = this.firstChild;
	for (; el; el = el.nextSibling)
		if (el.nodeType === 1)
			arr.push(el);
	return arr;
};

Node.prototype._parentN = function(n) {
	var arr = [], el = this.parentNode;
	for (; el && el.nodeType === 1 && n !== 0; el = el.parentNode, --n)
		arr.push(el);
	return arr;
};

Node.prototype._prevN = function(n) {
	var arr = [], el = this._prev();
	for (; el && n !== 0; el = el._prev(), --n)
		arr.push(el);
	return arr;
};

Node.prototype._nextN = function(n) {
	var arr = [], el = this._next();
	for (; el && n !== 0; el = el._next(), --n)
		arr.push(el);
	return arr;
};

Node.prototype._nextN = function(n) {
	var arr = [], el = this._next();
	for (; el && n !== 0; el = el._next(), --n)
		arr.push(el);
	return arr;
};

Node.prototype._find      = function() { return this.getElementsByTagName("*"); };
Node.prototype._parentAll = function() { return this._parentN(-1);              };
Node.prototype._prevAll   = function() { return this._prevN(-1);                };
Node.prototype._nextAll   = function() { return this._nextN(-1);                };

/*
	Mr21 - CSS.js - 5.4
	http://mr21.fr/JsExt/
*/

HTMLElement.prototype._css = function(css, val, cssUpper) {
	var currVal = this._css.getCSS(this, css);
	if (val === undefined)
		return currVal;
	cssUpper = cssUpper || this._css.setCSSUpper(css);
	var sign = val[0] === '+' ? +1 : val[0] === '-' ? -1 : 0;
	if (sign === 0 || val[1] !== '=')
		return this._css.setCSS(this, cssUpper, val);
	var aUnit = this._css.getUnit(currVal);
	var bUnit = this._css.getUnit(val) || aUnit;
	var aVal = css.indexOf("scroll") > -1
		? currVal
		: this._css.convUnit(this, css, parseFloat(currVal), aUnit, bUnit);
	return this._css.setCSS(this, cssUpper, (aVal + parseFloat(val.substr(2)) * sign) + bUnit);
};

HTMLElement.prototype._css.getCSS = function(elem, css) {
	function get(css) {
		return elem.currentStyle !== undefined
			? elem.currentStyle[css]
			: document.defaultView.getComputedStyle(elem, null).getPropertyValue(css);
	}
	var val = get(css);
	if (!val)
		switch (css) {
			case "scroll-left"   : return elem.scrollLeft;
			case "scroll-top"    : return elem.scrollTop;
			case "margin"        :
			case "padding"       : return get(css + "-top") + " " + get(css + "-right") + " " + get(css + "-bottom") + " " + get(css + "-left");
			case "outline"       : return get("outline-color") + " " + get("outline-style") + " " + get("outline-width");
			case "border"        : return get("border-top-width") + " " + get("border-top-style") + " " + get("border-top-color");
			case "font"          : return get("font-weight") + " " + get("font-size") + " " + get("font-family");
			case "border-width"  : return get("border-top-width") + " " + get("border-right-width") + " " + get("border-bottom-width") + " " + get("border-left-width");
			case "outline-width" : return get("outline-top-width") + " " + get("outline-right-width") + " " + get("outline-bottom-width") + " " + get("outline-left-width");
		}
	return val;
};

HTMLElement.prototype._css.setCSSUpper = function(css) {
	if (css.indexOf('-') < 0)
		return css;
	var str = "";
	for (var i = 0; i < css.length; ++i)
		str += css[i] !== '-' ? css[i] : css[++i].toUpperCase();
	return str;
};

HTMLElement.prototype._css.setCSS = function(elem, cssUpper, val) {
	switch (cssUpper) {
		case "scrollLeft" : elem.scrollLeft      = parseInt(val);                      break; // Not CSS
		case "scrollTop"  : elem.scrollTop       = parseInt(val);                      break; // Not CSS
		case "float"      : elem.style.cssFloat  = val;                                break; // Firefox
		case "opacity"    : elem.style.filter    = "alpha(opacity=" + val * 100 + ")";        // IE
		                    elem.style.opacity   = val;                                break;
		default           : elem.style[cssUpper] = val;
	}
	return val;
};

HTMLElement.prototype._css.getUnit = function(val) {
	if (typeof val === "string")
		switch (val[val.length - 1]) {
			case 'x' : return "px";
			case '%' : return  "%";
			case 'm' : return "em";
			case 't' : return "pt";
		}
	return "";
};

HTMLElement.prototype._css.convUnit = function(elem, css, val, aUnit, bUnit) {
	function parVal() {
		return css === "width" || css.indexOf("left") > -1 || css.indexOf("right") > -1
			? elem.parentNode.offsetWidth
			: elem.parentNode.offsetHeight;
	}
	if (aUnit !== bUnit) {
		switch (aUnit) {
			case "em" : val *= 16;             break;
			case "pt" : val *= 1.333;          break;
			case  "%" : val *= parVal() / 100; break;
		}
		switch (bUnit) {
			case "em" : val /= 16;                  break;
			case "pt" : val /= 1.333;               break;
			case  "%" : val = val / parVal() * 100; break;
		}
	}
	return val;
};

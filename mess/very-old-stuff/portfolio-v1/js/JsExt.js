/* timer entre chaque frames (millisecondes) */
var TIMER       = 25;

/* 4 differents mouvements */
var LINEAR      =  0;
var EASE_IN     =  1;
var EASE_OUT    =  2;
var EASE_IN_OUT =  3;

/* scroll */
var scrollX_intervalID = 0;
var scrollY_intervalID = 0;
var scrollX_isScrolling = false;
var scrollY_isScrolling = false;
JsExt_AddEvent(document, "scroll", JsExt_ScrollStop);

/* les coordonnees de la souris a tout moment */
var JsExt_Mouse = new function (){this.x = this.y = this.xrel = this.yrel = 0};
JsExt_AddEvent(document, "mousemove", JsExt_MouseMove);

function log(m){console.log(m)}

var scrollIgnore = false;
function JsExt_ScrollStop()
{
	if (scrollIgnore === false)
	{
		JsExt_ScrollXStop(false);
		JsExt_ScrollYStop(false);
	}
	scrollIgnore = false;
}

function JsExt_ScrollXStop(force)
{
	if (force === true)
	{
		window.clearInterval(scrollX_intervalID);
		scrollX_isScrolling = false;
	}
}

function JsExt_ScrollYStop(force)
{
	if (force === true)
	{
		window.clearInterval(scrollY_intervalID);
		scrollY_isScrolling = false;
	}
}

function JsExt_MouseMove(ev)
{
	JsExt_Mouse.xrel = ev.clientX + window.pageXOffset - JsExt_Mouse.x;
	JsExt_Mouse.yrel = ev.clientY + window.pageYOffset - JsExt_Mouse.y;
	JsExt_Mouse.x = ev.clientX + window.pageXOffset;
	JsExt_Mouse.y = ev.clientY + window.pageYOffset;
}

function JsExt_AddEvent(elm, ev, func)
{
    elm.addEventListener ? elm.addEventListener(ev, func, false) :
   		elm.attachEvent("on" + ev, func);
}

function JsExt_ScrollXTo(b, duration, mov)
{
	var a = window.pageXOffset;
	var d = new Date();
	var timeBegin = d.getTime();
	delete d;
	if (b < 0)
		b = 0;
	JsExt_ScrollXStop(true);
	scrollX_isScrolling = true;
	scrollX_intervalID = window.setInterval(function()
	{
		var d = new Date();
		var now = d.getTime();
		var progress = (now - timeBegin) / duration;
		var n = JsExt_Interp(a, b, progress, mov);
		delete d;
		if (now >= timeBegin + duration)
		{
			n = b;
			window.clearInterval(scrollX_intervalID);
			scrollX_isScrolling = false;
		}
		scrollIgnore = true;
		window.scrollTo(n, window.pageYOffset);
	}, TIMER);
}

function JsExt_ScrollYTo(b, duration, mov)
{
	var a = window.pageYOffset;
	var d = new Date();
	var timeBegin = d.getTime();
	delete d;
	if (b < 0)
		b = 0;
	JsExt_ScrollYStop(true);
	scrollY_isScrolling = true;
	scrollY_intervalID = window.setInterval(function()
	{
		var d = new Date();
		var now = d.getTime();
		var progress = (now - timeBegin) / duration;
		var n = JsExt_Interp(a, b, progress, mov);
		delete d;
		if (now >= timeBegin + duration)
		{
			n = b;
			window.clearInterval(scrollY_intervalID);
			scrollY_isScrolling = false;
		}
		scrollIgnore = true;
		window.scrollTo(window.pageXOffset, n);
	}, TIMER);
}

function JsExt_IsScrollingX(){return scrollX_isScrolling;}
function JsExt_IsScrollingY(){return scrollY_isScrolling;}

function JsExt_CssAnim_obj()
{
	this.arrAnim = new Array;
}
JsExt_CssAnim_obj.prototype =
{
	anim: function()
	{
		this.elm = 0;
		this.del = 0;
		this.dur = 250;
		this.mov = EASE_IN;
		for (var i = 0; i < arguments.length; ++i)
			this.launch(this, arguments[i]);
	},
	launch: function(_this, o)
	{
		if (o.elm === undefined)
			o.elm = this.elm;
		else
		{
			if (typeof o.elm === "string")
				o.elm = JsExt_Id(o.elm);
			this.elm = o.elm;
		}
		o.dur === undefined ? o.dur = this.dur : this.dur = o.dur;
		o.mov === undefined ? o.mov = this.mov : this.mov = o.mov;
		o.del === undefined ? o.del = this.del : this.del = o.del;
		o.running = false;
		o.timeoutId = window.setTimeout(function(){
			_this.animInit(_this, o);
			o.timeoutId = window.setInterval(function(){_this.loop(_this, o)}, TIMER);
		}, this.del);
		this.arrAnim.push(o);
	},
	stop: function(elm, css, callback, running)
	{
		if (typeof elm === "string")
			elm = JsExt_Id(elm);
		for (var i = 0; i < this.arrAnim.length;)
			if (this.arrAnim[i].elm === elm &&
				(!running || this.arrAnim[i].running === running) &&
				(!css || this.arrAnim[i].css === css))
			{
				window.clearTimeout(this.arrAnim[i].timeoutId);
				if (callback)
					this.arrAnim[i].callback();
				this.arrAnim.splice(i, 1);
			}
			else
				++i;
	},
	animInit: function(_this, o)
	{
		_this.stop(o.elm, o.css, false, true);
		o.running = true;
		o.timeoutId = 0;
		o.cssUpper = JsExt_PropertyCssStr(o.css);
		var d = new Date();
		o.msA = d.getTime();
		o.msB = o.msA + o.dur;
		delete d;
		var incr = o.val[0] === "+" ? 1 : o.val[0] === "-" ? -1 : 0;
		o.isNumValue = (o.val[0] >= "0" && o.val[0] <= "9") || incr;
		if (o.val[1] !== "=")
			incr = 0;
		if (o.isNumValue)
		{
			var currVal = JsExt_Css(o.elm, o.css);
			o.aUnit = JsExt_GetUnit(currVal);
			o.bUnit = JsExt_GetUnit(o.val);
			o.a = o.css.match("scroll") ? currVal :
				JsExt_ConvUnit(o.elm, o.css, parseFloat(currVal), o.aUnit, o.bUnit);
			o.b = incr === 0 ? parseFloat(o.val) :
				o.a + parseFloat(o.val.substr(2, 99)) * incr;
		}
	},
	loop: function(_this, o)
	{
		var progress = 0.0;
		var d = new Date();
		var ms = d.getTime();
		delete d;
		if (o.isNumValue)
		{
			progress = (ms - o.msA) / o.dur;
			var n = ms > o.msB ? o.b :
				JsExt_Interp(o.a, o.b, progress, o.mov);
			JsExt_Css(o.elm, o.cssUpper, n + o.bUnit);
		}
		if (ms >= o.msB)
		{
			if (!o.isNumValue)
				JsExt_Css(o.elm, o.cssUpper, o.val);
			this.stop(o.elm, o.css, o.callback, true);
			progress = 1.0;
		}
		if (o.callfront)
			o.callfront(progress);
	}
}

var JsExt_CssAnim = new JsExt_CssAnim_obj();

/* ########### Element.prototype ########### */

Element.prototype.showHeight = function(dur, mov, callback)
{
	var height, padTop, padBot, ovrfl;
	var left, pos = JsExt_Css(this, "position");
	if (pos !== "absolute")
		JsExt_Css(this, "position", "absolute");
	else
	{
		left = JsExt_Css(this, "left");
		JsExt_Css(this, "left", "-99999px");
	}
	JsExt_Css(this, "display", "block");
	ovrfl = JsExt_Css(this, "overflow");
	height = JsExt_Css(this, "height");
	padTop = JsExt_Css(this, "padding-top");
	padBot = JsExt_Css(this, "padding-bottom");
	JsExt_Css(this, "overflow", "hidden");
	JsExt_Css(this, "height",          0);
	JsExt_Css(this, "padding-top",     0);
	JsExt_Css(this, "padding-bottom",  0);
	if (pos !== "absolute")
		JsExt_Css(this, "position", pos);
	else
		JsExt_Css(this, "left", left);
	JsExt_CssAnim.anim
	(
		{elm:"menu_bottom", css:"height",         val:height, dur:dur, mov:mov, callback:callback },
		{                   css:"padding-top",    val:padTop                                      },
		{                   css:"padding-bottom", val:padBot,
			callback:(function(c_this, c_ovrfl){return function()
			{
				JsExt_Css(c_this, "overflow", c_ovrfl);
			}})(this, ovrfl)
		}
	);
}

Element.prototype.hideHeight = function(dur, mov, callback)
{
	var height, padTop, padBot, ovrfl;
	ovrfl = JsExt_Css(this, "overflow");
	height = JsExt_Css(this, "height");
	padTop = JsExt_Css(this, "padding-top");
	padBot = JsExt_Css(this, "padding-bottom");
	JsExt_Css(this, "overflow", "hidden");
	JsExt_CssAnim.anim
	(
		{elm:"menu_bottom", css:"height",         val:"0px", dur:dur, mov:mov, callback:callback },
		{                   css:"padding-top",    val:"0px"                                      },
		{                   css:"padding-bottom", val:"0px",
			callback:(function(c_this, c_height, c_padTop, c_padBot, c_ovrfl){return function()
			{
				JsExt_Css(c_this, "display",         "none");
				JsExt_Css(c_this, "height",          c_height);
				JsExt_Css(c_this, "padding-top",     c_padTop);
				JsExt_Css(c_this, "padding-bottom",  c_padBot);
				JsExt_Css(c_this, "overflow",        c_ovrfl);
			}})(this, height, padTop, padBot, ovrfl)
	  }
	);
}

/* ################################# */

function JsExt_Interp(a, b, n, mov)
{
	var x;
	if (this.log51 === undefined)
	{
		this.log51 = Math.log(1 * 50 + 1);
		this.exp6  = Math.exp(6) - 1;
		this.pi2   = Math.PI / 2;
	}
	switch (mov)
	{
		case EASE_IN:     x = Math.log(n * 50 + 1) / this.log51;          break;
		case EASE_OUT:    x = (Math.exp(n * 6) - 1) / this.exp6;          break;
		case EASE_IN_OUT: x = (Math.sin(n * Math.PI - this.pi2) + 1) / 2; break;
		default:          x = n;
	}
	x = a + (b - a) * x;
	if (x > -0.0001 && x < 0.0001) // Convertir la E-Notation
		x = 0;
	return x;
}

/*
** margin-left -> marginLeft
** border-radius -> borderRadius
*/
function JsExt_PropertyCssStr(css)
{
	var res = "", u;
	for (u = 0; u < css.length; ++u)
		res = css[u] !== '-' ? res.concat(css[u]) :
			res.concat(css[++u].toUpperCase());
	return res;
}

function JsExt_Css(el, css, val)
{
	if (typeof el === "string")
		el = JsExt_Id(el);
	if (val === undefined)
	{
		switch (css)
		{
			case "padding":      css = "padding-top";      break; /* bug firefox */
			case "border":       css = "border-top";       break; /* bug firefox */
			case "border-width": css = "border-top-width"; break; /* bug firefox */
			case "scroll-left":  return el.scrollLeft;
			case "scroll-top":   return el.scrollTop;
		}
		return !window.getComputedStyle ? el.currentStyle[css] :
			document.defaultView.getComputedStyle(el, null).getPropertyValue(css);
	}
	if (css.match("-"))
		css = JsExt_PropertyCssStr(css);
	if (css === "scrollLeft")
		el.scrollLeft = parseInt(val);
	else if (css === "scrollTop")
		el.scrollTop = parseInt(val);
	else
		el.style[css] = val;
	if (css === "opacity") /* bug ie */
		el.style.filter  = "alpha(opacity=" + val * 100 + ")";
}

function JsExt_Id(id, node)
{
	if (node === undefined)
		node = document;
	return node.getElementById(id);
}

function JsExt_Tag(tag, node)
{
	if (node === undefined)
		node = document;
	return node.getElementsByTagName(tag);
}

function JsExt_Class(class_name, tag, node)
{
	var tab = new Array;
	var pattern = new RegExp("\\b" + class_name + "\\b");
	var tab_search;

	if (node === undefined)
		node = document;
	if (tag === undefined)
		tag = "*";
	tab_search = node.getElementsByTagName(tag);
	for (var i = 0; i < tab_search.length; ++i)
		if (pattern.test(tab_search[i].className))
			tab.push(tab_search[i]);
	return tab;
}

function JsExt_HasClass(elm, classes)
{
	var arrNew = classes.split(" "), clss = " " + elm.className + " ";
	for (var i = 0; i < arrNew.length; ++i)
		if (clss.indexOf(" " + arrNew[i] + " ") === -1)
			return false;
	return true;
}

function JsExt_AddClass(elm, classes)
{
	var arrOld = elm.className.split(" "), arrNew = classes.split(" ");
	for (var i = 0; i < arrNew.length; ++i)
		if (arrOld.indexOf(arrNew[i]) === -1)
		{
			if (elm.className.length !== 0)
				elm.className += " ";
			elm.className += arrNew[i];
		}
}

function JsExt_RemoveClass(elm, classes)
{
	var arrOld = elm.className.split(" "), arrDel = classes.split(" "), newClass = "";
	for (var i = 0; i < arrOld.length; ++i)
		if (arrDel.indexOf(arrOld[i]) === -1)
		{
			if (newClass.length !== 0)
				newClass += " ";
			newClass += arrOld[i];
		}
	elm.className = newClass;
}

function JsExt_IsChildOf(child, parent)
{
	for (; child !== document; child = child.parentNode)
		if (child === parent)
			return true;
	return false;
}

function JsExt_GetUnit(s)
{
	if (typeof s === "string")
	{
		if (s.match("px")) return "px";
		if (s.match("%"))  return "%";
		if (s.match("pt")) return "pt";
		if (s.match("em")) return "em";
	}
	return "";
}

function JsExt_ConvUnit(elm, css, val, aUnit, bUnit)
{
	var px;
	switch (aUnit)
	{
		case "px": px = val;         break;
		case "em": px = val * 16;    break;
		case "pt": px = val * 1.333; break;
		case "%":
				var parVal = JsExt_Css(elm.parentNode,
					css === "width" || css.match("left") || css.match("right") ?
					"width" : "height");
				px = parseFloat(parVal) / 100 * val;
			break;
	}
	switch (bUnit)
	{
		case "px": return px;
		case "em": return px / 16;
		case "pt": return px / 1.333;
		case "%":
				var parVal = JsExt_Css(elm.parentNode,
					css === "width" || css.match("left") || css.match("right") ?
					"width" : "height");
			return px / parseFloat(parVal) * 100;
	}
	return val;
}

function JsExt_GetPos(elm)
{
	if (typeof elm === "string")
		elm = JsExt_Id(elm);
	var x = elm.offsetLeft;
	var y = elm.offsetTop;
	while (elm = elm.parentNode)
		if (elm.offsetTop !== undefined && elm.clientTop !== undefined)
		{
			x += elm.offsetLeft + elm.clientLeft;
			y += elm.offsetTop  + elm.clientTop;
		}
	return {x:x, y:y};
}

/*
	Mr21 - CSSAnim.js - 2.3
	http://mr21.fr/JsExt/
*/

function _cssAnim_killAnimation(elm, css, status, keepWaiting) {
	function clear(anHist) {
		clearInterval(anHist.intervalId);
		if (status === true) {
			anHist.elm._css(anHist.css, anHist.val);
			if (anHist.clf)
				anHist.clf(anHist.elm, 1.0);
			if (anHist.clb)
				anHist.clb(anHist.elm);
		}
	}
	if (typeof css === "object") {
		for (var i = 0, anHist; anHist = css[i]; ++i)
			if (anHist.intervalId !== undefined)
				clear(anHist);
		if (status === true)
			css.length = 0;
	} else if (elm._cssAnimRunning) {
		for (var i = 0, j = 0, anHist; anHist = elm._cssAnimRunning[i]; ++i)
			if ((anHist.intervalId !== undefined)
			&&  (css === undefined || anHist.css === css)
			&&  (keepWaiting === false || anHist.waiting === false))
				clear(anHist);
			else
				elm._cssAnimRunning[j++] = anHist;
		elm._cssAnimRunning.length = j;
	}
}

Node.prototype._cssAnimPause = function(css) { _cssAnim_killAnimation(this, css, false, false); };
Node.prototype._cssAnimEnd   = function(css) { _cssAnim_killAnimation(this, css, true,  false); };

Node.prototype._cssAnim = function() {

	function pushAnimHistory(elm, animHistory, dur, del) {
		if (dur || del) {
			if (!elm._cssAnimRunning)
				elm._cssAnimRunning = [];
			elm._cssAnimRunning.push(animHistory);
		}
	}

	function launch(elem, animHist, css, val, dur, mov, del) {
		var currVal = elem._css(css);
		var cssUpper = elem._css.setCSSUpper(css);
		var valDir = val[0] === '+' ? +1 : val[0] === '-' ? -1 : 0;
		if (typeof val === "string" && valDir === 0 && (val[0] < '0' || val[0] > '9')) {
			elem._css(cssUpper, val);
			animHist.intervalId = undefined;
			return val;
		}
		if (val[1] !== '=')
			valDir = 0;
		var aVal, bVal, aUnit, bUnit;
		aUnit = elem._css.getUnit(currVal);
		bUnit = elem._css.getUnit(val);
		if (bUnit === "")
			bUnit = aUnit;
		aVal = css.indexOf("scroll") !== -1 ? currVal : elem._css.convUnit(elem, css, parseFloat(currVal), aUnit, bUnit);
		bVal = valDir === 0 ? parseFloat(val) : aVal + parseFloat(val.substr(2)) * valDir;
		animHist.val = bVal + bUnit;
		if (!dur) {
			var tmp = bVal + bUnit;
			elem._css(cssUpper, tmp);
			animHist.intervalId = undefined;
			return tmp;
		}
		var d = new Date();
		var aTime = d.getTime();
		var bTime = aTime + dur;
		mov = Math._interp[mov === undefined ? 'linear' : mov];
		animHist.intervalId = window.setInterval((function(elem, animHist) { return function() {
			var progress, n, d = new Date(), time = d.getTime();
			if (time < bTime) {
				progress = (time - aTime) / dur;
				n = mov(aVal, progress, bVal);
			} else {
				progress = 1.0;
				n = bVal;
			}
			elem._css(cssUpper, n + bUnit);
			if (animHist.clf)
				animHist.clf(elem, progress);
			if (time >= bTime) {
				if (animHist.clb)
					animHist.clb(elem);
				clearInterval(animHist.intervalId);
				animHist.intervalId = undefined;
			}
		};})(elem, animHist), 10);
	}

	function preLaunch(elm, css, val, dur, mov, del, clf, clb) {
		var animHist = {elm:elm, css:css, val:val, clf:clf, clb:clb, intervalId:0, waiting:false};
		if (!del) {
			_cssAnim_killAnimation(elm, css, false, true);
			pushAnimHistory(elm, animHist, dur, del);
			launch(elm, animHist, css, val, dur, mov, del);
		} else {
			animHist.waiting = true;
			animHist.intervalId = window.setTimeout((function(elm, animHist, css, val, dur, mov, del) { return function() {
				_cssAnim_killAnimation(elm, css, false, true);
				animHist.waiting = false;
				launch(elm, animHist, css, val, dur, mov, del);
			}})(elm, animHist, css, val, dur, mov, del), del);
			pushAnimHistory(elm, animHist, dur, del);
		}
		return animHist;
	}

	var objID_array = [];
	var elmArr = null, css = "", val = "", mov = "linear", dur = 0, del = 0, clf = null, clb = null;
	for (var a = 0, obj; obj = arguments[a]; ++a) {
		if (obj.elm === undefined)
			elmArr = elmArr || [this];
		else if (typeof obj.elm === "string")
			elmArr = this._domSelector(obj.elm);
		else
			elmArr = obj.elm.push === undefined ? [obj.elm] : obj.elm;
		css = obj.css === undefined ? css : obj.css;
		val = obj.val === undefined ? val : obj.val;
		dur = obj.dur === undefined ? dur : obj.dur;
		mov = obj.mov === undefined ? mov : obj.mov;
		del = obj.del === undefined ? del : obj.del;
		clf = obj.clf;
		clb = obj.clb;
		for (var i = 0, elm; elm = elmArr[i]; ++i)
			objID_array.push(preLaunch(
				elm,
				typeof css === "function" ? css(i, elm) : css,
				typeof val === "function" ? val(i, elm) : val,
				typeof dur === "function" ? dur(i, elm) : dur,
				typeof mov === "function" ? mov(i, elm) : mov,
				typeof del === "function" ? del(i, elm) : del,
				clf ? (function(i, fn) { return function(el, p) { fn(el, p, i); }; } )(i, clf) : null,
				clb ? (function(i, fn) { return function(el)    { fn(el,    i); }; } )(i, clb) : null
			));
	}
	return objID_array;
};

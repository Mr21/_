/*
	Mr21 - DOMSelector.js - 3.1
	http://mr21.fr/JsExt/
*/

Node.prototype._domSelector = function(selector) {

	function _elemDir(e, dir) {
		while ((e = e[dir]) && e.nodeType !== 1);
		return e;
	}

	function _epurStr(s) {
		var s2 = "", i, j, tmp;
		for (i = j = 0; i < s.length; ++i)
			if (s[i] !== ' ' || (j && s2[j - 1] !== ',' && i + 1 < s.length && s[i + 1] !== ' ' && s[i + 1] !== ',')) {
				tmp = s[i] === '>' || s[i] === '+' || (s[i] === '~' && s[i + 1] !== '=');
				if (tmp && i > 0 && s[i - 1] !== ' ')
					s2 += ' ', ++j;
				s2 += s[i];
				if (tmp && s[i + 1] !== ' ' && s[i + 1] !== ',' && i + 1 < s.length)
					s2 += ' ', ++j;
				++j;
			}
		return s2;
	}
	
	function _indexOf(arr, elem) {
		if (arr.indexOf)
			return arr.indexOf(elem) === -1;
		for (var i = 0; i < arr.length; ++i)
			if (arr[i] === elem)
				return false;
		return true;
	}

	function _idFilter(elems, word) {
		for (var i = 0, inBracket = false; i < word.length; ++i)
			switch (word[i]) {
				case '[' : inBracket = true;  break;
				case ']' : inBracket = false; break;
				case '#' :
					if (inBracket === false) {
						for (var j = ++i; j < word.length && /^[.#\[:]$/.test(word[j]) === false; ++j);
						word = word.substr(i, j - i);
						for (var i = 0; i < elems.length; ++i)
							if (elems[i].id === word) {
								elems[0] = elems[i];
								elems.length = 1;
								return;
							}
						elems.length = 0;
					}
			}
	}

	function _classFilter(elems, word) {
		var arrClass = null;
		for (var i = 0, inBracket = false; i < word.length; ++i)
			switch (word[i]) {
				case '[' : inBracket = true;  break;
				case ']' : inBracket = false; break;
				case '.' :
					if (inBracket === false) {
						for (var j = ++i; j < word.length && /^[.#\[:]$/.test(word[j]) === false; ++j);
						if (arrClass === null)
							arrClass = [];
						arrClass.push(word.substr(i, j - i));
					}
			}
		if (arrClass !== null) {
			for (var i = 0, j = 0, c; i < elems.length; ++i) {
				for (c = 0; c < arrClass.length && RegExp("(^| )" + arrClass[c] + "($| )").test(elems[i].className) === true; ++c);
				if (c === arrClass.length) {
					elems[j++] = elems[i];
				}
			}
			elems.length = j;
		}
	}

	function _attributesFilter(elems, word) {
		var filters = (function(word) {
			var filters = null, indBracket = -1;
			while ((indBracket = word.indexOf('[', indBracket + 1)) !== -1) {
				var egalType, f = {attr:null, val:null, egal:null};
				if (filters === null)
					filters = [];
				filters.push(f);
				for (i = indBracket + 1; i < word.length; ++i) {
					if ((egalType = "]=^$*~|".indexOf(word[i])) !== -1) {
						if (f.attr === null)
							f.attr = word.substr(indBracket + 1, i - indBracket - 1);
						if (egalType === 0)
							break;
						else if (egalType === 1) {
							var guill = word[i + 1] === '"' || word[i + 1] === "'";
							indBracket = word.indexOf(']', indBracket);
							f.val = word.substr(i + 1 + guill, indBracket - 1 - i - guill * 2);
						}
						if (f.egal === null)
							f.egal = "]=^$*~|"[egalType];
					}
				}
			}
			return filters;
		})(word);
		if (filters !== null) {
			var i, j;
			for (i = 0, j = 0; i < elems.length; ++i) {
				var pass = true;
				for (var f = 0; pass === true && f < filters.length; ++f) {
					var fl = filters[f], val, pat;
					pass = (val = elems[i].getAttribute(fl.attr)) !== null;
					if (pass === true && fl.egal !== null) {
						switch (fl.egal) {
							case '*' : pat = fl.val;                     break;
							case '^' : pat = '^' + fl.val;               break;
							case '$' : pat = fl.val + '$';               break;
							case '=' : pat = '^' + fl.val + '$';         break;
							case '|' : pat = '^' + fl.val + "($|-)";     break;
							case '~' : pat = "(^| )" + fl.val + "($| )"; break;
						}
						if (RegExp(pat).test(val) === false)
							pass = false;
					}
				}
				if (pass === true)
					elems[j++] = elems[i];
			}
			elems.length = j;
		}
	}

	function _pseudoClassFilter(elems, word) {		
		var firstChild  = false;
		var lastChild   = false;
		var firstOfType = false;
		var lastOfType  = false;
		var empty       = false;
		for (var i = 0, inBracket = false; i < word.length; ++i)
			switch (word[i]) {
				case '[' : inBracket = true;  break;
				case ']' : inBracket = false; break;
				case ':' :
					if (inBracket === false) {
						var wordCut = word.substr(i + 1);
						     if (/^first-child/.test(wordCut)   === true) { firstChild               = true; }
						else if (/^last-child/.test(wordCut)    === true) {               lastChild  = true; }
						else if (/^only-child/.test(wordCut)    === true) { firstChild  = lastChild  = true; }
						else if (/^first-of-type/.test(wordCut) === true) { firstOfType              = true; }
						else if (/^last-of-type/.test(wordCut)  === true) {               lastOfType = true; }
						else if (/^only-of-type/.test(wordCut)  === true) { firstOfType = lastOfType = true; }
						else if (/^empty/.test(wordCut)         === true) {                    empty = true; }
					}
			}
		function _tag(e, dir, tag) {
			for (e = e[dir]; e !== null; e = e[dir])
				if (e.tagName === tag)
					return true;
			return false;
		}
		function _isEmpty(e, dir) {
			for (e = e.firstChild; e !== null; e = e[dir])
				if (e.nodeType === 1 || e.nodeType === 3)
					return false;
			return true;
		}
		var w = 0;
		for (var i = 0, e; e = elems[i]; ++i)
			if ((firstChild  === false || _elemDir(e, "previousSibling") === null)
			&&  (lastChild   === false || _elemDir(e,     "nextSibling") === null)
			&&  (firstOfType === false || _tag(e, "previousSibling", elems[i].tagName) === false)
			&&  (lastOfType  === false || _tag(e,     "nextSibling", elems[i].tagName) === false)
			&&  (empty       === false || _isEmpty(e) === true))
				elems[w++] = elems[i];
		elems.length = w;
	}

	function _parentSelector(elBefore, parentType, elems) {
		function _prevUntil(e, brother) {
			for (e = e.previousSibling; e !== null; e = e.previousSibling)
				if (e === brother)
					return true;
			return false;
		}
		for (var i = 0, j = 0; i < elems.length; ++i)
			switch (parentType) {
				case '+' : if (_elemDir(elems[i], "previousSibling") === elBefore)  elems[j++] = elems[i]; break;
				case '~' : if (_prevUntil(elems[i],                      elBefore)) elems[j++] = elems[i]; break;
				case '>' : if (elems[i].parentNode                   === elBefore)  elems[j++] = elems[i]; break;
				case ' ' : ++j;
			}
		elems.length = j;
	}

	function _getElementsByTag(word, parent) {
		for (var i = 0; i < word.length; ++i)
			if (/^[.#\[:]$/.test(word[i]) === true) {
				word = i === 0 ? "*" : word.substr(0, i);
				break;
			}
		var arr = [], tmp = parent.getElementsByTagName(word);
		for (var i = 0; i < tmp.length; ++i)
			arr.push(tmp[i]);
		return arr;
	}

	function _getElements(elBefore, word, parentType) {
		var elems = _getElementsByTag(word, parentType === '+' || parentType === '~' ? elBefore.parentNode : elBefore);
		_parentSelector(elBefore, parentType, elems);
		_idFilter(elems, word);
		_classFilter(elems, word);
		_attributesFilter(elems, word);
		_pseudoClassFilter(elems, word);
		return elems;
	}

	function _group(context, str) {
		var words = str.split(' '), tabPar = [context], elems;
		for (var w = 0; w < words.length; ++w) {
			var tmp = ">+~".indexOf(words[w][0]);
			elems = [];
			for (var i = 0; i < tabPar.length; ++i)
				elems = elems.concat(tmp === -1
					? _getElements(tabPar[i], words[w + 0], ' ')
					: _getElements(tabPar[i], words[w + 1] === undefined ? "*" : words[w + 1], words[w][0]));
			if (tmp !== -1)
				++w;
			tabPar = elems;
		}
		return elems;
	}

	var elems = [], groups = _epurStr(selector).split(',');
	for (var i = 0; i < groups.length; ++i) {
		var tmp = _group(this, groups[i]);
		for (var j = 0; j < tmp.length; ++j)
			if (_indexOf(elems, tmp[j]))
				elems.push(tmp[j]);
	}
	if (groups.length > 1 && elems.length > 1 && typeof elems[0].compareDocumentPosition === "function")
		elems.sort(function(a, b){return a.compareDocumentPosition(b) & 2 ? 1 : -1});
	return elems;
};

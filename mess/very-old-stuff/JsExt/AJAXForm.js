/*
	Mr21 - AJAXForm.js - 1.0
	http://mr21.fr/JsExt/
*/

function AJAXForm_serialize(form, toObj) {
	var str = "", obj, el = form.getElementsByTagName("*");
	if (toObj)
		obj = [];
	function appStr(name, value) {
		if (str.length > 0)
			str += "&";
		str += encodeURIComponent(name) + "=" + encodeURIComponent(value).replace(/%20/g, '+');
	}
	function appObj(name, value) {
		var ind = name.indexOf("[]");
		if (ind === -1 || ind !== name.length - 2) {
			obj[name] = value;
			++obj.length;
		} else {
			var name_sub = name.substr(0, ind);
			if (obj[name_sub] === undefined) {
				obj[name_sub] = [];
				++obj.length;
			}
			obj[name_sub].push(value);
		}
	}
	for (var i = 0; i < el.length; ++i)
		switch (el[i].tagName) {
			case "TEXTAREA" : (toObj ? appObj : appStr)(el[i].name, el[i].value); break;
			case "INPUT" :
				if (/^(radio|checkbox)$/i.test(el[i].type)) {
					if (el[i].checked)
						(toObj ? appObj : appStr)(el[i].name, el[i].value);
				} else if (!/^(submit|button|reset|image|file)$/i.test(el[i].type))
					(toObj ? appObj : appStr)(el[i].name, el[i].value);
			break;
			case "SELECT" :
				if (!el[i].multiple)
					(toObj ? appObj : appStr)(el[i].name, el[i].value);
				else
					for (var o = 0; o < el[i].options.length; ++o)
						if (el[i].options[o].selected)
							(toObj ? appObj : appStr)(el[i].name, el[i].options[o].value);
		}
	return toObj ? obj : str;
};

HTMLFormElement.prototype._toString   = function() { return AJAXForm_serialize(this) };
HTMLFormElement.prototype._toArray    = function() { return AJAXForm_serialize(this, 1) };
HTMLFormElement.prototype._ajaxSubmit = function(callback, dataFormat) {
	window._ajax(this.method, this.action, AJAXForm_serialize(this), callback, dataFormat);
	return false;
};

/*
	Mr21 - AJAX.js - 1.2
	http://mr21.fr/JsExt/
*/

window._xhr = function() {
	if (this.XMLHttpRequest)
		return new XMLHttpRequest();
	if (this.ActiveXObject) {
		var names = [
			"Msxml2.XMLHTTP.6.0",
			"Msxml2.XMLHTTP.3.0",
			"Msxml2.XMLHTTP",
			"Microsoft.XMLHTTP"
		];
		for (var i in names)
			try { return new ActiveXObject(names[i]); }
			catch (e) {}
	}
	return null;
};

window._ajax = function(method, url, data, callback, dataFormat) {
	var xhr = this._xhr();
	if (callback)
		xhr.onreadystatechange = function() {
			if (this.readyState === 4 && (this.status >= 200 && this.status < 300 || this.status === 304))
				callback(dataFormat === "xml" ? this.responseXML : this.responseText);
		};
	method = method.toUpperCase();
	switch (method) {
		case "POST" : case "PUT" : case "DELETE" :
			xhr.open(method, url, true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send(data);
		break;
		default :
			if (data)
				url += "?&"[url.indexOf("?") > -1] + data;
			xhr.open(method, url, true);
			xhr.send(null);
	}
}

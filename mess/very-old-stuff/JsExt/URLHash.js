/*
	Mr21 - URLHash.js - 1.0
	http://mr21.fr/JsExt/
*/

function URLHash() {
	this.length;
	this.arr;
	this.getHash();
}
URLHash.prototype = {
	get: function(variable) {
		return this.arr[variable.toLowerCase()];
	},
	set: function(variable, value) {
		if (variable !== "") {
			variable = variable.toLowerCase();
			if (this.arr[variable] === undefined)
				++this.length;
			this.arr[variable] = value === undefined ? "" : value;
			this.setHash(this.arr);
		}
	},
	del: function(variable) {
		variable = variable.toLowerCase();
		if (this.arr[variable] !== undefined) {
			delete this.arr[variable];
			this.setHash(this.arr);
			--this.length;
		}
	},
	reset: function() {
		for (var key in this.arr)
			delete this.arr[key];
		this.length = 0;
		window.location.hash = "";
	},
	setHash: function() {
		var str = "";
		for (var key in this.arr) {
			if (str !== "")
				str += "&";
			str += key;
			if (this.arr[key] !== "")
				str += "=" + this.arr[key];
		}
		window.location.hash = str;
	},
	getHash: function() {
		var i = 0, ind, tmp = window.location.hash.substr(1).split("&");
		this.arr = new Object;
		if (tmp[0] !== "")
			for (; i < tmp.length; ++i)
				if ((ind = tmp[i].indexOf("=")) !== -1)
					this.arr[tmp[i].substring(0, ind).toLowerCase()] = tmp[i].substring(ind + 1);
				else
					this.arr[tmp[i].toLowerCase()] = "";
		this.length = i;
	}
};

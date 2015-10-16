/*
	Mr21 - ClassName.js - 1.0
	http://mr21.fr/JsExt/
*/

HTMLElement.prototype._hasClass = function(classes) {
	var arrNew = classes.split(" "),
	    classCurr = " " + this.className + " ";
	for (var i = 0; i < arrNew.length; ++i)
		if (arrNew[i].length && classCurr.indexOf(" " + arrNew[i] + " ") === -1)
			return false;
	return true;
}

HTMLElement.prototype._addClass = function(classes) {
	var arrOld = this.className.split(" "),
	    arrNew = classes.split(" ");
	for (var i = 0; i < arrNew.length; ++i)
		if (arrNew[i].length && arrOld.indexOf(arrNew[i]) === -1) {
			if (this.className.length !== 0)
				this.className += " ";
			this.className += arrNew[i];
		}
}

HTMLElement.prototype._delClass = function(classes) {
	var arrOld = this.className.split(" "),
	    arrDel = classes.split(" "),
	    newClass = "";
	for (var i = 0; i < arrOld.length; ++i)
		if (arrOld[i].length && arrDel.indexOf(arrOld[i]) === -1) {
			if (newClass.length !== 0)
				newClass += " ";
			newClass += arrOld[i];
		}
	this.className = newClass;
}

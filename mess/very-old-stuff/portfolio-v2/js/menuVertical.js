/*
	Mr21 - menuVertical - 2.2
	-- Dependencies with JsExt --
	* MathInterp
	* CSS
	* CSSAnim
	* ClassName
	* EventsManager
*/

function menuVertical(elem) {
	this.menu = elem;
	this.selectedLink = null;
	this.disableUnclick();
	this.callback(null);
	var links = elem.getElementsByTagName("a");
	for (var i = 0, ln; ln = links[i]; ++i) {
		ln.onclick = function() { return false; };
		ln._addEvent("mouseover", "focus", (function(self, ln) { return function() { self.linkOver(ln); }; })(this, ln));
		ln._addEvent("mouseout",  "blur",  (function(self, ln) { return function() { self.linkOut (ln); }; })(this, ln));
		ln._addEvent("click",              (function(self, ln) { return function() { self.select  (ln); }; })(this, ln));
	}
	if (links[0])
		this.borderLeftWidth = parseInt(links[0]._css("border-left-width"));
};

menuVertical.prototype = {
	linkOver: function(ln) {
		if (ln !== this.selectedLink)
			ln._cssAnim({css:"border-left-width", val:(this.borderLeftWidth + 5) + "px", dur:200, mov:"easeIn"});
	},
	linkOut: function(ln) {
		if (ln !== this.selectedLink)
			ln._cssAnim({css:"border-left-width", val:this.borderLeftWidth + "px", dur:200, mov:"easeIn"});
	},
	select: function(ln) {
		if (ln) {
			if (ln !== this.selectedLink) {
				this.unselect(true);
				this.selectedLink = ln;
				ln._addClass("selected");
				if (this.unclick === false)
					ln._addClass("noUnclick");
				ln._cssAnim({css:"border-left-width", val:(this.borderLeftWidth + 10) + "px", dur:100, mov:"easeIn"});
				if (this.fnClb)
					this.fnClb(ln);
			} else if (this.unclick === true) {
				this.unselect();
			}
		}
	},
	unselect: function(intern) {
		if (this.selectedLink !== null) {
			var ln = this.selectedLink;
			this.selectedLink = null;
			ln._delClass("selected noUnclick");
			this.linkOut(ln);
			if (intern !== true && this.fnClb)
				this.fnClb(null);
		}
	},
	callback: function(fn) {
		this.fnClb = fn;
	},
	enableUnclick: function() {
		this.unclick = true;
		if (this.selectedLink !== null)
			this.selectedLink._delClass("noUnclick");
	},
	disableUnclick: function() {
		this.unclick = false;
		if (this.selectedLink !== null)
			this.selectedLink._addClass("noUnclick");
	}
};

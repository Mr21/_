Mr21.Langs = {
	init: function() {
		var lang = Mr21.Hash.hash.get("lang") || "fr",
			languages = document.getElementById("languages"),
			div = languages.getElementsByTagName("div")[0],
			span = div.getElementsByTagName("span")[0],
			flags = languages.getElementsByTagName("a"),
			flagCurr, flagInit,
			divAnimId,
			i = 0, f;
		function mouseover() {
			span.textContent = this.getAttribute("href").substr(1);
			document._cssAnimPause(divAnimId);
			div._cssAnim(
				{css:"opacity", val:"1", dur:100},
				{css:"width", val:"70px", mov:"easeIn", dur:500}
			);
		}
		function mouseout() {
			divAnimId = div._cssAnim(
				{css:"opacity", val:"0", dur:500},
				{css:"width", val:"0px", del:500, dur:0}
			);
		}
		function click() {
			if (this.className === "") {
				Mr21.Hash.hash.set("lang", this.lang);
				document.body.lang = this.lang;
				if (flagCurr)
					flagCurr.className = "";
				this.className = "selected";
				flagCurr = this;
			}
			return false;
		}
		for (; f = flags[i]; ++i) {
			if (f.lang === lang)
				flagInit = f;
			f.onmouseover = mouseover;
			f.onmouseout = mouseout;
			f.onclick = click;
		}
		flagInit.onclick();
		flagInit.onmouseout();
	}
};

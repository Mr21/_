function lg(s) { return console.log(s), s; }

function global() {
	var domGlog = document.getElementById("global");
	domGlog._cssAnim({css:"opacity", val:"1", dur:250, clb:function(){ startPage.open() }});
	// hash
	var rub = Mr21.Hash.rub();
	var domLink = document._domSelector("div#nav > a." + rub)[0];
	if (domLink === undefined) {
		Mr21.Hash.rub(null);
	} else {
		domLink.onclick();
		Mr21.Hash.rub(rub);
	}
}

function startPage() {
	var self = startPage;
	var DIV_title = document._domSelector('#startPage .title')[0];
	var duration = 500;
	DIV_title._css('opacity', '0');
	self.open = function() {
		DIV_title._cssAnim(
			{css:'display', val:'block'},
			{css:'opacity', val:'1', dur:duration}
		);
	};
	self.close = function() {
		DIV_title._cssAnim(
			{css:'opacity', val:'0',    dur:duration},
			{css:'display', val:'none', del:duration}
		);
	};
}

function wind(status, left, right) {
	if (wind.domWin === undefined) {
		wind.dur = 500;
		wind.opened = false;
		wind.domWin = document.getElementById("window");
	}
	if (status === true) { // opening
		startPage.close();
		wind.opened = true;
		wind.domWin._css("left",  left  + "%");
		wind.domWin._css("right", right + "%");
		wind.domWin._cssAnimPause();
		wind.domWin._cssAnim(
			{css:"opacity", val:"1", del:nav.dur, dur:wind.dur / 2},
			{css:"top", val:"90%", mov:"easeIn"},
			{css:"left", val:"0%", dur:wind.dur},
			{css:"right"},
			{css:"top", del:nav.dur + wind.dur / 2, dur:wind.dur / 2, mov:"easeOut"}
		);
	} else if (status === false) { // closing
		wind.opened = false;
		wind.domWin._cssAnimPause();
		wind.domWin._cssAnim(
			{css:"left",  val:left  + "%", del:pages.dur, dur:wind.dur, mov:"easeIn"},
			{css:"right", val:right + "%"},
			{css:"top", val:"100%", mov:"easeOut"},
			{css:"opacity", val:"0", clb:function(){ startPage.open() }}
		);
	}
}

function pages(ind) {
	if (ind === undefined) {
		pages.dur = 300;
		pages.ind = -1;
		pages.domPg = wind.domWin._domSelector("> div");
		curriculum();
		skills();
		projects();
		keepInTouch();
		for (var i = 0, p; p = pages.domPg[i]; ++i) {
			if (p._init)
				p._init();
		}
	} else {
		if (pages.ind === ind) { // closing
			window.clearTimeout(this.pageOpeningTimeoutId);
			if (pages.domPg[ind]._exit)
				pages.domPg[ind]._exit();
			document._cssAnimPause(this.cssAnimId);
			document._cssAnimEnd(this.cssAnimIdSwitch);
			this.cssAnimId = pages.domPg[ind]._cssAnim(
				{css:"opacity", val:"0", dur:pages.dur, mov:"easeIn"},
				{css:"top",     val:"10%"},
				{               val:"0%", del:pages.dur},
				{css:"display", val:"none"}
			);
			pages.ind = -1;
		} else {
			var pageOpeningDelay;
			pages.domPg[ind]._css("opacity", "0");
			if (pages.ind === -1) { // opening
				pageOpeningDelay = nav.dur + wind.dur + pages.dur;
				document._cssAnimEnd(this.cssAnimId);
				document._cssAnimEnd(this.cssAnimIdSwitch);
				this.cssAnimId = pages.domPg[ind]._cssAnim(
					{css:"display", val:"block"},
					{css:"left",    val:"0%"},
					{css:"top",     val:"10%"},
					{               val:"0%", dur:pages.dur, mov:"easeIn", del:nav.dur + wind.dur},
					{css:"opacity", val:"1", mov:"linear"}
				);
			} else { // switch
				window.clearTimeout(this.pageOpeningTimeoutId);
				if (pages.domPg[pages.ind]._exit)
					pages.domPg[pages.ind]._exit();
				var val = ind < pages.ind ? -100 : +100;
				pageOpeningDelay = pages.dur;
				document._cssAnimEnd(this.cssAnimId);
				document._cssAnimPause(this.cssAnimIdSwitch);
				this.cssAnimIdSwitch = pages.domPg[ind]._cssAnim(
					{                            css:"display", val:"block"},
					{                            css:"left",    val:val + "%"},
					{                                           val:"0%", dur:pages.dur, mov:"easeIn"},
					{                            css:"opacity", val:"1"},
					{elm:pages.domPg[pages.ind],                val:"0"},
					{                            css:"left",    val:(-val / 8) + "%"},
					{                            css:"display", val:"none", del:pages.dur}
				);
			}
			if (pages.domPg[ind]._open)
				this.pageOpeningTimeoutId = window.setTimeout(function() { pages.domPg[ind]._open(); }, pageOpeningDelay);
			pages.ind = ind;
		}
	}
}

function nav() {
	function nav_openLink(link, ind) {
		var leftW   = ind * linkWidth + (ind + 1) * linkMargin;
		var rightW  = 100 - 10 - leftW;
		var leftWA  = leftW  + linkWidth / 2;
		var rightWA = rightW + linkWidth / 2;
		if (nav_openLink.linkCurr === link) { // close
			Mr21.Hash.rub(null);
			link._delClass('clicked');
			nav_openLink.linkCurr = null;
			wind(false, leftWA, rightWA);
			pages(ind);
			nav_openLink.divLinesCssAnimId = document._cssAnim(
				{elm:welcome,  css:"opacity", val:"1", dur:750, mov:"easeIn"},
				{              css:"right", val:"100%"},
				{elm:lines[0], val:leftWA  + "%", css:"width", mov:"linear", del:pages.dur + wind.dur, dur:nav.dur - 100},
				{elm:lines[1], val:rightWA + "%"}
			);
		} else { // open
			Mr21.Hash.rub(link.className);
			link._addClass('clicked');
			if (nav_openLink.linkCurr)
				nav_openLink.linkCurr._delClass('clicked');
			nav_openLink.linkCurr = link;
			document._cssAnimPause(nav_openLink.divLinesCssAnimId);
			document._cssAnim(
				{elm:lines[0], val:leftWA  + "%", dur:0,   css:"width"},
				{              val:leftW   + "%", dur:nav.dur},
				{elm:lines[1], val:rightWA + "%", dur:0},
				{              val:rightW  + "%", dur:nav.dur},
				{elm:welcome, css:"opacity", val:"0", dur:750},
				{             css:"right", val:"105%"}
			);
			pages(ind);
			if (wind.opened === false)
				wind(true, leftWA, rightWA);
		}
	}

	nav.dur = 300;
	var elem = document.getElementById("nav");
	var links = elem.getElementsByTagName("a");
	var linkWidth = 10; // pourcentage
	var linkMargin = (100 - (links.length * linkWidth)) / (links.length + 1); // pourcentage
	var lines = elem._domSelector("> div.line");
	var welcome = document.getElementById("welcomeMessage");
	welcome._css("margin-right", (-linkMargin + 3) + "%");
	elem._cleanDom();
	document._cssAnim({elm:lines, css:"width", val:"50%", dur:1000, mov:"easeIn"});
	for (var i = 0, ln; ln = links[i]; ++i) {
		ln._css("width", linkWidth + "%");
		ln._css("margin-left", linkMargin + "%");
		ln.onclick = (function(i) { return function() { return nav_openLink(this, i), false; };})(i);
	}
}

var Mr21 = {};

window.onload = function() {
	wind();
	startPage();
	pages();
	nav();
	global();
	Mr21.Langs.init();
};

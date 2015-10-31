(function() {

	var localhost =
		location.host === "localhost" ||
		location.protocol === "file:";

	if (location.protocol === "http:" && !localhost) {
		location = "https" + location.href.substr(4);
		return;
	}

	window.lg = function() { return console.log.apply(console, arguments), true; }

	function attachEvent(e, v, f) {
		if (e.attachEvent)
			e.attachEvent("on" + v, f);
		else
			e.addEventListener(v, f, false);
	}

	attachEvent(window, "load", function() {

		var
			body = document.body,
			head = document.head,
			header = document.getElementById("header"),
			ghOwner = location.host.substr(0, location.host.indexOf(".")),
			ghRepo = location.pathname,
			url = location.origin + location.pathname,
			urlAbout,
			ghRepoUrl
		;

		if (!head.querySelector("link[rel~='icon']")) {
			var ln = document.createElement("link");
			ln.rel = "icon";
			ln.type = "image/x-icon";
			ln.href = "/_/favicon.png";
			head.insertBefore(ln, head.firstChild);
		}

		ghRepo = ghRepo.substr(1, ghRepo.length - 2);
		ghRepoSplit = ghRepo.split("/");
		ghRepo = ghRepoSplit[ghRepoSplit.length - 1];
		urlAbout = "https://mr21.github.io/#/p="+ghRepo;
		ghRepoUrl = "https://github.com/"+ghOwner+"/"+ghRepoSplit[0];
		if (ghRepoSplit.length > 1) {
			ghRepoUrl += "/tree/gh-pages";
			for (var i = 1; i < ghRepoSplit.length; ++i)
				ghRepoUrl += "/"+ghRepoSplit[i];
		}

		if (!localhost) {
			var	fbRoot = document.createElement("div"),
				ga = document.createElement("script"),
				fb = document.createElement("script");
			fbRoot.id = "fb-root";
			ga.innerHTML = "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-418864-5', 'auto');ga('send', 'pageview');";
			fb.innerHTML = '(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src="//connect.facebook.net/fr_FR/all.js#xfbml=1";fjs.parentNode.insertBefore(js,fjs);}(document,"script","facebook-jssdk"));';
			body.insertBefore(ga, body.firstChild);
			body.insertBefore(fb, body.firstChild);
			body.insertBefore(fbRoot, body.firstChild);
		}

		header.innerHTML +=
			'<i class="fa fa-fw fa-caret-right"></i> '+
			'<a title="GitHub repository" class="fa fa-github" target="_blank" href="'+ghRepoUrl+'"></a> '+
			'<i class="fa fa-fw fa-caret-right"></i> '+
			'<span class="lang" title="About">'+
				'<a href="#" class="fa fa-info-circle" onclick="return false;"></a> '+
				'<span class="flags">'+
					'<a target="_blank" href="'+urlAbout+'&lang=en" title="English"><img src="https://mr21.github.io/_/flags/gb.gif"/></a> '+
					'<a target="_blank" href="'+urlAbout+'&lang=fr" title="Français"><img src="https://mr21.github.io/_/flags/fr.gif"/></a> '+
				'</span>'+
			'</span>'+
			'<i class="fa fa-fw fa-caret-right"></i> '+
			'<div class="fb-like"'+
				' data-href="'+url+'"'+
				' data-layout="button_count"'+
				' data-action="like"'+
				' data-show-faces="false"'+
				' data-share="true"'+
			'></div>'
		;

	});

})();

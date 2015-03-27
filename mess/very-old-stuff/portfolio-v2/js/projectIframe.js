function projectIframe(args) {
	var
		ghOwner = args.ghOwner,
		ghRepo = args.URL[1],
		ghRepoURL = 'https://github.com/'+ghOwner+'/'+ghRepo+'/',
		ghPageURL = 'https://'+ghOwner+'.github.io/'+ghRepo+'/',
		plug = args.plugin,
		HTMLpath = '',
		prevURL = location.origin + '/',
		title = args.folders[args.folders.length-1],
		CSS_links = '<link rel="stylesheet" type="text/css" href="/css/projectIframe.css"/>',
		CSS_colors,
		HTML_content;

	if (args.URL.length > 2) {
		ghRepoURL += 'tree/gh-pages/';
		for (var i = 2, f; f = args.URL[i]; ++i) {
			ghRepoURL += f+'/';
			ghPageURL += f+'/';
		}
	}
	for (var i = 0; i < args.URL.length; ++i) {
		if (i) {
			prevURL += args.URL[i] + '/';
			HTMLpath += '<span></span>';
		}
		HTMLpath += '<a href="'+prevURL+'">'+args.folders[i]+'</a>';
	}

	if (!plug) {
		CSS_colors = args.CSS_colors || 'dark';
		HTML_content = '<iframe src="'+ghPageURL+'"></iframe>';
	} else {
		var
			ghDemoURL = ghPageURL + (plug.ghDemo || ''),
			ghSrcURL = ghPageURL + (plug.ghSrc || ''),
			ghImageURL = ghPageURL + (plug.ghImage || 'thumbnail.jpg'),
			currentVersion = plug.versions[0].num,
			needs = '',
			versions = '';

		CSS_links += '<link rel="stylesheet" type="text/css" href="/fa/css/font-awesome.css"/>';
		CSS_colors = 'light';
		for (var i = 0, n; n = plug.needs[i]; ++i) {
			var path = /^http/.test(n.path)
				? n.path
				: ghSrcURL + (n.path || '');
			if (path[path.length-1] === '/')
				path += n.file;
			needs +=
				'<li>'+
					'<a target="_blank" href="'+path+'">'+n.file+'</a>'+
					(n.opt ? '<b> optional</b>' : '')+
					(n.desc ? '<span> '+n.desc+'</span>' : '')+
				'</li>';
		}
		for (var i = 0, v; v = plug.versions[i]; ++i)
			versions += '<li><b>'+v.num+'</b>'+v.desc+'</li>';

		HTML_content =
			'<div id="header">'+
				'<h1>'+
					'<span>'+title+'<b>'+currentVersion+'</b></span>'+
				'</h1>'+
				'<div class="menu">'+
					'<hr/>'+
					'<a href="#whatIsIt"   class="fa fa-info-circle" title="What is it ?"></a>'+
					'<a href="#demo"       class="fa fa-flask"       title="Demo"></a>'+
					'<a href="#needs"      class="fa fa-folder-open" title="Needs"></a>'+
					'<a href="#whatsNew"   class="fa fa-newspaper-o" title="What\'s new ?"></a>'+
					'<a href="#howToUseIt" class="fa fa-code"        title="How to use it ?"></a>'+
					'<hr/>'+
				'</div>'+
			'</div>'+
			'<div class="rub" id="what">'+
				'<h2><a href="#whatIsIt" name="whatIsIt"><i class="fa fa-info-circle"></i>What is it&nbsp;?</a></h2>'+
				'<p>'+
					'<img src="'+ghImageURL+'"/>'+
					plug.desc+
				'</p>'+
			'</div>'+
			'<div class="rub" id="demo">'+
				'<h2><a href="#demo" name="demo"><i class="fa fa-flask"></i>Demo</a></h2>'+
				'<p>'+(plug.demoDesc||'')+'</p>'+
				'<iframe src="'+ghDemoURL+'" style="height:'+plug.heightIframe+'px;"></iframe>'+
				'<div class="extract">'+
					'<a target="_blank" href="'+ghDemoURL+'">Extract this demo in a new tab</a>'+
				'</div>'+
			'</div>'+
			'<div class="rub" id="needs">'+
				'<h2><a href="#needs" name="needs"><i class="fa fa-folder-open"></i>Needs</a></h2>'+
				'<p>There needs <b>'+plug.needs.length+'</b> files&nbsp;:</p>'+
				'<ul>'+needs+'</ul>'+
			'</div>'+
			'<div class="rub" id="versions">'+
				'<h2><a href="#whatsNew" name="whatsNew"><i class="fa fa-newspaper-o"></i>What\'s new&nbsp;?</a></h2>'+
				'<ul>'+versions+'</ul>'+
			'</div>'+
			'<div class="rub" id="help">'+
				'<h2><a href="#howToUseIt" name="howToUseIt"><i class="fa fa-code"></i>How to use it&nbsp;?</a></h2>'+
				'<script src="https://gist.github.com/'+ghOwner+'/'+plug.gistId+'.js"></script>'+
			'</div>';
	}

	document.open();
	document.write(
		'<!DOCTYPE html>'+
		'<html>'+
		'<head>'+
		'<meta charset="UTF-8"/>'+
		'<title>'+title+'</title>'+
		CSS_links+
		'</head>'+
		'<body class="'+(plug?'plugin':'project')+'">'+
			'<div id="fb-root"></div>'+
			'<script type="text/javascript">(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src="//connect.facebook.net/fr_FR/all.js#xfbml=1";fjs.parentNode.insertBefore(js,fjs);}(document,"script","facebook-jssdk"));</script>'+
			'<script type="text/javascript">(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,"script","//www.google-analytics.com/analytics.js","ga");ga("create", "UA-418864-4", "mr21.fr");ga("send", "pageview");</script>'+
			'<div id="menu" class="'+CSS_colors+'">'+
				'<div class="content">'+
					'<span class="left">'+HTMLpath+'</span>'+
					'<span class="right">'+
						'<a target="_blank" class="github" href="'+ghRepoURL+'">GitHub</a>'+
						'<span></span>'+
						'<div class="fb-like"'+
							' data-href="'+prevURL+'"'+
							' data-colorscheme="'+CSS_colors+'"'+
							' data-layout="button_count"'+
							' data-action="like"'+
							' data-show-faces="false"'+
							' data-share="true"'+
						'></div>'+
					'</span>'+
				'</div>'+
			'</div>'+
			'<div id="content">'+HTML_content+'</div>'+
		'</body>'+
		'</html>'
	);

}

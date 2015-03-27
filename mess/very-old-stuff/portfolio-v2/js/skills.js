function skills() {
	var	jq_page = $('#skills'),
		jq_textContainer = jq_page.find('.textContainer'),
		jq_menuVertical = jq_page.find('.menuVertical'),
		jq_nothing = jq_page.find('.nothing'),
		jq_nothingRub = jq_nothing.find('> *'),
		jq_nothingRubCircles = jq_nothing.find('.circle'),
		el_page = jq_page[0],
		jq_pageCurr,
		objMenu,
		subCurr,
		start_intervalId,
		start_timeoutId,
		page_intervalId;

	function setData() {
		$.each(window.data.skills, function() {
			var	html = '';
			$.each(this.skills, function() {
				html +=
					'<div class="skill '+this.skill+'">'+
						'<div class="header">'+
							'<div class="icon"></div>'+
							'<div class="separator"></div>'+
							'<div class="metric" title="'+this.level+'%"><div style="left:'+this.level+'%;"></div></div>'+
							'<div class="separator"></div>'+
						'</div>'+
						'<p lang="en">'+this.en+'</p>'+
						'<p lang="fr">'+this.fr+'</p>'+
					'</div>';
			});
			jq_textContainer.children('.'+this.type).append(html);
		});
	}

	function nothingOpen() {
		var	i = 0;
		jq_nothing.addClass('show');
		function line() {
			if (i >= jq_nothingRub.length) {
				clearInterval(start_intervalId);
			} else {
				jq_nothingRub.eq(i).addClass('show');
				var jq_circle = jq_nothingRubCircles.eq(i);
				start_timeoutId = setTimeout(function() {
					jq_circle.addClass('show');
				}, 500);
				++i;
			}
		}
		line();
		start_intervalId = setInterval(line, 500);
	}

	function nothingClose() {
		clearInterval(start_intervalId);
		clearTimeout(start_timeoutId);
		jq_nothing.removeClass('show');
		jq_nothingRub.removeClass('show');
		jq_nothingRubCircles.removeClass('show');
	}

	function menuCallback(link) {
		if (jq_pageCurr) {
			jq_pageCurr.css('display', 'none');
			jq_pageCurr.css('opacity', '0');
		}
		if (link === null) {
			nothingOpen();
			jq_pageCurr = null;
			Mr21.Hash.sub(null);
		} else {
			var pageName = link.getAttribute('href').substr(1);
			jq_pageCurr = $('.page.' + pageName, el_page);
			Mr21.Hash.sub(pageName);
			nothingClose();
			document._cssAnimPause(page_intervalId);
			page_intervalId = jq_pageCurr[0]._cssAnim(
				{css:'display', val:'block'},
				{css:'opacity', val:'1', dur:250},
				{
					elm:'div.metric > *', dur:300, mov:'easeIn', css:'left',
					del:function(i) { return 200 + i * 75; },
					val:function(i, el) { el._css('left', '0%'); return el._parent().title; }
				},
				{
					elm:'> div', dur:500, mov:'linear', css:'opacity',
					val:function(i, el) { el._css('opacity', '0'); return 1; }
				}
			);
		}
	}

	el_page._open = function() {
		if (subCurr)
			Mr21.Hash.sub(subCurr);
		var domlink = $('a[href=#' + Mr21.Hash.hash.get('sub') + ']', el_page)[0];
		if (domlink && domlink.click !== undefined)
			domlink.click();
		else
			nothingOpen();
	};

	el_page._exit = function() {
		subCurr = Mr21.Hash.hash.get('sub');
		objMenu.unselect();
		Mr21.Hash.sub(null);
		nothingClose();
	};

	el_page._init = function() {
		setData();
		objMenu = new menuVertical(jq_menuVertical[0]);
		objMenu.enableUnclick();
		objMenu.callback(menuCallback);
		nothingClose();
	};
}

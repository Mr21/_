function curriculum() {
	var	jq_page = $('#curriculum'),
		el_page = jq_page[0],
		jq_events,
		intervalId;

	el_page._open = function() {
		var	i = jq_events.length;
		el_page.scrollTop = 99999;
		intervalId = setInterval(function() {
			if (--i >= 0)
				jq_events.eq(i).addClass('show');
			else
				clearInterval(intervalId);
		}, 100);
		jq_page.stop().animate({scrollTop: 0}, 1500);
	};

	el_page._exit = function() {
		clearInterval(intervalId);
		el_page.scrollTop = 99999;
		jq_events.removeClass('show');
	};

	el_page._init = function() {
		var html = '';
		$.each(window.data.timeline, function() {
			html +=
				'<div class="'+(this.year?'year':'event')+'" style="margin-top:'+this.marginTop+'px;">'+
					(this.year
						?	this.year
						:
							'<div class="circle"></div>'+
							'<div class="line"></div>'+
							'<p>'+
								'<span lang="en">'+this.en+'</span>'+
								'<span lang="fr">'+this.fr+'</span>'+
							'</p>'+
							(!this.img ? '' : '<img src="css/_.gif" alt="'+this.img+'"/>')
					)+
				'</div>';
		});
		jq_events = $('.timeline', el_page)
			.append(html)
			.find('.event');
		this._exit();
	};
}

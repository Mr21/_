function projects() {
	var	jq_page = $('#projects'),
		el_page = jq_page[0],
		jq_proj,
		intervalId;

	function getSides() {
		return Math.abs(offsetMouse.xRel) > Math.abs(offsetMouse.yRel)
			? (offsetMouse.xRel > 0 ? ['right', 'left'] : ['left', 'right'])
			: (offsetMouse.yRel > 0 ? ['bottom', 'top'] : ['top', 'bottom']);
	};

	el_page._open = function() {
		var	i = 0;
		intervalId = setInterval(function() {
			if (i < jq_proj.length)
				jq_proj.eq(i++).addClass('show');
			else
				clearInterval(intervalId);
		}, 150);
	};

	el_page._exit = function() {
		clearInterval(intervalId);
		jq_proj.removeClass('show');
	};

	el_page._init = function() {
		var html = '';
		$.each(window.data.projects, function() {
			html +=
				'<div class="project" style="background-image: url('+this.img+');">'+
					'<div style="background: '+this.bg+'; color: '+this.txt+';">'+
						'<div>'+
							'<h2>'+this.name+'</h2>'+
							'<i lang="en">'+this.en+'</i>'+
							'<i lang="fr">'+this.fr+'</i>'+
						'</div>'+
					'</div>'+
					'<a target="_blank" href="'+this.link+'"></a>'+
				'</div> ';
		});
		jq_proj =
			$('.padding', el_page)
				.append(html)
				.find('.project')
					.find('a')
						.each(function() {
							this._jq_div = $(this).prev();
						})
						.mouseover(function() {
							var	sides = getSides(),
								anim = {},
								css = {
									left:    'auto',
									right:   'auto',
									top:     'auto',
									bottom:  'auto',
									display: 'block'
								};
							css[sides[0]] = '100%';
							anim[sides[0]] = '0%';
							this._jq_div
								.finish()
								.css(css)
								.animate(anim, 350, 'linear');
						})
						.mouseout(function() {
							var	sides = getSides(),
								anim = {};
							anim[sides[1]] = '100%';
							this._jq_div
								.finish()
								.css(sides[0], 'auto')
								.css(sides[1], '0%')
								.animate(anim, 350, 'swing');
						})
					.end();
	};
}

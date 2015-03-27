function keepInTouch() {
	var	jq_page = $('#keepInTouch'),
		el_page = jq_page[0],
		jq_h2li,
		intervalId;

	el_page._open = function() {
		var	i = 0;
		intervalId = setInterval(function() {
			if (i < jq_h2li.length)
				jq_h2li.eq(i++).addClass('show');
			else
				clearInterval(intervalId);
		}, 150);
	};

	el_page._exit = function() {
		clearInterval(intervalId);
		jq_h2li.removeClass('show');
	};

	el_page._init = function() {
		jq_h2li = $('h2, li', el_page);
	};
}

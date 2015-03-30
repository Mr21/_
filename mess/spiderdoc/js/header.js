$(function() {

	var
		jq_header = $("#header"),
		jq_textSearch = $("form input[type='text']", jq_header),
		jq_linkSearch = $(".link-search", jq_header),
		jq_moreBtn = $(".more-btn", jq_header),
		jq_moreToHide = $(".more-toHide", jq_header),
		jq_moreToHideContainer = $(".more-toHide-container", jq_header),
		jq_window = $(window),
		isShowBtns = false
	;

	jq_linkSearch.click(function(e) {
		e.preventDefault();
		jq_header.addClass("show-search");
		jq_textSearch[0].focus();
	});

	jq_textSearch.blur(function() {
		jq_header.removeClass("show-search");
	});

	jq_moreBtn.click(function() {
		if (isShowBtns = !isShowBtns) {
			jq_moreToHide.appendTo(jq_moreToHideContainer);
			jq_header.addClass("show-btns");
		} else {
			jq_moreToHide.insertAfter(jq_moreBtn);
			jq_header.removeClass("show-btns");
		}
		return false;
	});

	jq_window.click(function(e) {
		if (isShowBtns && jq_moreToHide.index(e.target) === -1)
			jq_moreBtn.click();
	});

});

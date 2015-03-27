function lg(s) { return console.log(s), true; }

$(function() {

	var
		jq_header = $("#header"),
		jq_textSearch = $("form input[type='text']", jq_header),
		jq_linkSearch = $(".link-search", jq_header)
	;

	jq_linkSearch.click(function() {
		jq_header.addClass("show-search");
		jq_textSearch[0].focus();
		return false;
	});

	jq_textSearch.blur(function() {
		jq_header.removeClass("show-search");
	});

});

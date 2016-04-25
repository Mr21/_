"use strict";

(function() {

getCategories( function( data ) {
	var html = "";
	data.forEach( function( cat ) {
		html += "<a href='#" + cat + "'>" + cat + "</a>";
	});
	jqCategories.append( html );
	$( "header .categories a" ).eq( 0 ).addClass( "active" );
});

window.articlesList = {};

getPosts( function( data ) {
	data.sort( function( a, b ) {
		a = a.date;
		b = b.date;
		return +( a < b ? -1 : a > b );
	});
	data.forEach( function( post ) {
		var article = new Article( post );
		articlesList[ article.slug ] = article;
		article.jqArticle.prependTo( jqArticles );
	});
	lg(articlesList)
	jqWindow.trigger( "hashchange" );
});

jqBack.click( function() {
	if ( currentArticle ) {
		window.hashAdd( "a", "" );
	}
	return false;
});

})();

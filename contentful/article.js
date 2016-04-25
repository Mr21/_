"use strict";

function Article( data ) {
	
	this.slug = data.slug;
	this.date = data.date;

	// Create DOM:
	this.jqArticle = $( "<article>" );
	this.jqTitle = $( "<h2>" ).text( data.title ).appendTo( this.jqArticle );
	this.jqContent = $( "<div>" ).addClass( "content" ).appendTo( this.jqArticle );
	this.jqContent.html( markdown.toHTML( data.body ) );
	
	if ( data.image ) {
		$( "<img src='" + data.image + "'/>" ).prependTo( this.jqContent );
	}


	// Bind the events:
	var that = this;
	this.jqArticle.click( function() {
		if ( !that.isOpen ) {
			that.open();
			window.hashAdd( "a", that.slug );
		}
	});
}

Article.prototype = {
	open: function() {
		var that = this,
			headerHeight = jqHeader.height(),
			jqPrev = this.jqArticle,
			nbArtBefore = -1;

		do {
			++nbArtBefore;
			jqPrev = jqPrev.prev();
		} while ( jqPrev.length );

		// Save the old CSS:
		this.borderWidth = parseInt( this.jqArticle.css( "borderTopWidth" ) );
		this.marginTop = parseInt( this.jqArticle.css( "marginTop" ) );
		this.height = this.jqArticle.outerHeight();
		this.top = ( this.height + this.marginTop ) * nbArtBefore + this.marginTop + this.borderWidth;

		this.isOpen = true;
		jqBody.css( "overflow", "hidden" );
		this.jqArticle.addClass( "no-transition" ).css( "top", this.top );

		setTimeout( function() {
			window.currentArticle = that;
			jqCategories.css( "display", "none" );
			jqBack.css( "display", "inline" );
			that.jqArticle.removeClass( "no-transition" )
				.addClass( "open" )
				.css({
					position: "absolute",
					marginTop: headerHeight,
					top: jqWindow.scrollTop(),
					height: jqWindow.height() - headerHeight
				}).next().css( "marginTop", that.height + that.marginTop * 2 );
		}, 50 );
	},
	close: function() {
		var that = this,
			transitionDur = 1000 * parseFloat( this.jqArticle.css( "transitionDuration" ) );

		this.jqArticle.removeClass( "open" ).css({
			top: this.top,
			height: this.height
		});

		// Execution de ces lignes APRES la transition CSS:
		setTimeout( function() {
			that.isOpen = false;
			jqCategories.css( "display", "block" );
			jqBack.css( "display", "none" );
			jqBody.css( "overflow", "auto" );
			that.jqArticle.css({
				marginTop: that.marginTop,
				position: "static"
			}).next().css( "marginTop", that.marginTop );
		}, transitionDur );
	}
};

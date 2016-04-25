"use strict";

(function() {

var
	spaceId = "heuq6ttvedqb",
	apiKey_production = "07b7504d1162b3834abbd99377076508de17f27c988002b75450395fd8327561",
	contentType_author = "1kUEViTN4EmGiEaaeC6ouY",
	contentType_post = "2wKn6yEnZewu2SCCkus4as",
	contentType_category = "5KMiN6YPvi42icqAUQMCQe",
	tokenOAuth = "3819565725a170890b44e9ee9bbe07ea9a1a913fd1dc5676efb58a27a76cb442",

	client = contentful.createClient({
		space: spaceId,
		accessToken: apiKey_production
	})

	// wclient = contentful.createClient({
	// 	space: spaceId,
	// 	accessToken: tokenOAuth
	// })
;

function extract( items, attr ) {
	var arr = [];
	if ( items ) {
		items.forEach( function( item ) {
			arr.push( item.fields[ attr ] );
		});
	}
	return arr;
}

window.getPosts = function( fn ) {
	client.getEntries( { content_type: contentType_post } ).then( function( data ) {
		// lg( data.items );

		// Epuration de l'enorme objet retourné par contentful:
		var posts = [];
		data.items.forEach( function( item ) {
			var img = item.fields.featuredImage;
			posts.push({
				date: item.fields.date,
				title: item.fields.title,
				slug: item.fields.slug,
				body: item.fields.body,
				image: img && img.fields.file.url,
				authors: extract( item.fields.author, "name" ),
				categories: extract( item.fields.category, "title" )
			});
		});
		fn( posts );
	});
};

window.getCategories = function( fn ) {
	client.getEntries( { content_type: contentType_category } ).then( function( data ) {
		fn( extract( data.items, "title" ) );
	});
};

// getPosts( function( data ) {
// 	lg( data );
// });

})();

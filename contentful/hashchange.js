"use strict";

(function() {

var slug = null, cat = null;

function hashchange() {
	var hash = location.hash,
		newslug = /a=([^&]+)/.exec( hash ),
		newcat = /cat=([^&]+)/.exec( hash );

	newslug = newslug && newslug[ 1 ];
	newcat = newcat && newcat.split( "," );

	if ( newslug !== slug ) {
		articlesList[ slug ] && articlesList[ slug ].close();
		slug = newslug;
		articlesList[ slug ] && articlesList[ slug ].open();
	}
}

window.hashAdd = function( key, value ) {
	var hash = location.hash,
		keyval = key + "=" + value;

	if ( hash.length < 2 ) {
		location.hash = "#" + keyval;
	} else {
		var testreg = new RegExp( "[#&]" + key + "=" ),
			replacereg = new RegExp( "([#&])" + key + "=?[^&]*(.)?" );
		location.hash = testreg.test( hash )
			? hash.replace( replacereg, "$1" + keyval + "$2" )
			: hash + "&" + keyval;
	}
};

jqWindow.on( "hashchange", hashchange );

})();

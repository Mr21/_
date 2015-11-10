(function() {

var
	PI2 = Math.PI / 2,
	PI180 = Math.PI / 180,

	currentTime = Date.now() / 1000,
	previousTime = currentTime,
	elapsedTime = 0,
	defaultUp = { x: 0, y: -1 }
;

function Part() {
	this.isAlive = false;
}

Part.prototype = {
	init: function( f ) {
		var
			w = f.wid,
			rad = f.rad -.125 + Math.random() * .25
		;

		this.isAlive = true;
		this.x = f.x - w / 2 + Math.random() * w;
		this.y = f.y - w / 2 + Math.random() * w;
		this.x = f.x;
		this.y = f.y;
		this.dx = Math.cos( rad );
		this.dy = Math.sin( rad );
		
		this.r = 255;

		this.time = currentTime;
		this.limitTime = this.time + .5;
		this.speed = 350 + Math.random() * 150;

		return this;
	},
	kill: function() {
		this.isAlive = false;
		return this;
	},
	update: function( f, ctx ) {
		if ( this.speed <= 0 ) {
			this.kill();
		} else {

			// Update
			this.x += this.dx * this.speed * elapsedTime;
			this.y += this.dy * this.speed * elapsedTime;
			this.g = ~~( 255 * Math.min( this.speed / 100, 1 ) );
			this.b = ~~( 255 * Math.min( this.speed / 350, 1 ) );
			this.a = Math.min( this.speed / 100, 1 );

			// Drawing
			ctx.beginPath();
				ctx.arc(
					this.x,
					this.y,
					10, 0, 2 * Math.PI
				);
				ctx.fillStyle = "rgb("+ this.r +","+ this.g +","+ this.b +")";
				ctx.globalAlpha = this.a;
				ctx.fill();
			ctx.closePath();

			this.speed -= 20;
		}

		return this;
	}
};

window.Flamethrower = function( o ) {
	this
		.posX( 0 )
		.posY( 0 )
		.rotRad( 0 )
		.vecUp( defaultUp )
		.nbParticules( 1000 )
		.nbParticulesPerSec( 50 )
		.width( 10 )
	;
	return this.init( o );
}

Flamethrower.prototype = {

	parts: [],
	nbPartToCreate: 0,

	update: function( ctx ) {
		currentTime = Date.now() / 1000;
		elapsedTime = currentTime - previousTime;

		this.nbPartToCreate += elapsedTime * this.nbPartSec;

		var part, i = 0;
		while ( part = this.parts[ i++ ] ) {
			if ( part.isAlive ) {
				part.update( this, ctx );
			} else if ( this.nbPartToCreate > 1 ) {
				part.init( this );
				--this.nbPartToCreate;
			}
		}

		ctx.beginPath();
			ctx.rect(
				this.posX() - this.wid / 2,
				this.posY() - this.wid / 2,
				this.wid,
				this.wid
			);
			ctx.fillStyle = "rgb(255,20,20)";
			ctx.globalAlpha = 1;
			ctx.fill();
		ctx.closePath();

		previousTime = currentTime;
		return this;
	},

	// Status
	isOn: function() { return this; },
	on: function() { return this; },
	off: function() { return this; },
	toggle: function() { return this; },
	power: function() { return this; },


	init: function( o ) {
		for ( var i in o ) {
			this[ i ]( o[ i ] );
		}
		return this;
	},
	width: function( w ) {
		return arguments.length
			? ( this.wid = w, this )
			: this.wid
		;
	},
	nbParticules: function( nb ) {
		if ( !arguments.length ) {
			return this.nbPart;
		}
		this.nbPart = nb;
		particulesArray( this );
		return this;
	},
	nbParticulesPerSec: function( nb ) {
		return arguments.length
			? ( this.nbPartSec = nb, this )
			: this.nbPartSec
		;
	},

	// Position / rotation
	posX: function( x ) {
		return arguments.length
			? ( this.x = x, this )
			: this.x
		;
	},
	posY: function( y ) {
		return arguments.length
			? ( this.y = y, this )
			: this.y
		;
	},
	rotDeg: function( d ) {
		return arguments.length
			? ( this.rad = d * PI180, this )
			: this.rad
		;
	},
	rotRad: function( r ) {
		return arguments.length
			? ( this.rad = r, this )
			: this.rad
		;
	},
	vecUp: function( v ) {
		return arguments.length
			? ( this.vUp = v, this )
			: this.vUp
		;
	}
};

function particulesArray( f ) {
	var
		i, arr,
		nbNewParts = f.nbPart - f.parts.length
	;

	// Agrandissons le tableau.
	if ( nbNewParts > 0 ) {
		arr = new Array( nbNewParts );
		for ( i = 0; i < nbNewParts; ++i ) {
			arr[ i ] = new Part();
		}
		f.parts = f.parts.concat( arr );

	// Raccourcissons le tableau.
	} else if ( nbNewParts < 0 ) {
		f.parts.splice( nbNewParts ).forEach( function( part ) {
			part.kill();
		});
	}
}

})();

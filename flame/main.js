$( function() {

	window.cnv = new Canvasloth( {
		container: $( ".canvasloth" ),
		context: "2d",
		autoFocus: false,
		fps: 60,
		w: 640,
		h: 360,
		resolutionVariable: false,
		thisApp: {
		},
		ready: function( o ) {
			var
				flame,
				that = this,
				cnv = o.canvasloth,
				ctn = cnv.container,
				ctx = o.ctx,
				size = cnv.size()
			;

			this.cnv = cnv;
			this.ctx = ctx;

			this.flame = flame = new Flamethrower({
				posX: size.w / 2,
				posY: size.h / 2,
				power: 0
			});

			$( ".joystick" ).element().init({
				move: function( x, y, rx, ry ) {
					flame
						.rotRad( Math.atan2( y, x ) )
						.power( Math.sqrt( x * x + y * y ) * 600 )
					;
				},
				hold: function() {
					flame.on();
				},
				release: function() {
					flame.off();
				}
			});
		},
		loop: function() {
			var
				ctx = this.ctx,
				size = this.cnv.size()
			;

			ctx.clearRect( 0, 0, size.w, size.h );
			
			this.flame.update( ctx );
		},
		events: {
			keyDown: function( e ) {
			},
			mouseDown: function() {
			},
			mouseUp: function() {
			},
			mouseMove: function( e ) {
			},
			touchMove: function( e ) {
			},
			fullscreenchange: function( e ) {
			}
		}
	});

});

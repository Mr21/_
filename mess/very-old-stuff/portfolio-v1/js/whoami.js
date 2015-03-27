function Whoami()
{
	this.drag = false;
	this.isOpen = false;
	JsExt_Id("whoami_a_open").onclick  = (function(c_this){return function(){return c_this.open()}})(this);
	JsExt_Id("whoami_a_close").onclick = (function(c_this){return function(){return c_this.close()}})(this);
	
	this.open = function()
	{
		if (!this.isOpen)
		{
			JsExt_CssAnim.anim
			(
				{elm: "whoami_open_bg", css: "left",         val: "+=150px", dur: 200,           mov: EASE_IN  },
				{                       css: "opacity",      val:       "0", dur: 100, del: 100, mov: LINEAR   },
				{                       css: "display",      val:    "none", dur:   0, del: 200                },
				{elm: "whoami_img",     css: "margin-top",   val:     "8px", dur: 300, del: 500, mov: EASE_IN  },
				{                       css: "margin-left",  val:     "8px"                                    },
				{                       css: "width",        val:   "135px"                                    },
				{                       css: "opacity",      val:       "1",                     mov: LINEAR   },
				{elm: "whoami",         css: "height",       val: "+=150px", dur: 600, del: 500, mov: EASE_OUT },
				{                       css: "width",        val: "+=110px",                     mov: EASE_IN  },
				{                       css: "right",        val:  "-=55px"                                    },
				{elm: "whoami_p",       css: "display",      val:   "block", dur:   0, del: 750, mov: LINEAR   },
				{                       css: "opacity",      val:       "1", dur: 750,                         },
				{elm: "whoami_menu",    css: "margin-top",   val:     "0px", dur: 250, del: 900, mov: EASE_OUT },
				{elm: "whoami_img_a",   css: "display",      val:   "block", dur:   0                          }
			);
			this.isOpen = true;
		}
		return false;
	};
	
	this.close = function()
	{
		if (this.isOpen)
		{
			JsExt_CssAnim.anim
			(
				{elm: "whoami_img_a",   css: "display",      val:    "none", dur:   0                          },
				{elm: "whoami_menu",    css: "margin-top",   val:   "-32px", dur: 250,           mov: EASE_OUT },
				{elm: "whoami_p",       css: "opacity",      val:       "0",                     mov: LINEAR   },
				{                       css: "display",      val:    "none",           del: 250                },
				{elm: "whoami",         css: "height",       val: "-=150px", dur: 600, del: 200, mov: EASE_IN  },
				{                       css: "width",        val: "-=110px",                     mov: EASE_OUT },
				{                       css: "right",        val:  "+=55px"                                    },
				{elm: "whoami_img",     css: "margin-top",   val:  "-=40px", dur: 500, del: 250, mov: EASE_IN  },
				{                       css: "margin-left",  val:     "0px"                                    },
				{                       css: "width",        val:    "100%"                                    },
				{                       css: "opacity",      val:     "0.3",                     mov: LINEAR   },
				{elm: "whoami_open_bg", css: "display",      val:   "block", dur:   0, del: 750                },
				{                       css: "opacity",      val:     "0.8", dur: 100,           mov: LINEAR   },
				{                       css: "left",         val: "-=150px", dur: 200,           mov: EASE_IN  }
			);
			this.isOpen = false;
		}
		return false;
	};
}

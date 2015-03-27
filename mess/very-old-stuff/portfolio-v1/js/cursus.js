function Cursus()
{
	this.isOpen = false;
	JsExt_Id("cursus_a_open" ).onclick = (function(c_this){return function(){return c_this.open()}})(this);
	JsExt_Id("cursus_a_close").onclick = (function(c_this){return function(){return c_this.close()}})(this);

	this.open = function()
	{
		if (!this.isOpen)
		{
			for (var i = 0; i < 3; ++i)
			{
				JsExt_CssAnim.anim
				(
					{elm: "cursus_ico" + i, css: "margin-top", val: "-50px", dur: 800, mov: EASE_IN, del: i * 200       },
					{                       css: "opacity",    val:     "0"                                             },
					{                       css: "display",    val:  "none", dur:   0,               del: i * 200 + 800 }
				);
			}
			JsExt_Css("cursus_menu", "margin-left", "500px");
			JsExt_Css("cursus_menu", "margin-right", "0px");
			JsExt_CssAnim.anim
			(
				{elm: "cursus_a_open",  css: "font-size",   val:    "16px", dur:  500,           mov: EASE_IN     },
				{                       css: "width",       val:   "120px"                                        },
				{                       css: "top",         val:     "6px"                                        },
				{                       css: "font-weight", val:    "bold", dur:    0, del: 500                   },
				{elm: "cursus_menu",    css: "opacity",     val:       "1", dur:  250, del: 200, mov: EASE_OUT    },
				{                       css: "margin-left", val:     "0px", dur:  400                             },
				{elm: "cursus",         css: "height",      val:   "450px", dur: 1000, del: 400,                  },
				{                       css: "width",       val: "+=100px"                                        },
				{                       css: "left",        val:  "-=50px"                                        },
				{elm: "cursus_time",    css: "display",     val:   "block", dur:    0, del: 800, mov: LINEAR      },
				{                       css: "opacity",     val:       "1", dur:  500                             },
				{elm: "cursus_content", css: "scroll-top",  val:   "500px", dur:  800,           mov:EASE_IN_OUT  }
			);
			this.isOpen = true;
		}
		return false;
	};

	this.close = function()
	{
		if (this.isOpen)
		{
			for (var i = 0; i < 3; ++i)
				JsExt_CssAnim.anim
				(
					{elm: "cursus_ico" + i, css: "display",    val: "block", dur:   0, del: 800 + i * 200 },
					{                       css: "margin-top", val:   "0px", dur: 800, mov: EASE_IN       },
					{                       css: "opacity",    val:     "1"                               }
				);
			JsExt_CssAnim.anim
			(
				{elm: "cursus_content", css: "scroll-top",   val:       "0", dur: 750,           mov: EASE_OUT    },
				{elm: "cursus_time",    css: "opacity",      val:       "0", dur: 500, del: 200, mov: LINEAR      },
				{                       css: "display",      val:    "none", dur:   0, del: 700                   },
				{elm: "cursus",         css: "height",       val:   "200px", dur: 300, del: 500                   },
				{                       css: "width",        val: "-=100px"                                       },
				{                       css: "left",         val:  "+=50px"                                       },
				{elm: "cursus_menu",    css: "opacity",      val:       "0", dur: 400, del: 700, mov: EASE_OUT    },
				{                       css: "margin-right", val:   "500px"                                       },
				{elm: "cursus_a_open",  css: "font-size",    val:    "36px", dur: 500, del: 900, mov: EASE_IN     },
				{                       css: "width",        val:    "100%"                                       },
				{                       css: "top",          val:    "32px"                                       },
				{                       css: "font-weight",  val:  "normal", dur:   0                             }
			);
			this.isOpen = false;
		}
		return false;
	};
}


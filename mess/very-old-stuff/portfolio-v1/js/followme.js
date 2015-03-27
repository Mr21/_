function Followme()
{
	this.isOpen = false;
	this.NB_ICOS = 6;
	this.arrPos = new Array(this.NB_ICOS);
	JsExt_Id("followme_a_open").onclick  = (function(c_this){return function(){return c_this.open()}})(this);
	JsExt_Id("followme_a_close").onclick = (function(c_this){return function(){return c_this.close()}})(this);
	for (var i = 0; i < this.NB_ICOS; ++i)
		this.arrPos[i] = {x:JsExt_Css("followme_ico" + i, "left"), y:JsExt_Css("followme_ico" + i, "top")};
	
	this.open = function()
	{
		if (!this.isOpen)
		{
			JsExt_CssAnim.anim
			(
				{elm: "followme_a_open", css: "opacity", val:    "0",    dur: 500, mov: EASE_IN },
				{                        css: "display", val:  "none",   dur:   0, del: 500     },
				{elm: "followme",        css: "height",  val: "+=168px", dur: 600, del:   0     },
				{                        css: "top",     val: "-=50px",                         },
				{elm: "followme_ul",     css: "display", val:  "block",  dur:   0, del: 450     },
				{                        css: "opacity", val:    "1",    dur: 300               }
			);
			for (var i = 0; i < this.NB_ICOS; ++i)
				JsExt_CssAnim.anim
				(
					{elm: "followme_ico" + i, css: "width",        val: "32px", dur: 250, mov: EASE_IN,  del: i * 200 + 600 },
					{                         css: "left",         val:  "8px"                                              },
					{                         css: "top",          val: 33 + i * 36 + "px"                                  },
					{elm: "followme_a" + i,   css: "padding-left", val:  "0px", dur: 250, mov: EASE_OUT, del: i * 200 + 700 }
				);
			this.isOpen = true;
		}
		return false;
	}

	this.close = function()
	{
		if (this.isOpen)
		{
			var delay = this.NB_ICOS * 100 + 400;
			JsExt_CssAnim.anim
			(
				{elm: "followme_ul",     css: "opacity", val:     "0",   dur: delay,                    mov: LINEAR  },
				{                        css: "display", val:  "none",   dur:     0, del: delay                      },
				{elm: "followme_a_open", css: "display", val:  "block"                                               },
				{                        css: "opacity", val:     "1",   dur:   250, del: delay + 1500, mov: EASE_IN },
				{elm: "followme",        css: "height",  val: "-=168px", dur:   600, del: delay                      },
				{                        css: "top",     val:  "+=50px",                                             }
			);
			for (var i = 0, j = this.NB_ICOS - 1; j >= 0; ++i, --j)
				JsExt_CssAnim.anim
				(
					{elm: "followme_ico" + j, css: "left",         val: "-200px",         dur: 500, del: i * 200,       mov: EASE_IN },
					{elm: "followme_a" + j,   css: "padding-left", val:  "400px",         dur: 500, del: i * 200,       mov: EASE_IN },
					{elm: "followme_ico" + j, css: "opacity",      val:    "0",           dur: 500,                     mov: LINEAR  },
					{                         css: "left",         val: this.arrPos[j].x, dur:   0, del: i * 200 + 700               },
					{                         css: "top",          val: this.arrPos[j].y, dur:   0                                   },
					{                         css: "width",        val:  "128px",         dur:   0                                   },
					{                         css: "opacity",      val:    "1",           dur: 600                                   }
				);
			this.isOpen = false;
		}
		return false;
	}
}

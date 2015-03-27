function Skills()
{
	this.SPEED_UP = 40;
	this.NB_ICOS = 16;
	this.isOpen = false;
	this.arrSkills = new Array
	(
		{n:"Programmation system"},
		{n:"c",           p:"95%", d:"I started programming with the <b>C</b> language"},
		{n:"cpp",         p:"60%", d:"I approach the Object Oriented with <b>C++</b>"},
		{n:"linux",       p:"33%", d:"I used <b>Linux</b> every day  since three years at Epitech"},
		{n:"git",         p:"80%", d:"Maintain code with <b>Git</b> is obvious to me now"},
		{n:"Programmation web"},
		{n:"dhtml",       p:"93%", d:"All my webpages are made in <b>Dynamic HTML</b>"},
		{n:"css",         p:"85%", d:"I know a multitude of <b>CSS</b> properties by heart."},
		{n:"php",         p:"70%", d:"I already made ​​some <b>Object Oriented PHP</b>"},
		{n:"js",          p:"95%", d:"<b>Javascript</b> allows me a lot of creativity&nbsp;!"},
		{n:"dom",         p:"97%", d:"The <b>DOM</b> tree of a webpage has no secret for me."},
		{n:"jquery",      p:"90%", d:"I analyze the code of <b>jQuery</b> regularly."},
		{n:"mysql",       p:"90%", d:"I learnt how to make many actions in only one query <b>SQL</b>"},
		{n:"Graphics"},
		{n:"photoshop",   p:"50%", d:"I used <b>Photoshop</b> throughout my high school."},
		{n:"illustrator", p:"80%", d:"I can use <b>Illustrator</b> to create any logo "},
		{n:"indesign",    p:"75%", d:"I can create any professional quality document on <b>InDesign</b>"},
		{n:"flash",       p:"20%", d:"It's a little deprecated but I know the basics of <b>Flash</b>"},
		{n:"maya",        p:"30%", d:"For some games, I used <b>Maya</b> to create my own models"}
	);
	JsExt_Id("skills_a_open").onclick  = (function(c_this){return function(){return c_this.open()}})(this);
	JsExt_Id("skills_a_close").onclick = (function(c_this){return function(){return c_this.close()}})(this);
	var strHTML = "";
	for (var i = 0; i < this.arrSkills.length; ++i)
		if (this.arrSkills[i].p === undefined)
			strHTML += '<div class="skills_title"><hr/><span>' + this.arrSkills[i].n + '</span></div><div>';
		else
		{
			strHTML +=
				'<div class="skills_line">' +
					'<img src="img/skills/' + this.arrSkills[i].n + '.png" alt="' + this.arrSkills[i].n + '"/><div class="sep"></div>' +
					'<div class="skills_meter" title="' + this.arrSkills[i].p + '"><div id="skills_pourc' + i + '"></div></div><div class="sep"></div>' +
					'<span id="skills_desc' + i + '">' + this.arrSkills[i].d + '</span>' +
				'</div>';
			if (i + 1 === this.arrSkills.length || this.arrSkills[i + 1].p === undefined)
				strHTML += '</div>';
		}
	JsExt_Id("skills_list").innerHTML = strHTML;
	
	this.open = function()
	{
		if (!this.isOpen)
		{
			var i;
			for (i = 0; i < this.NB_ICOS; ++i)
				JsExt_CssAnim.anim
				(
					{elm: "skills_ico" + i,   css: "top",    val: "-=250px", dur: 500, del: i * this.SPEED_UP, mov: EASE_IN }
				);
			for (i = 0; i < this.arrSkills.length; ++i)
				if (this.arrSkills[i].p)
				{
					JsExt_Css("skills_pourc" + i, "width",            "0%");
					JsExt_Css("skills_desc"  + i, "margin-left",  "-100px");
					JsExt_Css("skills_desc"  + i, "opacity",           "0");
					JsExt_CssAnim.anim
					(
						{elm: "skills_pourc" + i, css: "width",       val: this.arrSkills[i].p, dur: 200, del: 1500 + i * 100, mov: EASE_OUT },
						{elm: "skills_desc"  + i, css: "margin-left", val:               "0px", dur: 200                                     },
						{elm: "skills_desc"  + i, css: "opacity",     val:                 "1"                                               }
					);
				}
			i *= this.SPEED_UP;
			JsExt_CssAnim.anim
			(
				{elm: "skills_open",    css: "margin-top", val: "-=100px", dur: 500, del: i,       mov: EASE_IN  },
				{                       css: "opacity",    val:       "0",                         mov: LINEAR   },
				{                       css: "display",    val:    "none", dur:   0, del: i + 500                },
				{elm: "skills",         css: "width",      val: "+=120px", dur: 200,               mov: EASE_OUT },
				{                       css: "right",      val:  "-=60px",                                       },
				{                       css: "height",     val: "+=470px",                                       },
				{                       css: "top",        val: "-=170px",                                       },
				{elm: "skills_menu",    css: "display",    val:   "block", dur:   0, del: i + 700, mov: LINEAR   },
				{elm: "skills_content", css: "top",        val:    "32px",                                       },
				{elm: "skills_list",    css: "display",    val:   "block",                                       },
				{                       css: "opacity",    val:       "1", dur: 500                              }
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
				{elm: "skills_list",    css: "opacity",    val:       "0", dur: 500,           mov: LINEAR   },
				{                       css: "display",    val:    "none", dur:   0, del: 500                },
				{elm: "skills",         css: "width",      val: "-=120px", dur: 500, del:   0, mov: EASE_OUT },
				{                       css: "right",      val:  "+=60px",                                   },
				{                       css: "height",     val: "-=470px",                                   },
				{                       css: "top",        val: "+=170px",                                   },
				{elm: "skills_menu",    css: "display",    val:    "none", dur:   0, del: 500, mov: LINEAR   },
				{elm: "skills_content", css: "top",        val:     "0px",                                   },
				{elm: "skills_open",    css: "display",    val:   "block",                                   },
				{                       css: "opacity",    val:       "1", dur: 500, del: 600, mov: LINEAR   },
				{                       css: "margin-top", val: "+=100px",                     mov: EASE_IN  }
			);
			for (var i = 0; i < this.NB_ICOS; ++i)
				JsExt_CssAnim.anim
				(
					{elm: "skills_ico" + i,   css: "top",    val: "+=250px", dur: 500, del: 200 + i * this.SPEED_UP, mov: EASE_IN }
				);
			this.isOpen = false;
		}
		return false;
	}
}

var	zIndexMax;
var BGDARK_DURATION = 250;

function	openWindow(id)
{
	var	zIndexCurr = parseInt(JsExt_Css(id, "z-index"));
	var	idBG = JsExt_Id("bgDark");

	if (zIndexCurr <= zIndexMax)
	{
		zIndexCurr = (zIndexMax += 2);
		JsExt_Css(idBG, "z-index", zIndexCurr - 1);
		JsExt_Css(id, "z-index", zIndexCurr);
	}
	JsExt_Css(idBG, "display", "block");
	JsExt_CssAnim.anim
	(
		{elm:  "bgDark", css: "opacity", val: "0.8", dur: BGDARK_DURATION, mov: LINEAR}
	);
}

function	closeWindow(id)
{
	JsExt_CssAnim.anim
	(
		{elm:  "bgDark", css: "opacity", val:    "0", dur: BGDARK_DURATION, mov: LINEAR          },
		{                css: "display", val: "none", dur:               0, del: BGDARK_DURATION }
	);
}

function	initClicWindow()
{
	zIndexMax = parseInt(JsExt_Css(JsExt_Id(arguments[0]), "z-index"));
	for (var i = 0; i < arguments.length; ++i)
	{
		var id = JsExt_Id(arguments[i]);
		JsExt_AddEvent(JsExt_Id(arguments[i] + "_a_open"),  "click", (function(c_id){return function(){openWindow(c_id)}})(id));
		JsExt_AddEvent(JsExt_Id(arguments[i] + "_a_close"), "click", (function(c_id){return function(){closeWindow(c_id)}})(id));
	}
}

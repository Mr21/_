/*
	Mr21 - MathInterp.js - 2.1
	http://mr21.fr/JsExt/
*/

Math._interp = [];

Math._interp[0] = Math._interp['linear'] = function(a, n, b) {
	return a + (b - a) * n;
}

Math._interp[1] = Math._interp['easeIn'] = function(a, n, b) {
	if (Math._log51 === undefined)
		Math._log51 = Math.log(1 * 50 + 1);
	return a + (b - a) * (Math.log(n * 50 + 1) / Math._log51);
}

Math._interp[2] = Math._interp['easeOut'] = function(a, n, b) {
	if (Math._exp6 === undefined)
		Math._exp6 = Math.exp(6) - 1;
	return a + (b - a) * ((Math.exp(n * 6) - 1) / Math._exp6);
}

Math._interp[3] = Math._interp['easeInOut'] = function(a, n, b) {
	if (Math._pi2 === undefined)
		Math._pi2 = Math.PI / 2;
	return a + (b - a) * ((Math.sin(n * Math.PI - Math._pi2) + 1) / 2);
}

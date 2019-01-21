$.mask.definitions['x'] = "[xX]|[0-9]";

function alphabetic(e) {
	var evt = e.charCode;
	if (document.all) {
		evt = event.keyCode;
	}
	var chr = String.fromCharCode(evt);
	var re = /[a-zA-Z]|[\s]|[\-]|[\.]/; // permite de A-Z, a-z,
	return (re.test(chr) || evt < 20); // com evt<20 permitimos
}
function alphabeticAcento(e) {
	var evt = e.charCode;
	if (document.all) {
		evt = event.keyCode;
	}
	var chr = String.fromCharCode(evt);
	// var re =
	var re = /[a-zA-ZÀ-ü]|[\s]|[\-]|[\.]|[\´]/;
	return (re.test(chr) || evt < 20); // com evt<20 permitimos
}

function alphabeticAcentoSemEspeciais(e) {
	var evt = e.charCode;
	if (document.all) {
		evt = event.keyCode;
	}
	var chr = String.fromCharCode(evt);
	// var re =
	var re = /[a-zA-ZÀ-ü]|[\s]|[\´]/;
	return (re.test(chr) || evt < 20); // com evt<20 permitimos
}

function alphaNumericAcento(e) {
	var evt = e.charCode;
	if (document.all) {
		evt = event.keyCode;
	}
	var chr = String.fromCharCode(evt);
	// var re =
	var re = /[a-zA-Z0-9À-ü]|[\s]|[\-]|[\.]|[\´]/;
	return (re.test(chr) || evt < 20); // com evt<20 permitimos
}

function numeric(e) {
	var evt = e.charCode;
	if (document.all) {
		evt = event.keyCode;
	}
	var chr = String.fromCharCode(evt);
	var re = /[0-9]/; // permite de A-Z, a-z,
	return (re.test(chr) || evt < 20); // com evt<20 permitimos
}

/*
 * FUNÇÃO PARA RETIRAR ACENTOS DOS CAMPOS
 */
function retirarAcento(objResp) {
	var varString = new String(objResp.value);
	var stringAcentos = new String('àâêôûãõáéíóúçüÀÂÊÔÛÃÕÁÉÍÓÚÇÜ');
	var stringSemAcento = new String('aaeouaoaeioucuAAEOUAOAEIOUCU');

	var i = new Number();
	var j = new Number();
	var cString = new String();
	var varRes = '';

	for (i = 0; i < varString.length; i++) {
		cString = varString.substring(i, i + 1);
		for (j = 0; j < stringAcentos.length; j++) {
			if (stringAcentos.substring(j, j + 1) == cString) {
				cString = stringSemAcento.substring(j, j + 1);
			}
		}
		varRes += cString;
	}
	return objResp.value = varRes;
}


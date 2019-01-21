
//CONTANTES E DIRETAS
var started = false; // SE O APPLET FOI INICIADO
var theApplet = null; // REFERENCIA AO APPLET
var timer = null;

/*
 * ======================================================================================
 * Verifica se o Browser eh Internet Explorer ou nao
 * =======================================================================================
 */
function isIEExp() {
	var isIntEx = null;
	isIntEx = (navigator.appName.indexOf("Microsoft") != -1) ? true : false;
	return isIntEx;
}

/*
 * ======================================================================================
 * ON LOAD
 * =======================================================================================
 */
function initPageImpl() {
	if (checkJavaPlugin()) {
		if (document.applets['oApplet']) {
			theApplet = document.applets['oApplet'];
		}
		checkAppletStarted();
	} else {
		showAppletActions(false);
		alert("Você precisa instalar o Java Plug-in no seu browser.");
	}
}

/*
 * ======================================================================================
 * Mostra ou Nao os botoes de uso do Applet
 * =======================================================================================
 */
function showAppletActions(flag) {
	var myButtons = getById('appletActions');
	try {
		if (!flag) {
			myButtons.style.display = 'none';
		} else {
			myButtons.style.display = 'block';
		}
	} catch (e) {
	}
}

/*
 * ======================================================================================
 * Redireciona o SITE para a Instalacao do JAVA
 * =======================================================================================
 */
function gotoJavaInstall() {
	var url = "http://java.sun.com/javase/downloads/index.jsp";
	parent.parent.GB_hide();
	top.showWait(true);
	top.location.href = url;
}

/*
 * ======================================================================================
 * VERIFICA SE O BROWSER EM QUESTAO TEM O Java Plug-In Instalado
 * =======================================================================================
 */
function checkJavaPlugin() {
	var pluginOK = false;
	if (this.isIEExp()) {
		pluginOK = doMicrosoft();
	} else {
		pluginOK = doNetscape();
	}

	return pluginOK;
}
function doNetscape() {
	for (i = 0; i < navigator.plugins.length; i++) {
		for (j = 0; j < navigator.plugins[i].length; j++) {
			if (navigator.plugins[i][j].type == "application/x-java-applet;version=1.5") {
				return true;
			}
		}
	}
	return false;
}
function doMicrosoft() {
	var myApplet = document.applets['oApplet'];
	return myApplet != null;
}

/*
 * ======================================================================================
 * Mostra a Configuracao do Applet
 * =======================================================================================
 */
function showConfig() {
	theApplet.showConfiguration();
}

/*
 * ======================================================================================
 * Faz a chamada do Submit
 * =======================================================================================
 */
function autenticar2() {
	if (generateResponse2()) {
		var myForm = document.forms[0];
		myForm.submit();
	} else {
		showWaitDialog(false);
	}
}

/*
 * ======================================================================================
 * Gera Resposta para o Applet
 * =======================================================================================
 */
function generateResponse2() {
	try {
		var myForm = document.forms[0];

		myForm.response.value = theApplet.getResponse();
		myForm.certificate.value = theApplet.getUserCertificate();
		if (isNull(myForm.response.value) || isNull(myForm.certificate.value)) {
			return false;
		}
	} catch (err) {
		alert("Erro: " + err);
		return false;
	}
	return true;
}

function autenticar() {
	generateResponse();
}

function generateResponse() {
	theApplet.generateResponse();
	timer = setInterval("sendResponse()", 1000);
}

function sendResponse() {
	ret = theApplet.selectIsDone();

	if (ret != theApplet.NOT_FINISHED_CODE) {
		clearInterval(timer);

		if (ret == theApplet.OK_CODE) {
			document.getElementById('logonCert:responseParam').value = theApplet
					.getResponseAfterGenerate();
			document.getElementById('logonCert:certifcateParam').value = theApplet
					.getUserCertificate();
			document.getElementById('logonCert:submitChallenge').click();
			
			showAjaxStatus(true);
		}
	}
}

/*
 * ======================================================================================
 * Gera Resposta para o Applet 2
 * =======================================================================================
 */
function generateResponseCD(sessionID) {
	try {
		var myForm = document.forms[0];

		// seta applet para assinatura
		theApplet.setEncryptDocument(false);
		theApplet.setSignDocument(true);

		// seta o session id para ser assinado
		theApplet.addContent(sessionID, "string", false);
		theApplet.markAllDocuments();

		// recupera a assinatura
		var encoded = null;
		try {
			encoded = theApplet.getEncodedContent(0);
		} catch (err) {
		}

		// se ocorrer algum erro ou cancelmento retorna falso
		if (encoded == null) {
			// cancelar submit
			return false;
		} else {
			// senão true e seta o campo response com o pacote assinado
			myForm.response.value = encoded;
			return true;
		}

		// se por acaso o campo response ficar em branco retorna false
		if (isNull(myForm.response.value)) {
			return false;
		}
	} catch (err) {
		alert("Erro: " + err);
		return false;
	}
	return true;
}

/*
 * ======================================================================================
 * Faz a chamada do Submit 2
 * =======================================================================================
 */
function autenticarCD(sessionID) {
	// showWaitDialog(true);
	if (generateResponseCD(sessionID)) {
		var myForm = document.forms[0];
		myForm.submit();
	} else {
		showWaitDialog(false);
	}
}

/*
 * ======================================================================================
 * Verifica se a applet foi iniciada ou não.
 * =======================================================================================
 */
function checkAppletStarted() {
	if (document.applets['oApplet']) {
		try {
			started = document.applets['oApplet'].isStarted();
		} catch (err) {
		}
	}
	if (!started) {
		window.setTimeout("checkAppletStarted()", 1000);
	}
}

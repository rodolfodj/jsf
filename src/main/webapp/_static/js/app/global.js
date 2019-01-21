
//O CONTEXTO DA APLICACAO
var MY_CONTEXT = "/poupa";

$(document).ready(function() {
	// Aumenta tamanho da fonte
	$(".increase").click(function() {
		var currentFontSize = $("#global").css("font-size");
		var currentFontSizeNum = parseFloat(currentFontSize);
		if (currentFontSizeNum < 13) {
			var newFontSize = currentFontSizeNum + 1;
			$("#global").css("font-size", newFontSize);
		}
		return false;
	});

	// Diminui tamanho da fonte
	$(".decrease").click(function() {
		var currentFontSize = $("#global").css("font-size");
		var currentFontSizeNum = parseFloat(currentFontSize);
		if (currentFontSizeNum > 7) {
			var newFontSize = currentFontSizeNum - 1;
			$("#global").css("font-size", newFontSize);
		}
		return false;
	});
});

// Contraste
function setActiveStyleSheet(title) {
	var i, a; //main;
	for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
		if (a.getAttribute("rel").indexOf("style") != -1
				&& a.getAttribute("title")) {
			a.disabled = true;
			if (a.getAttribute("title") == title)
				a.disabled = false;
		}
	}
}

function getActiveStyleSheet() {
	var i, a;
	for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
		if (a.getAttribute("rel").indexOf("style") != -1
				&& a.getAttribute("title") && !a.disabled)
			return a.getAttribute("title");
	}
	return null;
}

function getPreferredStyleSheet() {
	var i, a;
	for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
		if (a.getAttribute("rel").indexOf("style") != -1
				&& a.getAttribute("rel").indexOf("alt") == -1
				&& a.getAttribute("title"))
			return a.getAttribute("title");
	}
	return null;
}

// Cookie
function createCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	} else
		expires = "";
	document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for ( var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ')
			c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0)
			return c.substring(nameEQ.length, c.length);
	}
	return null;
}

var cookie = readCookie("style");
var title = cookie ? cookie : getPreferredStyleSheet();
setActiveStyleSheet(title);

function setCookie(cookie_name, cookie_value, expire_in_days) {
	var cookie_expire = "";

	if (expire_in_days != null) {
		var expire = new Date();
		expire.setTime(expire.getTime() + 1000 * 60 * 60 * 24
				* parseInt(expire_in_days));
		cookie_expire = "; expires=" + expire.toGMTString();
	}

	document.cookie = escape(cookie_name) + "=" + escape(cookie_value)
			+ cookie_expire;
}

function getCookie(cookie_name) {
	if (!document.cookie.match(eval("/" + escape(cookie_name) + "=/"))) {
		return false;
	}

	return unescape(document.cookie.replace(eval("/^.*?" + escape(cookie_name)
			+ "=([^\\s;]*).*$/"), "$1"));
}
/*
 * FIM CONTROLES DE CONTRASTE
 */

// FUNCAO PARA MOSTRAR O AJAX_STATUS
function showAjaxStatus(flag) {

	try {
		if (top.frames['body']) {
			// alert('Com frame...');
			theDiv = top.frames['body'].document
					.getElementById("ajaxStatus_start");
			theDivTransparente = top.frames['body'].document
					.getElementById('waitTransp');
		} else {
			// alert('Sem frame...');
			theDiv = document.getElementById("ajaxStatus_start");
			theDivTransparente = document.getElementById('waitTransp');
		}
		if (flag) {
			theDiv.style.display = 'block';
			theDivTransparente.style.visibility = 'visible';
			slowly.fadein('global');
			setTimeout("$('p[class=botao]').text('Processando...');", 50);
		} else {
			// alert('abrindo campos');
			theDiv.style.display = 'none';
			theDivTransparente.style.visibility = 'hidden';
			slowly.fadeout('global');
		}

	} catch (err) {
		alert('Erro em showAjaxStatus: ' + err);
	}

}

/**
 * @describe: Duas func�es que trabalham em par para fazer o feito esconder
 *            (fadein)e aparecer (fadeout)
 * @author : Richard D. LeCour (from)
 * @namespace: http://www.richardsramblings.com/?p=486 *******
 * @update by: Ricardo Spinoza (ricardospinoza@yahoo.com.br)
 * @date: 15 maio 2006
 * @sintaxe: slowly.fadein('id') -> id: id da tag, fadein apaga div
 *           slowly.fadeout('id') -> id: id da tag, fadeout acende div example:
 *           <div id="teste" style="widht: 200px; height: 220px; color: red;">
 *           este � um teste </div> <input value='fadein' type="button"
 *           onclick="javascript:slowly.fadein('teste');"> <br>
 *           <input value='fadeout' type="button"
 *           onclick="javascript:slowly.fadeout('teste');">
 * 
 * @version: 1.0
 */
var opacityin = 96; // Avoid starting at 100% due to Mozilla bug
var opacityout = 0; // Avoid starting at 100% due to Mozilla bug
var slowly = {
	fadein : function(id) {
		this.fadeLoopin(id, opacityin);
	},
	fadeLoopin : function(id, opacityin) {
		var o;
		if (top.frames['body']) {
			// alert('Com frame...');
			o = top.frames['body'].document.getElementById(id);
		} else {
			// alert('Sem frame...');
			o = document.getElementById(id);
		}

		if (opacityin >= 40) {
			slowly.setOpacityin(o, opacityin);
			opacityin -= 4;
			// opacityin -= 8;
			window.setTimeout("slowly.fadeLoopin('" + id + "', " + opacityin
					+ ")", 50);
		} else {
			// o.style.display = "none";
		}
	},
	setOpacityin : function(o, opacityin) {
		// alert("objeto.name: "o.name +" valor opacidade: "+ opacityin);
		o.style.filter = "alpha(style=0,opacity:" + opacityin + ")";// IE
		o.style.KHTMLOpacity = opacityin / 100; // Konqueror
		o.style.MozOpacity = opacityin / 100; // Mozilla (old)
		o.style.opacity = opacityin / 100; // Mozilla (new)
	},
	fadeout : function(id) {
		this.fadeLoopout(id, opacityout);
	},
	fadeLoopout : function(id, opacityout) {
		var o = document.getElementById(id);
		if (opacityout <= 100) {
			o.style.display = "block";
			slowly.setOpacityout(o, opacityout);
			// opacityout += 4;
			opacityout += 8;
			window.setTimeout("slowly.fadeLoopout('" + id + "', " + opacityout
					+ ")", 50);
		}
	},
	setOpacityout : function(o, opacityout) {
		o.style.filter = "alpha(style=0,opacity:" + opacityout + ")";// IE
		o.style.KHTMLOpacity = opacityout / 100; // Konqueror
		o.style.MozOpacity = opacityout / 100; // Mozilla (old)
		o.style.opacity = opacityout / 100; // Mozilla (new)
	}
};

// FUNCAO PARA RETORNAR A P�GINA ANTERIOR
function goBack() {
	window.history.back();
}

// ABRIR A FIC
function showFic(flagDigital) {

	var url = MY_CONTEXT + '/ficViewer?d=';
	var specs = 'width=800,location=no,status=no,menubar=no,titlebar=no,toolbar=no,fullscreen=no';

	if (flagDigital == true) {
		url = url + "1";
	} else {
		url = url + "0";
	}

	var myWindow = window.open(url, 'FIC', specs);
	myWindow.focus();
}

// ABRIR PROTOCOLO REUSO RG
function showReusoProtocolo() {

	var url = MY_CONTEXT + '/reusoProtocolo';
	var specs = 'width=800,location=no,status=no,menubar=no,titlebar=no,toolbar=no,fullscreen=no';
	var myWindow = window.open(url, 'FIC', specs);
	myWindow.focus();
}

//EXIBE PROTOCOLO PARA O REUSO CARTEIRA IDENTIDADE
function showCarteiraReusoProtocolo() {
	var url = MY_CONTEXT + '/carteiraReusoProtocolo';
	var specs = 'width=800,location=no,status=no,menubar=no,titlebar=no,toolbar=no,fullscreen=no';
	var myWindow = window.open(url, 'FIC', specs);
	myWindow.focus();
}

// ABRIR A SENHA GERADA
function showSenhaGerada() {
	var url = MY_CONTEXT + '/senhaGeradaViewer';
	var specs = 'width=800,location=no,status=no,menubar=no,titlebar=no,toolbar=no,fullscreen=no';

	var myWindow = window.open(url, '', specs);
	myWindow.focus();
	return true;
}

//ABRIR A SENHA GERADA DETRAN
//function showSenhaGeradaDetran() {
//	var url = MY_CONTEXT + '/gerarSenhaPortalservlet';
//	var specs = 'width=800,location=no,status=no,menubar=no,titlebar=no,toolbar=no,fullscreen=no';
//
//	var myWindow = window.open(url, '', specs);
//	myWindow.focus();
//	return true;
//}

// ABRIR A FIC
function showProtocoloFic(flagDigital) {

	var url = MY_CONTEXT + '/ficProtocoloViewer?d=';
	var specs = 'width=800,location=no,status=no,menubar=no,titlebar=no,toolbar=no,fullscreen=no';

	if (flagDigital == true) {
		url = url + "1";
	} else {
		url = url + "0";
	}

	var myWindow = window.open(url, 'FIC', specs);
	myWindow.focus();
}

// ABRIR A ANAMNESE
function showAnamnese() {
	var url = MY_CONTEXT + '/anamneseViewer';
	var specs = 'width=800,location=no,status=no,menubar=no,titlebar=no,toolbar=no,fullscreen=no';

	var myWindow = window.open(url, 'Anamnese', specs);
	myWindow.focus();
}

// ABRIR AGENDAMENTO MEDICO
function showAgendamentoMedico() {

	var url = MY_CONTEXT + '/agendamentoMedicoViewer';
	var specs = 'width=800,location=no,status=no,menubar=no,titlebar=no,toolbar=no,fullscreen=no';

	var myWindow = window.open(url, 'Agendamento Médico', specs);
	myWindow.focus();
}

// ABRIR ANTECEDENTES
function showAntecedente() {
	var url = MY_CONTEXT + '/antecedentes';
	var specs = 'width=800,location=no,status=no,menubar=no,titlebar=no,toolbar=no,fullscreen=no';

	var myWindow = window.open(url, 'Antecedentes', specs);
	myWindow.focus();
}

//ABRIR SOLICITACAO DE PATERNIDADE
function showSolicitacaoPaternidade() {
	var url = MY_CONTEXT + '/paternidade';
	var specs = 'width=800,location=no,status=no,menubar=no,titlebar=no,toolbar=no,fullscreen=no';
	var myWindow = window.open(url, 'Solicitaçao Paternidade', specs);
	myWindow.focus();
}

/*
 * Abrir dialog de busca de CEP
 */
function abrirDialogCEP() {
	var url = MY_CONTEXT + '/pages/dialogSearchCEP.xhtml?dialogSearchCEP';
	return GB_showCenter('Buscar CEP', url, 300, 800);
}

/*
 * Funcao pegar formularios autorizados a alterar
 */
function pegarNomeFormularioParaAtualizar(frm) {

	theForms = frm.getElementsByTagName("form");
	var i;
	for (i = 0; i < theForms.length; i++) {
		if (theForms[i].name == 'pformCadastroAlteracao'
				|| theForms[i].name == 'formularioCadastroAlteracaoRenovacao'
				|| theForms[i].name == 'pformCadastroAlteracaoDefinitivaCnh'
				|| theForms[i].name == 'pformCadastroAlteracaoCnh'
				|| theForms[i].name == 'formularioIIRGDEdicao'
				|| theForms[i].name == 'formularioCadastrarRG'
				|| theForms[i].name == 'formularioCadastrarRGAcervo'
				|| theForms[i].name == 'formularioPrimeiraCnhResultado') {

			return theForms[i].name;
		}
	}
}

/*
 * Prenche dados do CEP
 */
function preencherCEP() {
	if (window.document.getElementById('dialogSearchCEP:logradouro').value == null) {
		alert('Nenhum logradouro foi encontrado!');
	} else {

		var nomeform = pegarNomeFormularioParaAtualizar(window.parent.parent.document);

		window.parent.parent.document.getElementById(nomeform + ':logradouro').value = window.document
				.getElementById('dialogSearchCEP:logradouro').value;
		// alert(window.parent.parent.document.getElementById(nomeform+':logradouro').value);
		window.parent.parent.document.getElementById(nomeform + ':bairro').value = window.document
				.getElementById('dialogSearchCEP:bairro').value;
		// alert(window.parent.parent.document.getElementById(nomeform+':bairro').value);
		window.parent.parent.document.getElementById(nomeform + ':complemento').value = window.document
				.getElementById('dialogSearchCEP:complemento').value;
		// alert(window.parent.parent.document.getElementById(nomeform+':complemento').value);
		window.parent.parent.document.getElementById(nomeform + ':municipio').value = window.document
				.getElementById('dialogSearchCEP:localidade').value;
		// alert(window.parent.parent.document.getElementById(nomeform+':municipio').value);
		window.parent.parent.document.getElementById(nomeform + ':cep').value = window.document
				.getElementById('dialogSearchCEP:cep').value;
		// alert(window.parent.parent.document.getElementById(nomeform+':cep').value);
		window.parent.parent.document.getElementById(nomeform + ':cep').focus();
		fecharDialogCEP();
	}
}

/*
 * limparCampos
 */
function limparCampos() {
	if (confirm("Deseja fechar a busca?")) {
		fecharDialogCEP();
	}

}

/*
 * Fechar dialog de busca de CEP
 */
function fecharDialogCEP() {
	parent.parent.GB_hide();
	parent.parent.showAjaxStatus(false);
}

/*
 * =============================================================================================
 * Faz a chamada de uma servlet no iframe de CallBack chamado iframe_cb, que
 * deve conter na pagina @param url: Url a ser chamada no Iframe @param
 * idImgWait: O ID da imagem a ser mostrada com waitLoad - OPCIONAL
 * ============================================================================================
 */
function callBack(url, idImgWait) {

	if (url == "undefined")
		url = "about:blank";
	if (idImgWait == 'undefinded') {
		this.idImgWaitToShow = null;
	} else {
		this.idImgWaitToShow = idImgWait;
	}

	// Mostra o Wait Load - SE HOUVER
	showWaitCallback(true);
	// CHAMADA DO CALLBACK NO I-FRAME
	window.document.getElementById('iframe_cb').src = url;

}

/*
 * =============================================================================================
 * Mostra a Imagem de WAIT qnd do CallBack - Se houver
 * ============================================================================================
 */
function showWaitCallback(flag) {
	// MOSTRA O WAIT
	var imgWait = window.document.getElementById(this.idImgWaitToShow);

	try {
		if (flag) {
			// imgWait.style.display='block';
			imgWait.style.visibility = 'visible';
		} else {
			// imgWait.style.display='none';
			imgWait.style.visibility = 'hidden';
		}
	} catch (e) {
	}
}

/*
 * ======================================================================================
 * Refresh de CEP
 * =======================================================================================
 */
function refreshCEPHere(cep, sufixo) {
	if (sufixo == null || sufixo == undefined) {
		sufixo = '';
	}

	if (cep.value != null && cep.value != '') {
		var url = MY_CONTEXT + '/searchEnderecoByCEP?cepBusca=' + cep.value
				+ '&sufixo=' + sufixo;
		// Faz a chamada do CallBack
		callBack(url, 'imgWaitCEP');

	}
}

/*
 * ======================================================================================
 * Set value
 * =======================================================================================
 */
function setValueParent(id, value) {
	obj = window.parent.document.getElementById(id);
	if (obj) {
		obj.value = value;
	}

}

/*
 * ======================================================================================
 * Set focus
 * =======================================================================================
 */
function setFocus(id) {
	obj = window.parent.document.getElementById(id);
	if (obj) {
		obj.focus();
	}

}

/*
 * ======================================================================================
 * Set focus Prime
 * =======================================================================================
 */
function setFocusData(id) {
	var nomeform = pegarNomeFormularioParaAtualizar(window.parent.parent.document);
	obj = window.parent.parent.document.getElementById(nomeform + ':' + id);
	if (obj) {
		obj.focus();
	}

}

function alterarFocus(campo) {
	document.getElementById(campo).focus();
}

function validaFocus(campo) {

	if (campo.value.length > 9) {

		document.getElementById('loginUser:senha').focus();
	}
}

function alterarRenachFocus(campo) {

	if (campo.value.length > 10) {

		document.getElementById('reimprimirRenach').focus();
	}
}

function exibeCampo(campo) {
	console.log(campo.value);
	/*if(campo.value == 3) {		
		//$("#pformAtendimento\\:responseJson").val(campo.value);
		document.getElementById('loginUser:usuario').style.display = 'none';
		document.getElementById('loginUser:usuarioMP').style.display = 'block';
		document.getElementById('loginUser:usuarioMP').focus();
	}else{
		document.getElementById('loginUser:usuario').style.display = 'block';
		document.getElementById('loginUser:usuarioMP').style.display = 'none';
		document.getElementById('loginUser:usuario').focus();
	}*/
}

function mostrarBotoes(frm) {
	if (this.isIEExplorer()) {
		document.getElementById('formSucessoFic:reeditarCadastro').style.display = 'inline';
		document.getElementById('formSucessoFic:finalizaProcesso').style.display = 'inline';

	} else if (this.isChromeExplorer) {
		document.getElementById('formSucessoFic:reeditarCadastro').style.display = 'inline';
		document.getElementById('formSucessoFic:finalizaProcesso').style.display = 'inline';
		document.getElementById('formSucessoFic:reeditarCadastro').style.visibility = 'visible';
		document.getElementById('formSucessoFic:finalizaProcesso').style.visibility = 'visible';
		document.getElementById('formSucessoFic').target = "_blank";
	} else {
		document.getElementById('formSucessoFic:reeditarCadastro').style.display = 'inline';
		document.getElementById('formSucessoFic:finalizaProcesso').style.display = 'inline';
		frm.target = '_blank';
	}
}

function isIEExplorer() {
	var isIntEx = null;
	isIntEx = (navigator.appName.indexOf("Microsoft") != -1) ? true : false;
	return isIntEx;
}

function isChromeExplorer() {
	var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	frm.target = '_blank';
	return is_chrome;
}

function obterDigito() {
	document.getElementById('pformPesquisa:atualizaDigito').click();
}

function setClick(campo) {
	document.getElementById(campo).click();
}

function LerBiometria(dedo) {
	try {
		$(document).ready(function() {
			$.ajax({
				cache : false,
				headers : {
					Accept : "application/json",
				},
				type : "GET",
				url : "http://localhost:3333/api/Biometria",
				timeout : 60000,
				success : function(msg) {
					var wsq = msg.wsq;
					$("#bioFormPesquisa\\:responseJson").val(wsq);
					$("#bioFormPesquisa\\:sendJson").click();
					showStatus();
				},
				error : function(msg) {
					$("#bioFormPesquisa\\:responseJson").val(msg.status);
					$("#bioFormPesquisa\\:sendJson").click();
					//showStatus();
					$.ajax({
						headers : {
							Accept : "application/json",
						},
						type : "DELETE",
						url : "http://localhost:3333/api/Biometria"
					});
				}
			});
		});
	} catch (err) {
	}
}

function showStatus(flag) {
	theDiv.style.display = 'block';
	theDivTransparente.style.visibility = 'visible';
	slowly.fadein('global');
	setTimeout("$('p[class=botao]').text('Em processamento.aguarde');", 50);
}

function LerAtendimento() {
	try {
	  $(document).ready(function() {
		   
		$.ajax({
			cache : false,
			headers : {
				Accept : "application/json",
			},
			type : "GET",
			url :  'http://localhost:3336/atendimento',
			timeout : 60000,
			success : function(dados) {
				var resp = JSON.stringify(dados);
				$("#pformAtendimento\\:responseJson").val(resp);
				$("#pformAtendimento\\:sendJson").click();
			},
			error : function(msg) {					
				$("#pformAtendimento\\:responseJson").val(msg.status);
				$("#pformAtendimento\\:sendJson").click();
			}
		});
	  });	
	} catch (err) {
	}
	
}
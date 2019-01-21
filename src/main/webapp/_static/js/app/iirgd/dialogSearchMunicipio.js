
/*
 * Abrir dialog de busca de munic�pio
 */
var sufixo = '';

function abrirDialogMunicipio(sufixoLocal) {
	if (sufixoLocal) {
		sufixo = sufixoLocal;
	} else {
		sufixo = '';
	}

	var url = '/poupa/pages/iirgd/dialogSearchMunicipio.xhtml';
	return GB_showCenter('Buscar Município', url, 430, 700);
}

function abrirDialogCep(sufixoLocal) {
	if (sufixoLocal) {
		sufixo = sufixoLocal;
	} else {
		sufixo = '';
	}

	var url = '/poupa/pages/iirgd/dialogSearchCepPorEndereco.xhtml';
	return GB_showCenter('Buscar Cep', url, 500, 680);
}

function fecharDialogoCep() {
	var sufixo = window.parent.parent.sufixo;
	var nomeform = pegarNomeFormularioParaAtualizar(window.parent.parent.document);
		
	cep = window.parent.parent.document.getElementById(nomeform + ':cep' + sufixo);
	logradouro = window.parent.parent.document.getElementById(nomeform + ':logradouro' + sufixo);
	bairro = window.parent.parent.document.getElementById(nomeform + ':bairro' + sufixo);
	complemento = window.parent.parent.document.getElementById(nomeform + ':complemento' + sufixo);
	numero = window.parent.parent.document.getElementById(nomeform + ':numero' + sufixo);
	
	if (cep) {
		cep.value = document.getElementById('formBuscaCep:cep').value;
	}
	if (logradouro) {
		logradouro.value = document.getElementById('formBuscaCep:logradouro').value;
	}
	if (bairro) {
		bairro.value = document.getElementById('formBuscaCep:bairro').value;

	}
	if (complemento) {
		complemento.value = document.getElementById('formBuscaCep:complemento').value;

	}
	if (numero) {
		numero.value = document.getElementById('formBuscaCep:num').value;
	}

	window.parent.parent.GB_hide();
	window.parent.parent.showAjaxStatus(false);
}

/*
 * Funcao pegar formularios autorizados a alterar
 */
function pegarNomeFormularioParaAtualizar(frm) {

	theForms = frm.getElementsByTagName("form");
	var i;
	for (i = 0; i < theForms.length; i++) {
		if (theForms[i].name == 'pformPesquisa'
				|| theForms[i].name == 'formularioIIRGDEdicao'
				|| theForms[i].name == 'formularioCadastrarRG'
				|| theForms[i].name == 'formularioCadastrarRGAcervo') {

			return theForms[i].name;
		}
	}
}

/*
 * Fechar dialog de busca de munic�pio
 */
function fecharDialogMunicipio(codMunicipioDialog, nomeMunicipioDialog) {
	var sufixo = window.parent.parent.sufixo;
	var nomeform = pegarNomeFormularioParaAtualizar(window.parent.parent.document);
	cod = window.parent.parent.document.getElementById(nomeform
			+ ':codMunicipio' + sufixo);
	nome = window.parent.parent.document.getElementById(nomeform
			+ ':nomeMunicipio' + sufixo);
	nomeHide = window.parent.parent.document.getElementById(nomeform
			+ ':nomeMunicipioHide' + sufixo);

	if (cod) {
		cod.value = document
				.getElementById('dialogSearchMunicipio:codigoFormatado').value;
	}

	if (nome) {
		if (document.all) {
			nome.innerText = document
					.getElementById('dialogSearchMunicipio:nome').value;
		} else {
			nome.textContent = document
					.getElementById('dialogSearchMunicipio:nome').value;
		}
	}

	if (nomeHide) {
		nomeHide.value = document.getElementById('dialogSearchMunicipio:nome').value;
	}
	window.parent.parent.GB_hide();
	window.parent.parent.showAjaxStatus(false);
}

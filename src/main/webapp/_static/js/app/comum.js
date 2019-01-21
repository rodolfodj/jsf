/* 
#  Description : Funcoes Comums a todas a p�ginas do Cadastro de Candidato
#  Dependencia : comum.js, CalendarPopup.js
*/

/*======================================================================================
CONSTANTES PARA TODAS AS JSs
=======================================================================================*/
var BACKSPACE = 8;  //keyCode
var TAB = 9;        //KeyCode
var ENTER = 13;     //KeyCode
var PAGE_UP = 33;   //keyCode
var PAGE_DOWN = 34; //keyCode
var END = 35;       //keyCode
var HOME = 36;      //keyCode
var LEFT = 37;      //keyCode
var UP = 38;        //keyCode
var RIGHT = 39;     //keyCode
var DOWN = 40;      //keyCode
var INS = 45;       //keyCode
var DEL = 46;       //keyCode

// Teclas pertidas em um TEXTAREA preenchido de acordo com a fun��o textArea_MaxLength()
var TECLAS_PERMITIDAS = [BACKSPACE, PAGE_UP, PAGE_DOWN, END, HOME, LEFT, UP, RIGHT, DOWN, DEL, INS];

//Variaveis para Quebra de Matrizes E SEPARADOR PADR�O
var ESCAPE = String.fromCharCode(8225); //135
var BREAKLINE = String.fromCharCode(8224); //134

//Nao funciona pela api do Mozilla
var ESCAPE_AJAX = String.fromCharCode(248); //"�"; //248
var BREAKLINE_AJAX = String.fromCharCode(222); //"�"; //222


/*=============================================================================================
Identifica��o de browser 
*============================================================================================*/
var isNav4, isNav, isIE;
 	if (parseInt(navigator.appVersion.charAt(0)) >= 4) { 
		isNav = (navigator.appName=="Netscape") ? true : false; 
		isIE = (navigator.appName.indexOf("Microsoft") != -1) ? true : false;
 	} 
	if (navigator.appName=="Netscape") {
 		isNav4 = (parseInt(navigator.appVersion.charAt(0))==4);
 	 }
 	 
/*=============================================================================================
Retorna a Data do Cliente no formato dd/MM/yyyy - COMO STRING
*============================================================================================*/
function getDateNow(){	
	var data = new Date();	
	return getStringDate(data);	
}

/*======================================================================================
Devolve a Hora do Cliente formatada como HH:mm - COMO STRING
=======================================================================================*/
function getTimeNow(){	
	var now = new Date();
	var hour = now.getHours();
	var min = now.getMinutes();
	if(hour <= 9) hour = '0'+hour;
	if(min <=9 ) min = '0'+min;
	return hour + ":" + min;	
}

/*======================================================================================
Devolve a Data como String no formato dd/MM/yyyy
=======================================================================================*/
function getStringDate(dataToFormat){	
	dia = dataToFormat.getDate();
	mes = dataToFormat.getMonth()+1;
	ano = dataToFormat.getFullYear();
	
	if (dia <=9) dia = '0' + dia;
	if (mes <=9) mes = '0' + mes;
	
	return dia + '/' + mes +  '/' + ano;
}

/*======================================================================================
Retorna numero de milesegundos de uma Data em String no formato
dd/MM/aaaa ou dd/MM/aaaa hh:mm
Syntax Date.UTC(year, month, day, hrs, min, sec)
=======================================================================================*/
function getTimeMillis(strDate){
	return  Date.UTC(strDate.substring(6,10),
					strDate.substring(3,5)-1,
					strDate.substring(0,2),
					(strDate.length > 11?strDate.substring(11,13):0),
					(strDate.length > 11?strDate.substring(14,16):0),0);	
}


/*=============================================================================================
Valida se a PRIMEIRA data passada est� DEPOIS do que a SEGUNDA
As DATAs devem estar no formato dd/MM/aaaa
Caso seja passado o parametro equalIsValid como true, retorna true se as datas forem iguais tamb�m.

@param data1 A primeira Data - OBRIGATORIO
@param data2 A segunda Data - OBRIGATORIO
@param equalIsValid - OPCIONAL (default=false)
*============================================================================================*/
function isDateAfter(data1, data2, equalIsValid){
	var equalToo = equalIsValid;
	var nargs=isDateAfter.arguments.length;
	if(nargs==2) equalToo = false; //testa opcional
	
	var utcData1 = getTimeMillis(data1);
	var utcData2 = getTimeMillis(data2);
	
	if(equalToo){
		return (utcData1 >= utcData2);
	}
	else{
		return (utcData1 > utcData2);
	}
}

/*=============================================================================================
Valida se a PRIMEIRA data passada est� ANTES do que a SEGUNDA
As DATAs devem estar no formato dd/MM/aaaa
Caso seja passado o parametro equalIsValid como true, retorna true se as datas forem iguais tamb�m.

@param data1 A primeira Data - OBRIGATORIO
@param data2 A segunda Data - OBRIGATORIO
@param equalIsValid - OPCIONAL (default=false)
*============================================================================================*/
function isDateBefore(data1, data2, equalIsValid){	
	var equalToo = equalIsValid;
	var nargs=isDateBefore.arguments.length;
	if(nargs==2) equalToo = false; //testa opcional
	
	var utcData1 = getTimeMillis(data1);
	var utcData2 = getTimeMillis(data2);
	
	if(equalToo){
		return (utcData1 <= utcData2);
	}
	else{
		return (utcData1 < utcData2);
	}
}

/*======================================================================================
Calcula um range de datas em dias
=======================================================================================*/
function calculateDateDifference(data1, data2) {
	var utcData1 = getTimeMillis(data1);
	var utcData2 = getTimeMillis(data2);
	var one_day=1000*60*60*24;

	return((utcData2-utcData1)/one_day);
}

/*======================================================================================
Verifica se uma DATA � v�lida
=======================================================================================*/
function isDateValue(s){
	//Verifica se � null
	if(isNull(s)) {
		return(false);
	}
	//Remove as barras
	s = removeStr(s,"/")
	
	var obj = new DateValidation(s);
	if(!isNumeric(s) || !obj.isDate()){
		return(false);
	}

	return(true);
}
 
/*=============================================================================================
Retorna um Elemento pelo Seu ID
*============================================================================================*/
function getById(o) {
	return document.getElementById(o);
} 
 	 
/*=============================================================================================
retorna o Tipo de Campo
*============================================================================================*/
function getInputType(input) {
	var type = undefined;
	
	if(input == null){
		type = undefined;
	}
	else if ( (input != null) && (input != undefined) && (input.nodeName != undefined) ) {	
		if ( (input.nodeName == "INPUT") || (input.nodeName == "SELECT") || (input.nodeName == "TEXTAREA") || (input.nodeName == "RADIO") ) {
			type = input.type;
		}
		else if ( (input.length > 0) && (input[0].nodeName == "INPUT") ) {
			type = input[0].type;
		}
	}
	else if ( (input.length > 0) && (input[0].nodeName == "INPUT") ) {
		type = input[0].type;
	}

	if ( type == undefined ) {
		type = undefined;
		//alert("comum.js. Par�metro [" + input.name + "] para getInputType, incorreto!");
	}
	return type;
}


/**=============================================================================
Habilita ou n�o todos os campos de detrminado form (com exce��o dos hidden).
*===============================================================================*/
function enableForm(form, enable) {	
//alert(form.name +":"+ enable);
	
    var elementos = form.elements;
     
    for(var i = 0; i < elementos.length; i ++) {
    	var typeEl = elementos[i].type;
    	if(typeEl == "hidden" || typeEl == "undefined" ) {
            continue;
        }
        else if (typeEl == "text" || typeEl == "textarea" 
        		 || typeEl == "select-one" || typeEl == "select-multiple" 
        		 || typeEl == "radio" || typeEl == "checkbox" ){
        	elementos[i].disabled = !enable;
        }
    }
}

/**=============================================================================
Habilita ou n�o todos os campos de detrminado form (com exce��o dos hidden).
*===============================================================================*/
function readonlyForm(form, flag) {	
    var elementos = form.elements;
    for(var i = 0; i < elementos.length; i ++) {  
    	var typeEl = elementos[i].type;  	
        if(typeEl == "hidden") {
            continue;
        }
         else if (typeEl == "text" || typeEl == "textarea" 
        		 || typeEl == "select-one" || typeEl == "select-multiple" 
        		 || typeEl == "radio" || typeEl == "checkbox" ){
	        elementos[i].readonly = flag;		 
        }      
        
        if(typeEl == "radio"){
        	 elementos[i].disabled = flag;
        }
    }
}


/*=============================================================================================
Verifica se o Campo esta preenchido ou selecionado
@param input campo a ser verificado
*============================================================================================*/
function isFilled(input) {
	var filled = false;
	var inputType = getInputType(input);
	
	if ( inputType == "hidden" ) {
		filled = input.value.length > 0;
	}
	
	else if ( inputType == "text" || inputType == "textarea") {
		filled = input.value.length > 0;
	}
	
	else if ( inputType == "select-one" ) {
		filled = input.selectedIndex > 0;
	}
	else if ( inputType == "select-multiple" ) {
		var count = 0;
		
		while ( (count < input.options.length) && (!input.options[count].selected) ) {
			count++;
		}
		
		filled = (count < input.options.length );
	}
	else if ( inputType == "radio" ) {;
		// Se for um radio �nico
		if ( input.length == undefined ) {
			filled = input.checked;
		}
		else {
			var count = 0;
			
			while ( (count < input.length) && (!input[count].checked) ) {
				count++;
			}
			filled = (count < input.length );
		}
		
	}
	else if ( inputType == "checkbox" ) {
		if ( input.length == undefined ) {
			filled = input.checked;
		}
		else {
			var count = 0;
			
			while ( (count < input.length) && (!input[count].checked) ) {
				count++;
			}
			filled = (count < input.length );
		}
	}

	return filled;
}

/*=============================================================================================
retorna o valor de um campo de qq tipo
*============================================================================================*/
function getValue(input) {
	var value = "Uncatch";
	var inputType = getInputType(input);
	
	if ( inputType == "hidden" ) {
		value = input.value;
	}
	
	else if ( inputType == "text" || inputType == "textarea" ) {
		value = input.value;
	}
	
	else if ( inputType == "select-one" ) {
		if(input.selectedIndex < 0) return null;
		value = input.options[input.selectedIndex].value;
	}
	else if ( inputType == "select-multiple" ) {
		value = "";
		var arrayValue = new Array();
		for (var countOptions = 0, countArray = 0; countOptions < input.options.length; countOptions++) {
			if (input.options[countOptions].selected) {
				arrayValue[countArray++] = input.options[countOptions].value;
			}
		}
		value = arrayValue;
	}
	else if ( inputType == "radio" ) {;
		// Se for um radio �nico
		if ( input.length == undefined ) {
			if ( input.checked ) {
				value = input.value;
			}
			else {
				value = "";
			}
		}
		else {
			var arrayValue = new Array();
			var countRadio = 0;
			while ( (countRadio < input.length) && (!input[countRadio].checked) ) {
				countRadio++;
			}
			
			if ( countRadio < input.length ) {
				value = input[countRadio].value;
			}
			else {
				value = "";
			}
		}
		
	}
	else if ( inputType == "checkbox" ) {		
		if ( input.length == undefined ) {
			if ( input.checked ) {
				value = input.value;
			}
			else {
				value = "";
			}
		}
		else {
			value = "";
			var arrayValue = new Array();
			for (var count = 0, countArray = 0; count < input.length; count++) {
				if (input[count].checked) {
					arrayValue[countArray++] = input[count].value;
				}
			}
			value = arrayValue;
		}
	}

	return value;
}

/*=============================================================================================
seta o valor de um campo de qq tipo
*============================================================================================*/
function setInput(input, value, text) {
	var inputType = getInputType(input);
	
	if ( inputType == "hidden" ) {
		input.value = value;
		if ( text == undefined ) {
			input.text = text;
		}
	}
	else if ( inputType == "text" || inputType == "textarea" ) {
		input.value = value;
		if ( text == undefined ) {
			input.text = text;
		}
	}
	else if ( inputType == "select-one" ) {
		var itSelectedIndex = -1;
		for (var itOption = 0; (itSelectedIndex == -1) && (itOption < input.options.length); itOption++) {
			if ( value == input.options[itOption].value ) {
				itSelectedIndex = itOption;
			}
		}
		
		if ( itSelectedIndex > -1 ) {
			input.selectedIndex = itSelectedIndex;
		}
	}
	else if ( inputType == "select-multiple" ) {
	}
	else if ( inputType == "radio" ) {;
		if ( input.length == undefined ) {
			input.checked = (input.value == value);
		}
	}
	else if ( inputType == "checkbox" ) {
		if ( input.length == undefined ) {
			input.checked = (input.value == value);
		}
	}
}

/*=============================================================================================
Verifica se todos os campos estao preenchidos
*============================================================================================*/
function allFilled(elements) {
	if (elements.length != undefined) {
		for (var it = 0; it < elements.length; it++) {
			if (!isFilled(elements[it]))
				return false;
		}
		return true;
	}
	return false;
}

/*=============================================================================================
Verifica se pelo menos UM campo est� preenchido
@param elements Elementos de um form (Form.elements)
@param verifyHidden Indica se os campos hidden devem ser verificados. por defaulr � false
*============================================================================================*/
function oneIsFilled(elements, verifyHidden) {
	if (elements.length != undefined) {
		for (var it = 0; it < elements.length; it++) {
			if((elements[it].type == "hidden") && !verifyHidden) {
				continue;
			}
			if (isFilled(elements[it], verifyHidden))
				return true;
		}
		return false;
	}
	return false;
}


/*=============================================================================================
Verifica se um objeto de formulario � do tipo select
@param obj: objeto a ser verificado
*============================================================================================*/
function isSelect(obj){
	return /^(select-one|select-multiple)$/.test(obj.type);
}

/*======================================================================================
Verifica se um VALOR de campo � NULL
=======================================================================================*/
function isNull(s){
	var c;s=String(s);
	
	if(!s || s.length==0)return true;
	if(s == "null") return true;
	else{		
		for(i=0;i<s.length;i++){
			c=s.charAt(i);		
			if(c!='\r'&&c!='\n'&&c!=' '&&c!='\t'&&c!='\0')return false;//&&c!='\a'
		}
		return true;
	}
}

/*======================================================================================
Retorna o tamanho de um String
=======================================================================================*/
function getLength(s){
	var s=String(s);	
	if(!s) return 0;	
	return s.length;
}

/*======================================================================================
Retorna o valor de um campo do Tipo RADIO
=======================================================================================*/
function getRadioValue(obj){
	if(obj==null || obj=='undefined') return "";
	if(!obj.length){ //Single Radio
		if(obj.checked)	return obj.value;
		else return "";
	}
	for(var i=0;i<obj.length;i++)if(obj[i].checked)return obj[i].value;
	return "";
}

/*======================================================================================
Reseta um campo do tipo RADIO
=======================================================================================*/
function resetRadio(obj){
 for(var i=0;i<obj.length;i++){
  obj[i].checked = false;
 }
}

/*======================================================================================
Habilita ou Desabilita um campo do tipo RADIO
@param obj Objeto que presumivelmente � um radio
@param flag indica se � para desabilitar ou n�o.
=======================================================================================*/
function lockRadio(obj, flag){
 for(var i=0;i<obj.length;i++){
  obj[i].disabled = flag;
  obj[i].readonly = flag;
 } 
}

/*======================================================================================
Checa um campo RADIO passando um valor
=======================================================================================*/
function chkRadio(obj, valueToChk){
 for(var i=0;i<obj.length;i++){
  if(obj[i].value == valueToChk){
   obj[i].checked = true;
  }
  else{
   obj[i].checked = false;
  }
 }
}

/*======================================================================================
Checa um campo SELECT passando um valor
=======================================================================================*/
function chkSelect(obj, valueToChk){
 var success = false;
 for(var i=0; i <obj.length;i++){   
  if(obj.options[i].value == valueToChk){     
   obj.selectedIndex = i;
   success = true;
   break;  }        
 } 
 return success;
 }

/*======================================================================================
Checa um campo SELECT passando o Texto dele
=======================================================================================*/
function chkSelectByText(obj, textToChk){
 var success = false;
 for(var i=0; i <obj.length;i++){   
  if(obj.options[i].text == textToChk){     
   obj.selectedIndex = i;
   success = true;
   break;
  }        
 } 
 return success;
}

/*======================================================================================
Checa um campo SELECT passando a posi��o dele
=======================================================================================*/
function chkSelectByPosition(obj, positionToChk){
   obj.selectedIndex = i;
}

/*======================================================================================
Checa um campo CHECK_BOX passando o Valor
Se coincidir ele seleciona ou nao
=======================================================================================*/
function setCheckBoxByValue(obj, valueToChk, flag){
 var success = false;
 for(var i=0; i <obj.length;i++){ 
	if(obj[i].value == valueToChk){     
  		obj[i].checked = flag;
   		success = true;
   		break;
  	}	        
 } 
 return success;
}

/*======================================================================================
 fun��o que tira todos os "0", "," e "." da string passada como argumento 
 Source: Unibanco.com
=======================================================================================*/
function tirarZerosEsquerda(STR){ 
var sAux = ''; 
STR = new String(STR);
 var i = 0; 
	while (i < STR.length ){ 
		if ((STR.charAt(i)!='.') && (STR.charAt(i)!=',')){
			 sAux += STR.charAt(i);
	 	}
		i++ 
	} 
STR = new String(sAux); sAux = ''; 
i = 0;
 	while (i < STR.length ){ 
		if (STR.charAt(i) != '0'){
			 sAux = STR.substring(i,STR.length);
			 i = STR.length; 
		}
		i++; 
	} 
return sAux; 
}

/*======================================================================================
 Formata uma string no padr�o de valor: xx.xxx.xxx,xx 
 Source: Unibanco.com
=======================================================================================*/
function formatarValor(obj){

var valor = obj.value;

var decimal,inteiro;
var i,count; 
STR = new String(valor);
STR = tirarZerosEsquerda(STR);
inteiro='';
	if (STR.length == 1){ 
 		inteiro = '0'; decimal = '0' + STR;
 	} 
 	else {
		 if (STR.length == 2){ 
		 	inteiro = '0'; 
		 	decimal = STR; 
		 } 
		 else{ 
				decimal = STR.substring(STR.length-2,STR.length); 
		 		i=3; 
		 		count=0; 
		 		while (i<=STR.length){ 
		 			if (count==3) { 
		 				inteiro = '.' + inteiro; 
		 				count = 0; 
		 			} 
		 			inteiro = STR.charAt(STR.length-i) + inteiro; 
		 			count++; 
		 			i++; 
		 		} 
		 } 
	} if (inteiro == '') { 
		inteiro = '0'; 
	} if (decimal == '') {
		decimal = '00'; 
	}
//return inteiro+','+decimal; 
obj.value = inteiro+','+decimal;
} 


/* ----------------------------------------------------------------------------------------------- 
capturaCodTecla - 
Fun��o encarregada obter a tecla digitada pelo usu�rio apresentando comportamento distinto para o netScape e IE. 
Autor: - Antonio Carlos data - 27/06/02
-----------------------------------------------------*/ 
function capturaCodTecla(e){ 
	var codTecla = (isIE) ? event.keyCode : e.which;
	return codTecla;
}

/**=============================================================================
Max Lenght para um TextArea.

Mode de usar:                                                 
<textarea onkeypress="return textArea_MaxLength(this,10,event);">
</textarea>

@param el Elemento TEXTAREA
@param maxlength Tamanho m�ximo 
@param evento de teclado (keyEvent) 
================================================================================*/
function textArea_MaxLength(el,maxlength,event) {
	var tecla = event.keyCode || event.which;
	if(arrayContains(TECLAS_PERMITIDAS, tecla)) {
        return true;
    }
    
	// Desconsidera as quebras de linha
	var bInsert = ((alisar(el.value).length + 1) <= maxlength);
	event.returnValue=bInsert;
	return bInsert; 
}

/*======================================================================================
Faz a movimentacao dos Options de um Select para outro
@param obj o Select origem - OBRIGATORIO
@param selectToMove o Select a receber os Options - OBRIGATORIO
@param validateDuplicado - OPCIONAL - Se ira validar a entrada de campos Duplicados - default false.
@param showMsg - OPCIONAL - Se ira mostrar a msg se duplicado - default false.
@param valueToKeep - OPCIONAL - Se checa por um valor para manter nos Options.
	este parametro DEPENDE DO PARAMETRO validateDuplicado = true
=======================================================================================*/
function moveOptions(obj, selectToMove, validateDuplicado, showMsg, valueToKeep){

	var chkDuplicado = validateDuplicado;
	var nargs=moveOptions.arguments.length;
	if(nargs==2) {chkDuplicado = false; showMsg = false; valueToKeep = null;} //testa opcional
	
	//CONSISTENCIA
	if(obj==null || selectToMove==null ) return;
	if(obj=='undefined' | selectToMove=='undefined' ) return;	
	var index = obj.selectedIndex;
	if(index < 0) return; //nao selecionou nada
	
	var movimenta = true;
	
	//MULTIPLO
	for(y=0; y < obj.length; y++){
		var optHere = obj.options[y];
		
		movimenta = true;
		
		if(optHere.selected==true){	
			//VALIDA SE CHKDUPLICADO
			if(chkDuplicado){
				for(z=0; z < selectToMove.length; z++){
					var toTeste = selectToMove.options[z];
					if(toTeste.value == optHere.value){	
						movimenta = false				
						if(showMsg){
							alert('A op��o: '+optHere.text+' j� foi selecionada ao lado, por favor verifique.');
						}
					}
				}
				
				//VALIDA SE FOI PASSADO UM VALOR PARA CHECAR SE NAO MOVE
				if(valueToKeep!=null){
					if(optHere.value == valueToKeep){//vai manter
						movimenta = false
						optHere.selected = false; //Para nao Retirar
						alert('A op��o: '+optHere.text+' n�o pode ser retirada!');						 						
					}
				}
			}	
			
			//MOVIMENTA ??
			if(movimenta){
				var actualSize =  selectToMove.length;
				selectToMove.length = actualSize+1;	
				selectToMove.options[selectToMove.length-1] = new Option(optHere.text,optHere.value);
				
				//copia o TITLE
				selectToMove.options[selectToMove.length - 1].title = optHere.title
			}
		}
	}//end for
	
	//RETIRA OS SELECIONADOS - Inclusive os repetidos no destino
	deleteOpt(obj);
}

/*======================================================================================
Deleta as Opcoes Selcionadas do Select passado - USO DE RECURSAO
@param obj o Select a ser retirados os Options Selecionados
=======================================================================================*/
function deleteOpt(obj){
	for(y=0; y < obj.length; y++){
		var optHere = obj.options[y];
		if(optHere.selected==true){
			obj.options[y] = null;
			deleteOpt(obj);
		}		
	}
}

/*======================================================================================
Deleta as Opcoes do Select objOptionsToBeDeleted que est�o tamb�m contidas no 
Select objOptionsReference 
@param objOptionsToBeDeleted Select contendo as Op��es a serem deletadas
@param objOptionsToDelete Select contendo as Op��es de referencia que ser�o deletadas
=======================================================================================*/
function deleteOptionsOnOptionsRef(objOptionsToBeDeleted, objOptionsReference) {
	// verifica todas as Op��es dadas como refer�ncia para dele��o 
	for (y=0; y < objOptionsReference.length; y++){
		var toTest = objOptionsReference.options[y];
		
		for (z=0; z < objOptionsToBeDeleted.length; z++){
			var toDelete = objOptionsToBeDeleted.options[z];
			if (toDelete.value == toTest.value){
				objOptionsToBeDeleted.remove(z);
			}
		}
	}	
}

/*======================================================================================
Valida se o Valor passado j� existe dentro de um Objeto Select

@param obj o Select a ser Percorrido
@pram valor o Valor a ser verificado
=======================================================================================*/
function existInSelect(obj, valor){	
	for(y=0; y < obj.length; y++){
		var optHere = obj.options[y];
		if(optHere.value == valor){
			return true;
		}
	}
	return false;
}


/**=============================================================================
DAdo um Select muito Longo, faz com que o title dele seja igual ao valor 
exibido.

@param select Elemento Select a ser manipulado.
================================================================================*/
function exibeNomeSelect(select) {
	var valor = select.options[select.selectedIndex].title;
	if(isNull(valor))
		valor = select.options[select.selectedIndex].text;
	select.title = valor;
}

/**============================================================================
Verifica se o Array em quest�o cont�m determinado elemento.
    
@param obj Objeto a ter sua presen�a verificada dentro deste array.
===============================================================================*/
function arrayContains(array, obj) {
    for(var i = 0; i < array.length; i ++) {
        if(obj == array[i]) {
            return true;
        }
    }

    return false;
}

/**============================================================================
Remove os caracteres de nova linha (\n), Carriage Return (\r) e Form Feed (\f) 
de uma String.

@param str String a ser processada.
===============================================================================*/
function alisar(str) {
    return str.replace(/(\n|\r|\f)/g, "");
}

/*======================================================================================
Mod
=======================================================================================*/
function mod(dividendo,divisor) {
	return Math.round(dividendo - (Math.floor(dividendo/divisor)*divisor));
}


/*
 * ============================================================================
 * Da foco no primeiro campo encontrado de um FORM
 * 
 * @param theForm o Form a procurar o campo
 * ===============================================================================
 */
function focusOnFirst(theForm) {
	var elementos = theForm.elements;
	
	for ( var i = 0; i < elementos.length; i++) {
		if (document.forms[0].elements[i].type != "hidden"
				&& document.forms[0].elements[i].type != "button"
					&& document.forms[0].elements[i].type != undefined & document.forms[0].elements[i].readOnly == false ) {
			try{				
				document.forms[0].elements[i].focus();
			}catch(e){}
			break;
		}
	}	
}
 
 /*
  * ============================================================================
  * Ordena uma lista (select multiple)
  * 
  * @param selElem lista a ser ordenada
  * ===============================================================================
  */

  function sortSelect(selElem) {
      var tmpAry = new Array();
      for (var i=0;i<selElem.options.length;i++) {
              tmpAry[i] = new Array();
              tmpAry[i][0] = selElem.options[i].text;
              tmpAry[i][1] = selElem.options[i].value;
      }
      tmpAry.sort();
      while (selElem.options.length > 0) {
          selElem.options[0] = null;
      }
      for (var i=0;i<tmpAry.length;i++) {
              var op = new Option(tmpAry[i][0], tmpAry[i][1]);
              selElem.options[i] = op;
      }
      return;
}

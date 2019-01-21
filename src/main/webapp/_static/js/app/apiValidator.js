
// Exemplo de uso:
// new CPF("xxx.xxx.xxx-xx").isValid()
// new CPF("xxxxxxxxxxx").isValid()
// new CNPJ("62.691.043/0006-22").isValid()
// new CNPJ("62691043000622").isValid()
// new CEP("24210-510").isValid();
// new CEP("24.210-510").isValid();
// new CEP("24210510").isValid();
// new StringDate("29/02/2004").isValid();
// new StringDate("29-02-2004","-").isValid();
// new Email("larbac@uol.com.br").isValid();

/*///////////////////////////////////////////////////
 //Objetivo: valida um CPF, nao aceita cpf de tipo: //
 //  111.111.111-11, 222.222.222-22 ...             //
 ///////////////////////////////////////////////////*/
function CPF() {
   this.format='999.999.999-99';
   this.temp='';
   this.numero=null;
   this.dv=null;
   this.getNumero=function() {return (this.numero)}
   this.getDV=function() 
   {
      if ((this.dv==null)&&(!this.malFormed())) return (this.geraDV());
	  if (this.isValid()) return (this.dv);
      return (null)
   }
   if (arguments.length==1) this.temp=arguments[0];

   this.toString=function()
   {
      if (this.isValid()) return (((this.numero)+(this.dv)).format(this.format));
	  return null;
   }
   this.geraDV=function()
   {
      // Gerando o dv do CPF
      var iDV=new Array(2);
      var iIdx=0,iMul=2,iSoma=0,i;
	  
	  while (iIdx < 2) 
	  {
         for (i=(this.numero).length-1;i>=0;i--) 
		 {
            iSoma = parseInt((this.numero).charAt(i),10) * iMul + iSoma;
	        iMul++;
         }	
         iResto = iSoma % 11;
         if ((iResto==0)||(iResto==1)) 
		    iDV[iIdx] = 0;
         else
            iDV[iIdx] = (11 - iResto);

         if (iIdx == 0) 
		 {
            iSoma = iDV[iIdx] * 2;
            iMul = 3;
	     }
         iIdx++;
      }
	  return (String(iDV[0])+String(iDV[1]));
   }
   this.malFormed=function()
   {
      var temp='';
	  // Validações básicas
      if (!(this.temp).allow("./-0123456789"))
         return true;
		 
      temp = (this.temp).translate("./-","");

	  if ((temp.length!=11)&&(temp.length!=9))
         return true;
      
	  this.numero = temp.substring(0,9);
	  this.dv = temp.substring(9,11);
	  return false;	 
   }
   this.isValid=function()
   {
      var i;
      if (this.malFormed()) return false;
	  // Validações complexas - Não aceitar cpfs do tipo 111.111.111-11, 222.222.222-22 ...
      for(i=0;i<10;i++)
	     if (this.numero==String(i).repeteCaracter(9))
	        return false;   	
	  
	  if (this.geraDV()!=this.dv) return false;
	  return true;
   }
}

/*///////////////////////////////////////////////////
 //Objetivo: valida um CNPJ, nao aceita de tipo: //
 //  111.111.111-11, 222.222.222-22 ...             //
 ///////////////////////////////////////////////////*/
function CNPJ()
{
   this.format='99.999.999/9999-99';
   this.temp='';
   this.numero=null;
   this.dv=null;
   this.getNumero=function() {return (this.numero)}
   this.getDV=function()
   {
      if ((this.dv==null)&&(!this.malFormed())) return (this.geraDV());
	  if (this.isValid()) return (this.dv);
      return (null)
   }
   if (arguments.length==1) this.temp=arguments[0];

   this.toString=function()
   {
      if (this.isValid()) return (((this.numero)+(this.dv)).format(this.format));
	  return null;
   }
   this.geraDV=function()
   {
      // Gerando o dv do CPF
      var iDV=new Array(2);
      var iIdx=0,iMul=2,iSoma=0,i;
	  var cnpj = this.numero;
	  
      while (iIdx < 2) 
	  {
         iMul = 2;
         iSoma = 0;
        
         for (i=cnpj.length-1;i>=0;i--) 
		 {
            if (iMul == 10) 
			   iMul = 2;
            iSoma = parseInt(cnpj.charAt(i),10) * iMul + iSoma;
            iMul++;
         }
		 
         iResto = iSoma % 11;
         if ((iResto == 1) || (iResto == 0))
            iDV[iIdx] = 0;
         else
            iDV[iIdx] = 11 - iResto;
         if (iIdx == 0)
		    cnpj = "" + cnpj + iDV[0];
         iIdx = iIdx + 1
      }
	  return (String(iDV[0])+String(iDV[1]));
   }
   this.malFormed=function()
   {
      var temp='';
	  // Validações básicas
      if (!(this.temp).allow("./-0123456789"))
         return true;
		 
      temp = (this.temp).translate("./-","");

	  if ((temp.length!=14)&&(temp.length!=12))
         return true;

	  this.numero = temp.substring(0,12);
	  this.dv = temp.substring(12,14);
	  return false;	 
   }
   this.isValid=function()
   {
      if (this.malFormed()) return false;
	  
	  // Validações complexas - Não aceitar cnpj 00.000.000/0000-00
      if (this.numero=="0".repeteCaracter(12))
	     return false;   	
	 
	  if (this.geraDV()!=this.dv) return false;
	  return true;
   }
}

/*///////////////////////////////////////////////////
 //Objetivo: valida um CEP 							//
 ///////////////////////////////////////////////////*/
function CEP(){
   this.format='99999-999';
   this.temp='';
   this.valor=null;
   if (arguments.length==1) this.temp=arguments[0];

   this.toString=function()
   {
		if (this.isValid()) return ((this.valor).format(this.format));
	  	return null;
   }
   this.malFormed=function()
   {
  		this.valor = (this.temp).translate(".-",""); 	
  		if (this.valor.length!=8)
     		return (true);
  		return (!this.valor.allow("0123456789"));
   }
   this.isValid=function()
   {
      if (this.malFormed()) return false;
	   return true;
   }
}




 /*
 ///////////////////////////////////////////////////////////////////
 //Objetivo: Classe - Verificar se uma data fornecida é valida.   //
 //          checa se a data é valida, retornando true para valida//
 //          ou false para inválida.                              //
 ///////////////////////////////////////////////////////////////////
 */
 function StringDate() {
   this.delimitador='/';
   if (arguments.length==2) this.delimitador=arguments[1];
   this.format='99'+this.delimitador+'99'+this.delimitador+'9999';
   this.temp='';
   this.valor=null;
   if (arguments.length>=1) this.temp=arguments[0];

   this.toString=function()
   {
		if (this.isValid()) return ((this.valor).format(this.format));
	  	return null;
   }
   this.setValor=function(v)
   {
	   this.temp=v;
   }
   this.setDelimitador=function(d)
   {
	   this.delimitador=d;
   	this.format='99'+this.delimitador+'99'+this.delimitador+'9999';
   }
   this.malFormed=function()
   {
 		var iDia,iMes,iAno;
 		var alfa;
 		var pos=new Array();
 		var j=0;

 		for (i=0;i<(this.temp).length;i++)
 		{	
    		alfa=(this.temp).charAt(i);
    		if (alfa==this.delimitador) pos[j++]=i;
 		}	
 
 		if (pos.length!=2) 
 			return true;

 		iDia = (this.temp).substring(0, pos[0]);   // Dia
 		iMes = (this.temp).substring(pos[0]+1, pos[1]);   // Mes
 		iAno = (this.temp).substring(pos[1]+1);  // Ano

 		//Checando erros basicos
 		if ((isNaN(iDia))||(isNaN(iMes))||(isNaN(iAno))) 
 			return true;

 		if (iMes<1 || iMes>12) 
 			return true;
 		if (iDia<1 || iDia>31) 
 			return true;
 		if (iAno<0 || iAno>2999) 
 			return true;
	
 		//Checando Erros avançados
 		// Meses com 30 dias
 		if (iMes==4 || iMes==6 || iMes==9 || iMes==11)
 		{
    		if (iDia==31) 
    			return true;
 		}

 		// Fevereiro e Ano bissexto
 		if (iMes==2)
 		{
    		if (iDia>29) 
    			return true;
    		if (iDia==29)
    		{
       		if (iAno%4==0)
       		{
         		if ((iAno%100==0)&&(iAno%400!=0)) 
         			return true;
       		}
       		else
          		return true;
    		}
 		}
  		this.valor = (this.temp).translate(this.delimitador,""); 	
 		return false;
   }
   this.isValid=function()
   {
      if (this.malFormed()) return false;
	   return true;
   }
}


 /*
 ///////////////////////////////////////////////////////////////////
 //
 //Objetivo: Classe - Verificar se uma data fornecida é valida.   //
 //Data de criação (como classe): 21/07/2005                      //
 //Objetivo: checa se a data é valida, retornando true para valida//
 //          e false para inválida.                               //
 // Modo de uso: new StringDate("02-2004","-").isValid(); ou   //
 //              new StringDate("02/2004").isValid();          // 
 ///////////////////////////////////////////////////////////////////
 */ 
function StringDateMesAno() {
   this.delimitador='/';
   if (arguments.length==2) this.delimitador=arguments[1];
   this.format='99'+this.delimitador+'9999';
   this.temp='';
   this.valor=null;
   if (arguments.length>=1) this.temp=arguments[0];

   this.toString=function()
   {
		if (this.isValid()) return ((this.valor).format(this.format));
	  	return null;
   }
   this.setValor=function(v)
   {
	   this.temp=v;
   }
   this.setDelimitador=function(d)
   {
	   this.delimitador=d;
   	this.format='99'+this.delimitador+'9999';
   }
   this.malFormed=function()
   {
 		var iMes,iAno;
 		var alfa;
 		var pos=new Array();
 		var j=0;

 		for (i=0;i<(this.temp).length;i++)
 		{	
    		alfa=(this.temp).charAt(i);
    		if (alfa==this.delimitador) pos[j++]=i;
 		}	
 
 		if (pos.length!=1) 
 			return true;

 		iMes = (this.temp).substring(0, pos[0]);   // Mes
 		iAno = (this.temp).substring(pos[0]+1);   // Ano
 		

 		//Checando erros basicos
 		if ((isNaN(iMes))||(isNaN(iAno))) 
 			return true;

 		if (iMes<1 || iMes>12) 
 			return true;

 		if (iAno<0 || iAno>2999) 
 			return true;
	
 		this.valor = (this.temp).translate(this.delimitador,""); 	
 		return false;
   }
   this.isValid=function()
   {
      if (this.malFormed()) return false;
	   return true;
   }
}


/*
/////////////////////////////////////////////////////////////////
/// Objetivo: Checa se o email passado é válida.Espera receber///
///   uma string e retorna true se válida ou false se não.    ///
/////////////////////////////////////////////////////////////////
*/
function Email() {
   this.valor=null;
   if (arguments.length>=1)
   	this.valor=arguments[0];

   this.toString=function()
   {
		if (this.isValid()) return (this.valor);
	  	return null;
   }
   this.setValor=function(v)
   {
	   this.valor=v;
   }
   this.malFormed=function()
   {
   	var arroba = (this.valor).indexOf('@');
   	var ponto = (this.valor).lastIndexOf('.');
   	var strAux;

   	// O '@' esta na posicao zero ou não existe
   	if (arroba<1)
      	return true;
      	
      // Não deve possui mais de uma '@'.
  		if ((this.valor).translate("@","").length+1!=this.valor.length)
  			return true; 	

   	// Não deve existir aspas, aspas simples e espaço
  		if ((this.valor).translate("\'\" ","").length!=this.valor.length)
  			return true; 	

  		// A primeira ocorrência do '.' depois da arroba nao deve ser imediatamente posterior
   	strAux=(this.valor).substring(arroba,(this.valor).length);

   	if (strAux.indexOf('.')+arroba<=(arroba+1))
      	return true;

   	// Não deve terminar um email com ponto
   	if ((this.valor).length-1==ponto)
      	return true;
 
 		return false;
   }
   this.isValid=function()
   {
      if (this.malFormed()) return false;
	   return true;
   }
}

   /*
   /////////////////////////////////////////////////////////////////
   /// Criador: André Moraes                      ///
   /// Data de Criação: 28/07/2005                               ///
   /// Objetivo: Checa se a placa passada é válida.Espera receber///
   ///   uma string e retorna true se válida e false se não.     ///
   /////////////////////////////////////////////////////////////////
   */
function Placa() {  
   this.valor=null;
   if (arguments.length>=1)
   	this.valor=arguments[0];

   this.toString=function()
   {
		if (this.isValid()) return (this.valor);
	  	return null;
   }
   this.setValor=function(v)
   {
	   this.valor=v;
   }
   this.malFormed=function()
   {
   	var TAM_PLACA = 6;

   	var tamplaca = (((this.valor).length >= TAM_PLACA) || ((this.valor).length == TAM_PLACA + 1));
   	var strAux;

   	// Verifica o tamanho da placa
   	if (!tamplaca)
      	return true;
      	
    // Verifica se as iniciais da Placa são Letra
    return !(isNaN((this.valor).substring(0, 1)) && isNaN((this.valor).substring(1, 2)) && !isNaN((this.valor).substring(this.valor.length - 4, this.valor.length)));
    
   }
   this.isValid=function()
   {
      if (this.malFormed()) return false;
	   return true;
   }
}


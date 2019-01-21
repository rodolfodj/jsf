PrimeFaces.locales['pt'] = {
	closeText : 'Fechar',
	prevText : 'Anterior',
	nextText : 'Pr�ximo',
	currentText : 'Data Atual',
	monthNames : [ 'Janeiro', 'Fevereiro', 'Mar�o', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
	monthNamesShort : [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
	dayNames : [ 'Domingo', 'Segunda', 'Ter�a', 'Quarta', 'Quinta', 'Sexta', 'S�bado' ],
	dayNamesShort : [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'S�b' ],
	dayNamesMin : [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
	weekHeader : 'Semana',
	firstDay : 0,
	isRTL : false,
	showMonthAfterYear : false,
	yearSuffix : '',
	timeOnlyTitle : 'S� Horas',
	timeText : 'Tempo',
	hourText : 'Hora',
	minuteText : 'Minuto',
	secondText : 'Segundo',
	ampm : false,
	month : 'M�s',
	week : 'Semana',
	day : 'Dia',
	allDayText : 'Todo o Dia'
};

function noSunday(date) {
	var day = date.getDay();
	return [ (day > 0), '' ];
}

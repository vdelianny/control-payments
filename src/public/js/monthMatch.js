const monthMatch = function (month) {
	const monthsName = [
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre',
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto'
	];
    return monthsName[month - 1];
}

module.exports = monthMatch;
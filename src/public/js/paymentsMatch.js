const paymentsMatch = function (payments, number) {
	lastPayment = payments[payments.length - 1];

	//consulta si el último mes pagado es menor al mes que se quiere consultar, retorna true en caso de deuda

	/*
	Debe colocarse que sólo muestre los deudores si ha seleccionado la opción
	if (lastPayment.month < number) {
    	return true;
	}
	return false;
	*/

	return true;
}

module.exports = paymentsMatch;
const paymentsMatch = function (payments, number) {
	lastPayment = payments[payments.length - 1];

	//consulta si el último mes pagado es menor al mes que se quiere consultar, retorna true en caso de deuda

	if (lastPayment.month < number) {
    	return true;
	}
	return false;
}

module.exports = paymentsMatch;
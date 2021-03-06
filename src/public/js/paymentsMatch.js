const paymentsMatch = function (payments) {
	var number = new Date().getMonth()+5;

	lastPayment = payments.slice(-1);

	if (number == 0 || lastPayment.length < 1) {
		return true;
	} else {
		return lastPayment[0].month < number;
	}

	return false;
}

module.exports = paymentsMatch;
paymentsValidate = (month, payments) => {
	if (payments.length > 0) {
		const lastElement = payments[payments.length-1].month;
		if (lastElement + 1 == month) {
			return true;
		}
	} else {
		if (month == 1) {
			return true
		}
	}
	return false;
};

module.exports = paymentsValidate;
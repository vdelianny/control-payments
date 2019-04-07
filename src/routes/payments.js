const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Payment = require('../models/Payment');
const paymentsValidate = require('../helpers/paymentsValidate');


//routes get

router.get('/payments/:id/new-payment', async (req, res) => {
	const id = req.params.id;
	res.render('payments/new-payment', {id});
});


//routes post

router.post('/payments/:id/new-payment', async (req, res) => {
	const { month } = req.body;
	const student = await Student.findById(req.params.id);
	var newUrl = '/payments/' + req.params.id + '/new-payment';
	if (student) {
		const newPayment = new Payment({ month, student: req.params.id });
		const payments = await Payment.find({student: student._id});
		if (paymentsValidate(month, payments)) {
			await newPayment.save();
			req.flash('success_msg', 'Pago agregado satisfactoriamente');
			newUrl = '/students/details/' + req.params.id;
			res.redirect(newUrl);
		} else {
			req.flash('error', 'Pague el mes correspondiente');
			res.redirect(newUrl);
		}
	} else {
		req.flash('error', 'Se ha producido un error con el estudiante, intente nuevamente');
		res.redirect(newUrl);
	}
});


module.exports = router;
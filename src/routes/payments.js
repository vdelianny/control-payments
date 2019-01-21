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
	if (student) {
		const newPayment = new Payment({ month, student: req.params.id });
		const payments = await Payment.find({student: student._id});
		if (paymentsValidate(month, payments)) {
			await newPayment.save();
			req.flash('success_msg', 'pago agregado satisfactoriamente');
			res.redirect('/sections');
		} else {
			req.flash('error', 'pague el mes correspondiente');
			res.redirect('/sections');
		}
	} else {
		req.flash('error', 'se ha producido un error con el estudiante, intente nuevamente');
		const newUrl = '/payments/' + req.params.id + 'new-payment'; 
		res.redirect(newUrl);
	}
});


module.exports = router;
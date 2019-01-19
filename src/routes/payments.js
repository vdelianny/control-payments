const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Payment = require('../models/Payment');


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
		await newPayment.save();
		console.log(newPayment);
		req.flash('success_msg', 'pago agregado satisfactoriamente');
		res.redirect('/sections');
	} else {
		req.flash('error', 'se ha producido un error con el estudiante, intente nuevamente');
		const newUrl = '/payments/' + req.params.id + 'new-payment'; 
		res.redirect(newUrl);
	}
});


module.exports = router;
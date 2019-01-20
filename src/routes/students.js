const express = require('express');
const router = express.Router();
const Section = require('../models/Section');
const Student = require('../models/Student');
const Grade = require('../models/Grade');
const Payment = require('../models/Payment');

/*
	Hay que mandar las secciones por grado (depende del formato de la escuela).
*/

//routes get
router.get('/students/new-student', async (req, res) => {
	const grades = await Grade.find().sort({number: 1});
	res.render('students/new-student', { grades });
});

router.get('/students/details/:id', async (req, res) => {
	const student = await Student.findById(req.params.id);
	const payments = await Payment.find({student: req.params.id});
	console.log(payments);
	res.render('students/details-student', {student, payments});
});


//routes post
router.post('/students/new-student', async (req, res) => {
	const { name, surname, parent } = req.body;
	const grade = await Grade.findOne({number: req.body.grade});
	const section = await Section.findOne({ name: req.body.section, grade: grade._id });
	//falta validar que exista el grado/sección
	const newStudent = new Student({ name, surname, parent, section: section._id });
	await newStudent.save();
	req.flash('success_msg', 'estudiante agregada satisfactoriamente');
	res.redirect('/sections');
});


module.exports = router;
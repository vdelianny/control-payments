const express = require('express');
const router = express.Router();
const Section = require('../models/Section');
const Student = require('../models/Student');
const Grade = require('../models/Grade');
const Payment = require('../models/Payment');

const parse = require('csv-parse');
const fs = require('fs');
const inputFile = "./public/data.csv";

//routes get
router.get('/sections/new-section', async (req, res) => {
	const grades = await Grade.find().sort({number: 1});
	res.render('sections/new-section', { grades });
});

router.get('/test', async (req, res) => {

	var parser = parse({delimiter: ';'}, function (err, data) {
	    data.forEach(function(line) {
	      var student = { "ce" : line[0]
	                    , "surname" : line[1]
	                    , "name" : line[2]
	                    , "gender" : line[3]
	                    , "age" : line[4]
	                    , "birthdate" : line[5]
	                    , "birthplace" : line[6]
	                    , "parent" : line[7]
	                    , "phone" : line[8]
	                    , "section" : "5c3f5f5b31044416b895531e"
	                    };
	     console.log(student);
	    });    
	});

	fs.createReadStream(__dirname+'/data.csv').pipe(parser);
	res.render('index');
});


router.get('/sections', async (req, res) => {
	const sections = await Section.find().populate('grade', 'number').sort({grade: 'asc', name: 'asc'});
	res.render('sections/all-sections', { sections });
});


router.get('/sections/edit/:id', async (req, res) => {
	const grades = await Grade.find().sort({number: 1});
	const section = await Section.findById(req.params.id);
	res.render('sections/edit-section', {grades, section});
});

router.get('/sections/details/:id', async (req, res) => {
	const students = await Student.find({ section: req.params.id }).sort({date: 'desc'});
	for (var i = 0 ; i < students.length; i++) {
		var payments = await Payment.find({ student: students[i]._id });
		var newData = {};
		newData = {
			data: students[i],
			payments: payments,
		};
		students[i] = newData;
	}
	//const payments = await Payment.find({ student: { $in: students } });
	res.render('sections/details-section', {students});
});


router.get('/sections/edit/:id', async (req, res) => {
	const grades = await Grade.find().sort({number: 1});
	const section = await Section.findById(req.params.id);
	res.render('sections/edit-section', {grades, section});
});


//routes post

router.post('/sections/new-section', async (req, res) => {
	const { name } = req.body;
	const grade = await Grade.findOne({number: req.body.grade});
	const newSection = new Section({ name, grade: grade._id });
	const sectionVerify = await Section.findOne({ name: newSection.name, grade: newSection.grade });
	if (sectionVerify) {
		req.flash('error', 'la sección ya existe');
		res.redirect('/sections/new-section');
	} else {
		await newSection.save();
		res.redirect('/sections');
	}
});



//routes put
router.put('/sections/edit-section/:id', async (req, res) => {
	const { name } = req.body;
	const grade = await Grade.findOne({number: req.body.grade});
	const sectionVerify = await Section.findOne({ name, grade });
	if (sectionVerify) {
		req.flash('error', 'la sección ya existe');
		const newUrl = '/sections/edit/' + req.params.id; 
		res.redirect(newUrl);
		console.log("la sección ya existe");
	} else {
		await Section.findByIdAndUpdate(req.params.id, { name, grade });
		req.flash('success_msg', 'Nota editada satisfactoriamente');
		res.redirect('/sections');
	}

})

//routes delete
router.delete('/sections/delete/:id', async (req, res) => {
	await Section.findByIdAndDelete(req.params.id);
	req.flash('success_msg', 'Sección eliminada satisfactoriamente');
	res.redirect('/sections');

	//Hace falta validar que no haya estudiantes en una sección para poder cerrarla
});

module.exports = router;
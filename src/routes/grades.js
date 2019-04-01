const express = require('express');
const router = express.Router();
const Grade = require('../models/Grade');
const Section = require('../models/Section');


//routes get
router.get('/grades/new-grade', (req, res) => {
	res.render('grades/new-grade');
});

router.get('/grades', async (req, res) => {
	const grades = await Grade.find().sort({number: 1});
	res.render('grades/all-grades', { grades });
});

router.get('/grades/details/:id', async (req, res) => {
	const sections = await Section.find({grade: req.params.id}).sort({name: 1});
	res.render('grades/details-grade', {sections});
});


//routes post

router.post('/grades/new-grade', async (req, res) => {
	const { number } = req.body;
	const gradeVerify = await Grade.findOne({number: number});
	if (gradeVerify) {
		req.flash('error', 'El grado ya existe');
		res.redirect('/grades/new-grade');
	} else {
		const newGrade = new Grade({ number });
		await newGrade.save();
		req.flash('success_msg', 'El grado fue agregado satisfactoriamente');
		res.redirect('/grades');
	}

});


//routes put

//routes delete


module.exports = router;
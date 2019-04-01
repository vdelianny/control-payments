const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";


router.get('/newYear', async (req, res) => {
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("control-db-app");
		dbo.dropDatabase(function(err, result) {
			if (err) throw err;
			if (result) console.log("Db deleted");
			db.close();
		});
	});
	res.redirect('/');
});


router.get('/', (req, res) => {
	res.render('index');
});

module.exports = router;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/control-db-app', {
	useCreateIndex: true,
	useNewUrlParser: true,
	useFindAndModify: false
})
	.then(db => console.log('db is connect'))
	.catch(err => console.error(err));

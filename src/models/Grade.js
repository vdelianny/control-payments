const mongoose = require('mongoose');
const { Schema } = mongoose;

const GradeSchema = new Schema({
	number: { type: Number, required: true },
	date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Grade', GradeSchema);


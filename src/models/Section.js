const Grade = require('./Grade.js');
const mongoose = require('mongoose');
const { Schema } = mongoose;
//const Grade = mongoose.model('Grade', GradeSchema);


const SectionSchema = new Schema({
	name: { type: String, required: true },
	date: { type: Date, default: Date.now },
	grade: { type: Schema.Types.ObjectId, ref: "Grade" },
});

module.exports = mongoose.model('Section', SectionSchema);

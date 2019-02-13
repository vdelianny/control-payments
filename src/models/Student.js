const Section = require('./Section.js');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema({
	ce: { type: String, required: true },
	surname: { type: String, required: true },
	name: { type: String, required: true },
	gender: { type: String, required: true },
	age: { type: Number, required: true },
	birthdate: { type: Date, required: true },
	birthplace: { type: String, required: true },
	parent: { type: String, required: true },
	phone: { type: String, required: false },
	date: { type: Date, default: Date.now },
	section: { type: Schema.Types.ObjectId, ref: "Section" },
});

module.exports = mongoose.model('Student', StudentSchema);


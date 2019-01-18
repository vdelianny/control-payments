const Section = require('./Section.js');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema({
	name: { type: String, required: true },
	surname: { type: String, required: true },
	parent: { type: String, required: true },
	date: { type: Date, default: Date.now },
	section: { type: Schema.Types.ObjectId, ref: "Section" },
});

module.exports = mongoose.model('Student', StudentSchema);


const Student = require('./Student.js');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const PaymentSchema = new Schema({
	month: { type: Number, required: true },
	date: { type: Date, default: Date.now },
	student: { type: Schema.Types.ObjectId, ref: "Student" },
});

module.exports = mongoose.model('Payment', PaymentSchema);


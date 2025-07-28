const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  position: String,
  salary: Number,
  hireDate: Date,
    email: { type: String },              

});

module.exports = mongoose.model('Worker', workerSchema);

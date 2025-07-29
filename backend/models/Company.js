const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  address: { type: String },

  numberOfWorkers: { type: Number },
  field: { type: String },
  creationDate: { type: Date },
  description: { type: String },
  hrEmail: { type: String },
  hrPhone: { type: String },

  images: [String], // Array of base64 strings or image URLs

  // Add timestamps if needed
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);

module.exports = Company;

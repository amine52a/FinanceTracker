const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
  companyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Company',  // Reference to the Company collection
    required: true,  // Make company association mandatory
  },
  type: { 
    type: String, 
    enum: ['income', 'expense'], // Only accept these two types
    required: true 
  },
  amount: { 
    type: Number, 
    required: true,
    min: 0  // Amount cannot be negative
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  description: { 
    type: String,
    trim: true // Optional: remove leading/trailing spaces
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

module.exports = mongoose.model('Finance', financeSchema);

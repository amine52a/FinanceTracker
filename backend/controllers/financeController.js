const Finance = require('../models/Finance');

// Get all finances
const getAllFinances = async (req, res) => {
  try {
    const finances = await Finance.find();
    res.json(finances);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a finance record
const createFinance = async (req, res) => {
  const finance = new Finance(req.body);
  try {
    const newFinance = await finance.save();
    res.status(201).json(newFinance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a finance record
const updateFinance = async (req, res) => {
  try {
    const updatedFinance = await Finance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedFinance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a finance record
const deleteFinance = async (req, res) => {
  try {
    await Finance.findByIdAndDelete(req.params.id);
    res.json({ message: 'Finance record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllFinances,
  createFinance,
  updateFinance,
  deleteFinance
};

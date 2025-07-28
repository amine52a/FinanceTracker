const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Finance = require('../models/Finance');

router.post('/:companyId', async (req, res) => {
  const { companyId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(companyId)) {
    console.warn(`Invalid companyId received: ${companyId}`);
    return res.status(400).json({ error: 'Invalid companyId' });
  }

  try {
    console.log(`Fetching income data for companyId: ${companyId}`);

    const incomeByMonth = await Finance.aggregate([
      { $match: { companyId: new mongoose.Types.ObjectId(companyId), type: 'income' } },  // <-- fixed here
      {
        $group: {
          _id: { year: { $year: '$date' }, month: { $month: '$date' } },
          totalIncome: { $sum: '$amount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    console.log('Aggregated incomeByMonth:', incomeByMonth);

    if (!incomeByMonth || incomeByMonth.length < 2) {
      console.warn(`Not enough income data to predict for companyId: ${companyId}`);
      return res.status(400).json({ error: 'Not enough income data for prediction.' });
    }

    const pastRevenue = incomeByMonth.map(item => item.totalIncome);

    const diffs = pastRevenue.slice(1).map((val, i) => val - pastRevenue[i]);
    const avgDiff = diffs.reduce((sum, d) => sum + d, 0) / diffs.length;

    let predicted = [];
    let last = pastRevenue[pastRevenue.length - 1];

    for (let i = 0; i < 6; i++) {
      last += avgDiff;
      predicted.push(Math.round(last));
    }

    console.log(`Prediction for companyId ${companyId}:`, predicted);

    return res.json({ companyId, pastRevenue, prediction: predicted });
  } catch (err) {
    console.error(`Error during prediction for companyId ${companyId}:`, err);
    return res.status(500).json({ error: 'Server error while predicting.' });
  }
});

module.exports = router;

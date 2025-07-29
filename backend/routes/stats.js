
const express = require('express');
const router = express.Router();  // <--- THIS WAS MISSING

// then the rest of your code...

const Company = require('../models/Company');
const User = require('../models/User');
// const Project = require('../models/Project'); // Comment this out for now

// ...

router.get('/companies/count', async (req, res) => {
  try {
    const total = await Company.countDocuments();
    res.json({ total });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/users/count', async (req, res) => {
  try {
    const total = await User.countDocuments();
    res.json({ total });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Commenting out projects count route until model is ready
/*
router.get('/projects/count', async (req, res) => {
  try {
    const total = await Project.countDocuments();
    res.json({ total });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});
*/
module.exports = router;

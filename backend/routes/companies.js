const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const multer = require('multer');
const path = require('path');

// Import auth middleware
const { verifyToken, isAdmin } = require('../middlewares/auth');

// Configure multer storage
const storage = multer.diskStorage({
  destination: './uploads', // make sure this folder exists
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Public GET routes (anyone can access)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.industry) {
      filter.industry = req.query.industry;
    }
    const companies = await Company.find(filter);
    res.json({
      success: true,
      count: companies.length,
      data: companies
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({
        success: false,
        error: 'Company not found',
      });
    }
    res.json({
      success: true,
      data: company,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

// Protected routes — require user to be logged in and admin

// Create company (admin only)
router.post('/', verifyToken, isAdmin, upload.single('image'), async (req, res) => {
  try {
    const {
      name, email, phone, address, industry,
      numberOfWorkers, dateOfCreation,
      description, hrEmail, hrPhone
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Name is required'
      });
    }

    const companyData = {
      name,
      email,
      phone,
      address,
      industry,
      images: req.file ? [req.file.filename] : [],
      numberOfWorkers,
      dateOfCreation,
      description,
      hrEmail,
      hrPhone
    };

    const company = new Company(companyData);
    const newCompany = await company.save();

    res.status(201).json({
      success: true,
      data: newCompany
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Company name or email already exists'
      });
    }
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
});

// Update company (admin only)
router.put('/:id', verifyToken, isAdmin, upload.single('image'), async (req, res) => {
  try {
    const updateData = req.body;
    if (req.file) {
      updateData.images = [req.file.filename];
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({
        success: false,
        error: 'Company not found'
      });
    }

    res.json({
      success: true,
      data: updatedCompany
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
});

// Delete company (admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).json({
        success: false,
        error: 'Company not found'
      });
    }
    res.json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

module.exports = router;

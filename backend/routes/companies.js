const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const multer = require('multer');
const path = require('path');

// 🔧 Configure multer storage
const storage = multer.diskStorage({
  destination: './uploads', // make sure this folder exists
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// ✅ Get all companies with optional filtering
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

// ✅ Get a single company by ID  <--- ADDED ROUTE
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

// ✅ Create a company with image upload
router.post('/', upload.single('image'), async (req, res) => {
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
      images: req.file ? [req.file.filename] : [], // 👈 save uploaded image
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

// ✅ Update a company with image upload
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = req.body;

    // 👇 If a new image is uploaded, replace existing one
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

// ✅ Delete a company
router.delete('/:id', async (req, res) => {
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

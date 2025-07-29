    const Worker = require('../models/Worker');

    // Get all workers (optionally filter by company)
    const getWorkers = async (req, res) => {
    try {
        const filter = {};
        if (req.query.companyId) {
        filter.companyId = req.query.companyId;
        }
        const workers = await Worker.find(filter).populate('companyId', 'name'); // populate company name
        res.json({ success: true, data: workers });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
    };

    // Create a worker
    const createWorker = async (req, res) => {
    try {
        const worker = new Worker(req.body);
        const savedWorker = await worker.save();
        res.status(201).json({ success: true, data: savedWorker });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
    };

    // Update a worker
    const updateWorker = async (req, res) => {
    try {
        const updatedWorker = await Worker.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
        );
        if (!updatedWorker) {
        return res.status(404).json({ success: false, error: 'Worker not found' });
        }
        res.json({ success: true, data: updatedWorker });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
    };

    // Delete a worker
    const deleteWorker = async (req, res) => {
    try {
        const deletedWorker = await Worker.findByIdAndDelete(req.params.id);
        if (!deletedWorker) {
        return res.status(404).json({ success: false, error: 'Worker not found' });
        }
        res.json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
    };

    module.exports = { getWorkers, createWorker, updateWorker, deleteWorker };

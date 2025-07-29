const express = require('express');
const router = express.Router();
const workerController = require('../controllers/workerController');

router.get('/', workerController.getWorkers);         // list all or filter by company ?companyId=xxx
router.post('/', workerController.createWorker);       // create worker
router.put('/:id', workerController.updateWorker);     // update worker
router.delete('/:id', workerController.deleteWorker);  // delete worker

module.exports = router;

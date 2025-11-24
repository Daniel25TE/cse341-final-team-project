const express = require('express');
const router = express.Router();

const fantasyController = require('../controllers/fantasyController');
const validation = require('../middleware/validator');

router.get('/', fantasyController.getAll);

router.get('/:id', fantasyController.getSingle);

router.post('/', validation.saveValidator, fantasyController.createFantasy);

router.put('/:id', validation.saveValidator, fantasyController.updateFantasy);

router.delete('/:id', fantasyController.deleteFantasy);

module.exports = router;
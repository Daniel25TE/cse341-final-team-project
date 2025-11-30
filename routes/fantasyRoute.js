const express = require('express');
const router = express.Router();

const fantasyController = require('../controllers/fantasyController');
const validation = require('../middleware/validator');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', fantasyController.getAll);

router.get('/:id', fantasyController.getSingle);

router.post('/', isAuthenticated, validation.saveValidator, fantasyController.createFantasy);

router.put('/:id', isAuthenticated, validation.saveValidator, fantasyController.updateFantasy);

router.delete('/:id', isAuthenticated. fantasyController.deleteFantasy);

module.exports = router;
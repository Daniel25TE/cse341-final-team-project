const express = require('express');
const router = express.Router();

const fantasyController = require('../controllers/fantasyController');
const validation = require('../middleware/validator');
const isAuthenticated = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.get('/', fantasyController.getAll);

router.get('/:id', fantasyController.getSingle);

router.post('/', isAuthenticated, authorize('customer'), validation.saveValidator, fantasyController.createFantasy);

router.put('/:id', isAuthenticated, authorize('customer'), validation.saveValidator, fantasyController.updateFantasy);

router.delete('/:id', isAuthenticated, authorize('admin'), fantasyController.deleteFantasy);

module.exports = router;
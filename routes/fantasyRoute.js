const express = require('express');
const router = express.Router();

const fantasyController = require('../controllers/fantasyController');
const validation = require('../middleware/validator');
const isAuthenticated = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.get('/', isAuthenticated, authorize('customer'), fantasyController.getAll);

router.get('/:id', isAuthenticated, authorize('customer'), fantasyController.getSingle);

router.post('/', isAuthenticated, authorize('admin'), validation.saveValidator, fantasyController.createFantasy);

router.put('/:id', isAuthenticated, authorize('admin'), validation.saveValidator, fantasyController.updateFantasy);

router.delete('/:id', isAuthenticated, authorize('admin'), fantasyController.deleteFantasy);

module.exports = router;
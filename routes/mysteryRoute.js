const express = require('express');
const router = express.Router();

const mysteryController = require('../controllers/mysteryController');
const validation = require('../middleware/validator');
const isAuthenticated = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.get('/', isAuthenticated, authorize('customer'), mysteryController.getAllMystery);

router.get('/:id', isAuthenticated, authorize('customer'), mysteryController.getSingleMystery);

router.post('/', isAuthenticated, authorize('admin'), validation.saveValidator, mysteryController.createMystery);

router.put('/:id', isAuthenticated, authorize('admin'), validation.saveValidator, mysteryController.updateMystery);

router.delete('/:id', isAuthenticated, authorize('admin'), mysteryController.deleteMystery);

module.exports = router;
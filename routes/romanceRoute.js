const express = require('express');
const router = express.Router();

const romanceController = require('../controllers/romanceController');
const validation = require('../middleware/validator');
const isAuthenticated = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.get('/', isAuthenticated, authorize('customer'), romanceController.getAll);

router.get('/:id', isAuthenticated, authorize('customer'), romanceController.getSingle);

router.post('/', isAuthenticated, authorize('admin'), validation.saveValidator, romanceController.createRomance);

router.put('/:id', isAuthenticated, authorize('admin'), validation.saveValidator, romanceController.updateRomance);

router.delete('/:id', isAuthenticated, authorize('admin'), romanceController.deleteRomance);

module.exports = router;
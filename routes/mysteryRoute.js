const express = require('express');
const router = express.Router();

const mysteryController = require('../controllers/mysteryController');
const validation = require('../middleware/validator');
const isAuthenticated = require('../middleware/authenticate');

router.get('/', mysteryController.getAllMystery);

router.get('/:id', mysteryController.getSingleMystery);

router.post('/', isAuthenticated, validation.saveValidator, mysteryController.createMystery);

router.put('/:id', isAuthenticated, validation.saveValidator, mysteryController.updateMystery);

router.delete('/:id', isAuthenticated, mysteryController.deleteMystery);

module.exports = router;
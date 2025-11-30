const express = require('express');
const router = express.Router();

const romanceController = require('../controllers/romanceController');
const validation = require('../middleware/validator');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', romanceController.getAll);

router.get('/:id', romanceController.getSingle);

router.post('/', isAuthenticated, validation.saveValidator, romanceController.createRomance);

router.put('/:id', isAuthenticated, validation.saveValidator, romanceController.updateRomance);

router.delete('/:id', isAuthenticated, romanceController.deleteRomance);

module.exports = router;
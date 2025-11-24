const express = require('express');
const router = express.Router();

const romanceController = require('../controllers/romanceController');
const validation = require('../middleware/validator');

router.get('/', romanceController.getAll);

router.get('/:id', romanceController.getSingle);

router.post('/', validation.saveValidator, romanceController.createRomance);

router.put('/:id', validation.saveValidator, romanceController.updateRomance);

router.delete('/:id', romanceController.deleteRomance);

module.exports = router;
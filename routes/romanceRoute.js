const express = require('express');
const router = express.Router();

const romanceController = require('../controllers/romance');
const validation = require('../middleware/validate');

router.get('/', romanceController.getAll);

router.get('/:id', romanceController.getSingle);

router.post('/', validation.saveRomance, RomanceController.createRomance);

router.put('/:id', validation.saveRomance, romanceController.updateTrail);

router.delete('/:id', romanceController.deleteRomance);

module.exports = router;
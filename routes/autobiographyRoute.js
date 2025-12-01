const express = require('express');
const router = express.Router();

const autobiographyController = require('../controllers/autobiographyController');
const validation = require('../middleware/validator');

router.get('/', autobiographyController.getAll);

router.get('/:id', autobiographyController.getSingle);

router.post('/', validation.saveValidator, autobiographyController.createAutobiography);

router.put('/:id', validation.saveValidator, autobiographyController.updateAutobiography);

router.delete('/:id', autobiographyController.deleteAutobiography);

module.exports = router;
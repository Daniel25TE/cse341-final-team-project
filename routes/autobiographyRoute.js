const express = require('express');
const router = express.Router();

const autobiographyController = require('../controllers/autobiographyController');
const validation = require('../middleware/validator');
const isAuthenticated = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.get('/', autobiographyController.getAll);

router.get('/:id', autobiographyController.getSingle);

router.post('/', isAuthenticated, authorize('customer'), validation.saveValidator, autobiographyController.createAutobiography);

router.put('/:id', isAuthenticated, authorize('customer'), validation.saveValidator, autobiographyController.updateAutobiography);

router.delete('/:id', isAuthenticated, authorize('admin'), autobiographyController.deleteAutobiography);

module.exports = router;
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.get('/', usersController.getAllUsers);

router.put('/:githubId/role', usersController.updateUserRole);

module.exports = router;
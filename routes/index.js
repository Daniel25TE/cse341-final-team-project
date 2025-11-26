const router = require('express').Router();

// Collections
//router.use('/autobiography', require('./autobiography')); 
router.use('/fantasy', require('./fantasyRoute'));
router.use('/mystery', require('./mysteryRoute'));
router.use('/romance', require('./romanceRoute'));

module.exports = router;
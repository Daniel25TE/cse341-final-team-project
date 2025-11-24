const router = require('express').Router();

// Collections
//router.use('/autobiography', require('./autobiography')); 
router.use('/fantasy', require('./fantasyRoute'));
//router.use('/mystery', require('./mystery'));
router.use('/romance', require('./romanceRoute'));

//router.use('/', require('./swagger'));

module.exports = router;
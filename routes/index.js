const router = require('express').Router();

router.use('/', require('./auth'));

// Collections
router.use('/search', require('./searchRoute'));
router.use('/autobiography', require('./autobiographyRoute')); 
router.use('/fantasy', require('./fantasyRoute'));
router.use('/mystery', require('./mysteryRoute'));
router.use('/romance', require('./romanceRoute'));
router.use('/users', require('./users'));
router.use('/search', require('./searchRoute'));

router.use('/', require('./swagger'));

module.exports = router;

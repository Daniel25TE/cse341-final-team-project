const router = require('express').Router();

router.use('/api-docs', require('./swagger'));

router.get('/', (req, res) => { 
  //#swagger.tags = ['Hello World']
  res.send('Hello World!');
});

// Collections
router.use('/autobiography', require('./autobiography')); 
router.use('/fantasy', require('./fantasy'));
router.use('/mystery', require('./mystery'));
router.use('/romance', require('./romance'));

module.exports = router;
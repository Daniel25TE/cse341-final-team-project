const router = require('express').Router();
const passport = require('passport');
const { isAuthenticated } = require('../middleware/authenticate')

// Collections
//router.use('/autobiography', require('./autobiography')); 
router.use('/fantasy', require('./fantasyRoute'));
router.use('/mystery', require('./mysteryRoute'));
router.use('/romance', require('./romanceRoute'));

router.use('/', require('./swagger'));

// GitHub login – start auth flow
router.get('/login', passport.authenticate('github'), (req, res) => {});

// Logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err)
    res.redirect('/')
  })
})

router.get('/protected', isAuthenticated, (req, res) => {
  res.json({ message: `Hi ${req.user.displayName || req.user.username}` })
})

module.exports = router;

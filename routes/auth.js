const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    console.log('Authenticated user:', req.user);
    req.session.save(() => {
      res.redirect('/profile');
    });
  }
);


router.get('/logout', (req, res, next) => {
  //#swagger.tags = ['OAuth']
  //#swagger.summary = 'Log out of your account'
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect('/');
  });
});

router.get('/profile', (req, res) => {
  //#swagger.tags = ['OAuth']
  //#swagger.summary = 'Check if you are log in.'
  if (!req.isAuthenticated()) {
    return res.status(401).send('You are not logged in');
  }

  res.send(`Hello: ${req.user.displayName}\nYou are authenticated now`);
});


module.exports = router;
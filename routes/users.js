const express = require('express');
const router = express.Router();
const passport = require('passport');

const users = require('../controllers/users');

const catchAsync = require('../utils/catchAsync');

router
  .route('/register')
  .get((req, res) => {
    res.render('users/register');
  })
  .post(catchAsync(users.createUser));

router
  .route('/login')
  .get(users.renderLoginForm)
  .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

router.get('/logout', users.logout);

module.exports = router;

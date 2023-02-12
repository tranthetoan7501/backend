const express = require('express');
const router = express.Router();
const passport = require('passport');

const { signUp, verify, logIn } = require('../controller/auth/authController');

router.route('/signup').post(signUp);
router.route('/confirm/:token').get(verify);

// router.route('/confirm/:token').get(verify);

router
  .route('/login')
  .post(passport.authenticate('local', { session: false }), logIn);

// router
//   .route('/logout')
//   .post(passport.authenticate('jwt', { session: false }), logOut)
//   .get(passport.authenticate('jwt', { session: false }), logOut);

// router.post('/forgotpassword', forgotPassword);
// router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;

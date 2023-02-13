const User = require('../../model/user');
const asyncHandler = require('../../middleware/async');
const ErrorResponse = require('../../utils/errorResponse');
const sendEmail = require('../../utils/sendEmail');
const { Res } = require('../../utils/response');
const crypto = require('crypto');
const AuthService = require('./authService');

exports.signUp = asyncHandler(async (req, res, next) => {
  const user = AuthService.createUser(req);

  const message = AuthService.verifyMessage(user);

  const account = await User.create(user);

  if (account != null) {
    await sendEmail({
      email: user.email,
      subject: 'Camaphoot Verify Email',
      message,
    });
    Res('Email sent', res);
  }
  return new ErrorResponse('Create account fail', 500);
});

exports.verify = asyncHandler(async (req, res, next) => {
  const verifiedUser = await AuthService.verify(req.params.token);

  if (verifiedUser != null) {
    Res('Verify success', res);
  } else {
    return next(new ErrorResponse('Can not verify your account', 500));
  }
});

exports.logIn = async (req, res, next) => {
  if (req.err) {
    return next(req.err);
  }

  if (!req.user.verified) {
    return next(new ErrorResponse('Your account has not been verified', 500));
  }
  if (req.user) {
    req.user.token = req.user.getSignedJwtToken();
    Res(req.user.toAuthJSON(), res);
  } else {
    return next(new ErrorResponse('Login fail !!!', 500));
  }
};

exports.getVersion = async (req, res, next) => {
  Res(process.env.VERSION, res);
};

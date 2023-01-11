const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a username'],
    unique: true,
    trim: true,
    maxlength: [50, 'Username can not be more than 50 characters'],
  },
  description: {
    type: String,
    dafault: 'Tôi là ...',
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please add a email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    select: false,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password must have more than 6 characters'],
  },
  following: [
    {
      id: String,
      name: String,
      img: String,
    },
  ],
  followers: [
    {
      id: String,
      name: String,
      img: String,
    },
  ],
  //   tokenCode: {
  //     type: String,
  //   },
  verified: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

User.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
User.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      code: this.tokenCode,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

User.methods.getVerifyMailJwt = function () {
  return jwt.sign(
    {
      email: this.email,
    },
    process.env.VERIFY_MAIL_JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

// Match user entered password to hashed password in database
User.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

User.methods.toAuthJSON = function () {
  var resVal = this.toObject();
  delete resVal.password;
  delete resVal.createdAt;
  delete resVal.__v;
  return {
    user: resVal,
    token: this.getSignedJwtToken(),
  };
};

module.exports = mongoose.model('User', User);

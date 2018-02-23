'use strict';

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _UserModel = require('../models/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

var _passportJwt = require('passport-jwt');

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();


var signinStrategy = new _passportLocal2.default(function (username, password, done) {
  _UserModel2.default.findOne({ username: username }).exec().then(function (user) {
    if (!user) {
      return done(null, false);
    }

    _bcrypt2.default.compare(password, user.password, function (error, isMatch) {
      if (error) {
        return done(error, false);
      }

      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  }).catch(function (error) {
    return done(error, false);
  });
});

var jwtOptions = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: _passportJwt.ExtractJwt.fromHeader('authorization')
};

var authStrategy = new _passportJwt.Strategy(jwtOptions, function (payload, done) {
  _UserModel2.default.findById(payload.userId, function (err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

_passport2.default.use('signinStrategy', signinStrategy);
_passport2.default.use('authStrategy', authStrategy);
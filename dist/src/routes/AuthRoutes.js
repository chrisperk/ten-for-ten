'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _UserModel = require('../models/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

require('../services/passport');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var signinStrategy = _passport2.default.authenticate('signinStrategy', { session: false });

function tokenForUser(user) {
    var timestamp = new Date().getTime();
    return _jwtSimple2.default.encode({ userId: user.id, iat: timestamp }, process.env.SECRET);
}

router.post('/api/login', signinStrategy, function (req, res) {
    res.json({ token: tokenForUser(req.user) });
});

router.post('/api/signup', function (req, res, next) {
    console.log('hi');
    var _req$body = req.body,
        username = _req$body.username,
        password = _req$body.password;

    console.log(username, password);

    if (!username || !password) {
        return res.status(422).json({ error: 'You must provide a username and password' });
    }

    _UserModel2.default.findOne({ username: username }).exec().then(function (existingUser) {
        if (existingUser) {
            return res.status(422).json({ error: 'Username is in use' });
        }

        _bcrypt2.default.hash(password, 10, function (err, hashedPassword) {
            console.log(hashedPassword);
            if (err) {
                return next(err);
            }

            var user = new _UserModel2.default({ username: username, password: hashedPassword });

            user.save().then(function (newUser) {
                return res.json({ token: tokenForUser(newUser) });
            });
        });
    }).catch(function (err) {
        return next(err);
    });
});

exports.default = router;
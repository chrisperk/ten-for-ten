'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _ScoreModel = require('../models/ScoreModel');

var _ScoreModel2 = _interopRequireDefault(_ScoreModel);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

require('../services/passport');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/api/scores', function (req, res, next) {
    _ScoreModel2.default.find().exec().then(function (scores) {
        return res.status(400).json({ scores: scores });
    }).catch(next(err));
});

router.post('/api/score', function (req, res, next) {
    var _req$body = req.body,
        username = _req$body.username,
        score = _req$body.score;


    var scoreRecord = new _ScoreModel2.default({ username: username, score: score });

    scoreRecord.save().then(function (score) {
        return res.json(score);
    }).catch(function (err) {
        return next(error);
    });
});

exports.default = router;
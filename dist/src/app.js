'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _AuthRoutes = require('./routes/AuthRoutes');

var _AuthRoutes2 = _interopRequireDefault(_AuthRoutes);

require('./services/passport');

var _ScoreRoutes = require('./routes/ScoreRoutes');

var _ScoreRoutes2 = _interopRequireDefault(_ScoreRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();


_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect('mongodb://localhost/ten-for-ten').then(function () {
    return console.log('[mongoose] Connected to MongoDB');
}).catch(function () {
    return console.log('[mongoose] Error connecting to MongoDB');
});

var app = (0, _express2.default)();

var authStrategy = _passport2.default.authenticate('authStrategy', { session: false });

app.use(_bodyParser2.default.json());
app.use(_AuthRoutes2.default, _ScoreRoutes2.default);

app.get('/api/secret', authStrategy, function (req, res) {
    res.send('The current user is ' + req.user.username);
});

var port = process.env.PORT || 3001;
app.listen(port, function () {
    console.log('Listening on port:' + port);
});
'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.get('/dilly', function (req, res, next) {
    res.json([{
        id: 1,
        username: 'test'
    }, {
        id: 2,
        username: 'sample'
    }]);
});

app.listen(3001);
'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var scoreSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    score: {
        type: Number,
        required: true
    }
});

module.exports = _mongoose2.default.model('Score', scoreSchema);
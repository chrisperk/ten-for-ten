'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
require('dotenv').config();

console.log(require('dotenv').config());

console.log(process.env.NODE_ENV);

var NODE_ENV = process.env.NODE_ENV;


console.log(NODE_ENV);

var _ref = NODE_ENV === 'development' ? require('dotenv').config().parsed : process.env,
    MONGODB_URI = _ref.MONGODB_URI,
    SECRET = _ref.SECRET,
    PORT = _ref.PORT;

console.log(MONGODB_URI, SECRET, PORT);

var envVars = {
  // use the DATABASE_URI, or a "sane default"
  MONGODB_URI: MONGODB_URI || 'mongodb_uri',
  // you can also leave out the `||` fallback
  SECRET: SECRET,
  PORT: PORT || '3001'
};

exports.default = envVars;
require('dotenv').config();

console.log(require('dotenv').config());

console.log(process.env.NODE_ENV);

const {
    NODE_ENV,
 } = process.env;

 console.log(NODE_ENV);
 
 const {
   MONGODB_URI,
   SECRET,
   PORT
 } = (
   NODE_ENV === 'development'
     ? require('dotenv').config().parsed
     : process.env
 );

 console.log(MONGODB_URI, SECRET, PORT);
 
 const envVars = {
   // use the DATABASE_URI, or a "sane default"
   MONGODB_URI: MONGODB_URI || 'mongodb_uri',
   // you can also leave out the `||` fallback
   SECRET: SECRET,
   PORT: PORT || '3001'
 }
 
 export default envVars;
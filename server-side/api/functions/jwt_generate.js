const config = require('../config')
var jwt = require('jsonwebtoken')

/*
  : String
*/
const JWTGenerate = function() {
  var token = jwt.sign({ foo: 'bar' }, 'shhhhh')
  
}

module.exports = JWTGenerate;

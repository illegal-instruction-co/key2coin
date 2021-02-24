const config = require('../config')
var jwt = require('jsonwebtoken')

/*
  : String
*/

var secretKey

const JWTGenerate = function() {

  // Get current secret key from temp file
  try {
    secretKey = fs.readFileSync(`${__dirname}\\..\\temp\\${config.basis.JWT.secret_key_temp}`, 'utf8')
  } catch(err) {
    Log(config.basis.error_log_prefix, {
      current: 'JWTGenerator',
      step: 'Get current secret key from temp file',
      error: err
    })
  }



  var token = jwt.sign({ foo: 'bar' }, secretKey)

}

module.exports = JWTGenerate;

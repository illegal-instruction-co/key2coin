const config = require('../config')
const fs = require('fs')

/*
Modular functions
*/
const RandomString = require('../functions/random_string')
const Log = require('../functions/log')

/*
  : Void
*/

const JWTSecretKeyGenerator = function() {

  // Generate random secret key for JWT
  let secretKey = RandomString(config.basis.JWT.secret_key_lenght)

  // Delete old temp
  try {
    fs.unlinkSync(`${__dirname}\\..\\temp\\${config.basis.JWT.secret_key_temp}`)
  } catch(err) {
    Log(config.basis.error_log_prefix, {
      current: 'JWTSecretKeyGenerator',
      step: 'Delete old secret key temp file',
      error: err
    })
  }

  // Create new temp
  try {
      fs.writeFileSync( `${__dirname}\\..\\temp\\${config.basis.JWT.secret_key_temp}`, secretKey)
  } catch(err) {
    Log(config.basis.error_log_prefix, {
      current: 'JWTSecretKeyGenerator',
      step: 'Create new secret key temp file',
      error: err
    })
  }
}

module.exports = JWTSecretKeyGenerator;

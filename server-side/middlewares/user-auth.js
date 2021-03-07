const config = require('../config')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const userAuth  = function(req, res, next) {

  // Get token
  var token = req.header(`X-${config.branding.project_name}-auth-token`)
  if(!token) return res.json( { auth: false } )

  // Get JWT secret key
  const jwtSecretKey = fs.readFileSync( `${__dirname}\\..\\temp\\${config.basis.JWT.secret_key_temp}`, 'utf8')

  // Check token
  if(jwt.verify(token, jwtSecretKey)) {
      return next()
  } else {
    return res.json( { auth: false } )
  }
}

module.exports = userAuth;

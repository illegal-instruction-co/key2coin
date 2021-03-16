const express = require('express')
const router = express.Router();
const config = require('../config')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const BEA256 = require('bea256')
var md5 = require('md5')
const path = require('path')

const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

/*
Modular functions
*/
const Log = require('../functions/log')

/*
  Generating authentication token

  test:
  http://localhost:3001/auth/generate-user-auth-token
*/

router.post('/generate-user-auth-token', function(req, res, next) {

  const { ip, emailHash, passwordHash } = req.body
  var email
  var password

  // Each client encrypted their hashes with their ip addresses
  try {
    email = new BEA256(emailHash, ip).decrypt("base64")
    password = new BEA256(passwordHash, ip).decrypt("base64")
  } catch(err) {

    Log(config.basis.error_log_prefix, {
      request_end_point: req.originalUrl,
      error: err
    })

    return res.status(400).json( { error: "decrypting hashes error!" }), requestLog(req,res)
  }

  // Get JWT secret key
  const jwtSecretKey = fs.readFileSync(path.join(__dirname, '/../temp/' + config.basis.JWT.secret_key_temp), 'utf8')

  // Create JWT ( will expire in {Config.crono.jobs[0].timer} )
  var token = jwt.sign({ ip: ip, email: emailHash }, jwtSecretKey)

  var condition = { email: email, password: md5(password) }

  Users.findAll({ where: condition })
    .then(data => {

      if(!data[0]) return res.status(401).json( { auth: false } ), requestLog(req,res)

      // Response the token with that common parameters
      return res.json({ip: ip, email: email, token: token }), requestLog(req,res)

    })
    .catch(err => {
      res.status(401).json( { auth: false } ), requestLog(req,res)
    });
});

/*
Request log for
spesificated
route
*/
function requestLog(req, res) {
  Log(config.basis.log_prefix, {
    request_end_point: req.originalUrl,
    request_parameters: req.params,
    request_method: req.method,
    response_status: res.statusCode 
  })
}

module.exports = router;

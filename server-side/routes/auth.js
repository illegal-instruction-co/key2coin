const express = require('express')
const router = express.Router();
const config = require('../config')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const BEA256 = require('bea256')
var md5 = require('md5')

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
  http://localhost:3001/auth/generate-user-auth-token/test/W3siaWQiOiJVMkZzZEdWa1gxOXB3MjFhR2N1c1FYYkFsNEs2T0NmZFgvR1EvOUtFWnVRPSIsInByZXZpdXNfaWQiOiJVMkZzZEdWa1gxKytpenRNaXQvejVWWjFzYnVyM2ZjM3Q2MXRvUVhtWlNVPSJ9LHsiaWQiOiJVMkZzZEdWa1gxOW05eUtXTjJySkVuTitFVnVrN25Bci80OTExK1lxQ2trPSIsInByZXZpdXNfaWQiOiJVMkZzZEdWa1gxOENUazgybnRwK0JSOWJUNlNKME5aaWpnblJBbkZLYnBrPSJ9LHsiaWQiOiJVMkZzZEdWa1gxOExpVFd4enhHR3M2MjBySG5MMVh4NGllQ253ang3NkJVPSIsInByZXZpdXNfaWQiOiJVMkZzZEdWa1gxL3YwVElaRXRlczdqTDUzei9IZkJ5RkgyNmtrVk1XOWNjPSJ9LHsiaWQiOiJVMkZzZEdWa1gxOU1kSCtDWDErWGNyTm1yZDExQlh3Um1VZSt6Y0IxWHZNPSIsInByZXZpdXNfaWQiOiJVMkZzZEdWa1gxOFFNM2pyODFKTzNGY1pNUXVaRDd5RVptZm9jNE5MZExJPSJ9LHsiaWQiOiJVMkZzZEdWa1gxK0Q5L0Q4SVFoT25WQXRYbHAzczlGT0pjRWhJRzRUTzJNPSIsInByZXZpdXNfaWQiOiJVMkZzZEdWa1gxKzI1NTFYSU5yS0o2cERzejB1UFdPN3grTVlhVXFjN29RPSJ9LHsiaWQiOiJVMkZzZEdWa1gxOFQreDJaMjdHTzR6MW1SVUJsUDJkMXo1SDR4NjVoM1pJPSIsInByZXZpdXNfaWQiOiJVMkZzZEdWa1gxOUdYbHhGVXk1TmtEdmdtNVl3VmMwb1pYSnFFSTMzU0R3PSJ9LHsiaWQiOiJVMkZzZEdWa1gxK1pxZGZRd0hRSWFnN0RKQ1NFZWl4Tjh3N1NKMyttQThZPSIsInByZXZpdXNfaWQiOiJVMkZzZEdWa1gxOU9zZFBaVHNhVzQyWnBTU013L2gwSjJWbXcvMzZ5dFhRPSJ9LHsiaWQiOiJVMkZzZEdWa1gxOVBXdm1oeHhldmJlcFZ6UFJQbzJaQjE1WExrSzgwMm80PSIsInByZXZpdXNfaWQiOiJVMkZzZEdWa1gxOThyY0dHRE82ZDNBVDNqanRNMGt4dFplYXVpaFBFMitNPSJ9LHsiaWQiOiJVMkZzZEdWa1gxOUluSWZoME41c24vZ04xaFAyTHFNQ0hCdjRURWhidmhNPSIsInByZXZpdXNfaWQiOiJVMkZzZEdWa1gxK0ZnZ09NTi9GdFVIblJYTVJMRUc3bHg0Vm90VG9tNXZBPSJ9LHsiaWQiOiJVMkZzZEdWa1gxL3ZXL3dLYlhONjcrZTBzOGtFRVozZ2RHWml2MCt2ZkdFPSIsInByZXZpdXNfaWQiOiJVMkZzZEdWa1gxOVNiaWFvUXZjaUtwa1ExU2d6ZC9ZdEpDL0JJeFk0Z2xnPSJ9LHsiaWQiOiJVMkZzZEdWa1gxK0lTMkw5YUtHOVh2bi9pb2pqQmwybXNjdHZoUDhhNVNVPSIsInByZXZpdXNfaWQiOiJVMkZzZEdWa1gxK0RVdUp5S05rd0dGb2dCWmpWZk9abDFPZ24rbEZ1NTk0PSJ9LHsiaWQiOiJVMkZzZEdWa1gxODdtc3UyRVpZeXZuM08wajRUZzR4RVY4WXJNMVJYekVZPSIsInByZXZpdXNfaWQiOiJVMkZzZEdWa1gxL0ZSaE05aUlodVRrWHF0TjR0ZzVVUmFQQlRXK2ZmaUxvPSJ9LHsiaWQiOiJVMkZzZEdWa1gxOXFEWjZvamQ3WVhTOGVFTm0vcWNHenFGYkNpb0dhNzZRPSIsInByZXZpdXNfaWQiOiJVMkZzZEdWa1gxKytMTnBaZlZJUnRJRytFcGJib1l6OFVwenc1bHpzRnRJPSJ9XQ==/W3siaWQiOiJVMkZzZEdWa1gxOXB3MjFhR2N1c1FYYkFsNEs2T0NmZFgvR1EvOUtFWnVRPSIsInByZXZpdXNfaWQiOiJVMkZzZEdWa1gxKytpenRNaXQvejVWWjFzYnVyM2ZjM3Q2MXRvUVhtWlNVPSJ9LHsiaWQiOiJVMkZzZEdWa1gxOW05eUtXTjJySkVuTitFVnVrN25Bci80OTExK1lxQ2trPSIsInByZXZpdXNfaWQiOiJVMkZzZEdWa1gxOENUazgybnRwK0JSOWJUNlNKME5aaWpnblJBbkZLYnBrPSJ9LHsiaWQiOiJVMkZzZEdWa1gxOExpVFd4enhHR3M2MjBySG5MMVh4NGllQ253ang3NkJVPSIsInByZXZpdXNfaWQiOiJVMkZzZEdWa1gxL3YwVElaRXRlczdqTDUzei9IZkJ5RkgyNmtrVk1XOWNjPSJ9LHsiaWQiOiJVMkZzZEdWa1gxOU1kSCtDWDErWGNyTm1yZDExQlh3Um1VZSt6Y0IxWHZNPSIsInByZXZpdXNfaWQiOiJVMkZzZEdWa1gxOFFNM2pyODFKTzNGY1pNUXVaRDd5RVptZm9jNE5MZExJPSJ9LHsiaWQiOiJVMkZzZEdWa1gxK0Q5L0Q4SVFoT25WQXRYbHAzczlGT0pjRWhJRzRUTzJNPSIsInByZXZpdXNfaWQiOiJVMkZzZEdWa1gxKzI1NTFYSU5yS0o2cERzejB1UFdPN3grTVlhVXFjN29RPSJ9LHsiaWQiOiJVMkZzZEdWa1gxOFQreDJaMjdHTzR6MW1SVUJsUDJkMXo1SDR4NjVoM1pJPSIsInByZXZpdXNfaWQiOiJVMkZzZEdWa1gxOUdYbHhGVXk1TmtEdmdtNVl3VmMwb1pYSnFFSTMzU0R3PSJ9LHsiaWQiOiJVMkZzZEdWa1gxK1pxZGZRd0hRSWFnN0RKQ1NFZWl4Tjh3N1NKMyttQThZPSIsInByZXZpdXNfaWQiOiJVMkZzZEdWa1gxOU9zZFBaVHNhVzQyWnBTU013L2gwSjJWbXcvMzZ5dFhRPSJ9LHsiaWQiOiJVMkZzZEdWa1gxOVBXdm1oeHhldmJlcFZ6UFJQbzJaQjE1WExrSzgwMm80PSIsInByZXZpdXNfaWQiOiJVMkZzZEdWa1gxOThyY0dHRE82ZDNBVDNqanRNMGt4dFplYXVpaFBFMitNPSJ9LHsiaWQiOiJVMkZzZEdWa1gxOUluSWZoME41c24vZ04xaFAyTHFNQ0hCdjRURWhidmhNPSIsInByZXZpdXNfaWQiOiJVMkZzZEdWa1gxK0ZnZ09NTi9GdFVIblJYTVJMRUc3bHg0Vm90VG9tNXZBPSJ9LHsiaWQiOiJVMkZzZEdWa1gxL3ZXL3dLYlhONjcrZTBzOGtFRVozZ2RHWml2MCt2ZkdFPSIsInByZXZpdXNfaWQiOiJVMkZzZEdWa1gxOVNiaWFvUXZjaUtwa1ExU2d6ZC9ZdEpDL0JJeFk0Z2xnPSJ9LHsiaWQiOiJVMkZzZEdWa1gxK0lTMkw5YUtHOVh2bi9pb2pqQmwybXNjdHZoUDhhNVNVPSIsInByZXZpdXNfaWQiOiJVMkZzZEdWa1gxK0RVdUp5S05rd0dGb2dCWmpWZk9abDFPZ24rbEZ1NTk0PSJ9LHsiaWQiOiJVMkZzZEdWa1gxODdtc3UyRVpZeXZuM08wajRUZzR4RVY4WXJNMVJYekVZPSIsInByZXZpdXNfaWQiOiJVMkZzZEdWa1gxL0ZSaE05aUlodVRrWHF0TjR0ZzVVUmFQQlRXK2ZmaUxvPSJ9LHsiaWQiOiJVMkZzZEdWa1gxOXFEWjZvamQ3WVhTOGVFTm0vcWNHenFGYkNpb0dhNzZRPSIsInByZXZpdXNfaWQiOiJVMkZzZEdWa1gxKytMTnBaZlZJUnRJRytFcGJib1l6OFVwenc1bHpzRnRJPSJ9XQ==
*/

router.get('/generate-user-auth-token/:ip/:emailHash/:passwordHash', function(req, res, next) {

  /*
  Request log
  */
  requestLog(req,res)

  const { ip, emailHash, passwordHash } = req.params
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

    return res.json( { error: "decrypting hashes error!" })
  }

  // Get JWT secret key
  const jwtSecretKey = fs.readFileSync(path.join(__dirname, '/../temp/' + config.basis.JWT.secret_key_temp), 'utf8')

  // Create JWT ( will expire in {Config.crono.jobs[0].timer} )
  var token = jwt.sign({ ip: ip, email: emailHash }, jwtSecretKey)

  var condition = { email: email, password: md5(password) }

  Users.findAll({ where: condition })
    .then(data => {

      if(!data[0]) return res.json( { auth: false } )

      // Response the token with that common parameters
      return res.json({ip: ip, email: email, token: token })

    })
    .catch(err => {
      res.json( { auth: false } )
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
    response_status: 200
  })
}

module.exports = router;

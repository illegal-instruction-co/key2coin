const express = require('express');
const router = express.Router();
const config = require('../config')

/*
Modular functions
*/
const Log = require('../functions/log')

router.get('/crypto-currencys', function(req, res, next) {

  // Get supported crypto currencys from config
  res.json(config.supported_crypto_currencys)

  /*
  Request log
  */
  requestLog(req,res)
});

router.get('/currencys', function(req, res, next) {

  // Get supported currencys from config
  res.json(config.supported_currencys)

  /*
  Request log
  */
  requestLog(req,res)
});

router.get('/languages', function(req, res, next) {

  // Get supported currencys from config
  res.json(config.supported_languages)

  /*
  Request log
  */
  requestLog(req,res)
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

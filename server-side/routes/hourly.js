const express = require('express');
const router = express.Router();
const config = require('../config')
const fs = require('fs')
const path = require('path')

/*
Modular functions
*/
const Log = require('../functions/log')

router.get('/prices', function(req, res, next) {

  // Get hourly prices temp
  let hourlyPrices =  fs.readFileSync(path.join(__dirname, '/../temp/' + config.basis.hourly_prices.data_temp) , 'utf8') ? fs.readFileSync(path.join(__dirname, '/../temp/' + config.basis.hourly_prices.data_temp) , 'utf8') : {}

  res.json(JSON.parse(hourlyPrices))

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

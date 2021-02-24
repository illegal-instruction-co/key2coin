const express = require('express');
const router = express.Router();
const config = require('../config')
const fs = require('fs')

/*
Modular functions
*/
const Log = require('../functions/log')

router.get('/', function(req, res, next) {

  // Get statistics temp
  let statistics =  fs.readFileSync(`${__dirname}\\..\\temp\\${config.basis.daily_statistics.data_temp}`, 'utf8')

  res.json(JSON.parse(statistics))

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

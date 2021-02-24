const config = require('../config')
const fs = require('fs')

/*
Modular functions
*/
const Log = require('../functions/log')

/*
  : Void
*/
const SupportedCryptoCurrencysHourlyPricesFlusher = function() {
  /*
    Flush daily hourly prices temp
  */
  try {
    fs.unlinkSync(`${__dirname}\\..\\temp\\${config.basis.hourly_prices.data_temp}`)
  } catch(err) {
    Log(config.basis.error_log_prefix, {
      current: 'SupportedCryptoCurrencysHourlyPricesFlusher',
      step: 'Delete old temp file',
      error: err
    })
  }
}

module.exports = SupportedCryptoCurrencysHourlyPricesFlusher;

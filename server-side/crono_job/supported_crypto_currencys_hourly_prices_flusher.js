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

  /*
    Create prices object
  */
  var prices

  try {
    prices = JSON.parse(fs.readFileSync(`${__dirname}\\..\\temp\\${config.basis.hourly_prices.data_temp}`, 'utf8'))
    prices = prices.shift()
  } catch {
    prices = {}
  }

  try {
    fs.unlinkSync(`${__dirname}\\..\\temp\\${config.basis.hourly_prices.data_temp}`)
  } catch(err) {
    Log(config.basis.error_log_prefix, {
      current: 'SupportedCryptoCurrencysHourlyPricesFlusher',
      step: 'Delete old temp file',
      error: err
    })
  }

  try {
      fs.writeFileSync( `${__dirname}\\..\\temp\\${config.basis.hourly_prices.data_temp}`, JSON.stringify(prices))
  } catch(err) {
    Log(config.basis.error_log_prefix, {
      current: 'SupportedCryptoCurrencysHourlyPricesFlusher',
      step: 'Create new temp file',
      error: err
    })
  }

}

module.exports = SupportedCryptoCurrencysHourlyPricesFlusher;

const config = require('../config')
const fs = require('fs')
const fetch = require('node-fetch');

/*
Modular functions
*/
const Log = require('../functions/log')
const BREP = require('../functions/binance_random_endpoint')
const RandomString = require('../functions/random_string')

/*
  : Void
*/
const SupportedCryptoCurrencysHourlyPricesUpdater = function() {

  /*
    Create prices object
  */
  var prices
  var jobTime = Math.round(Date.now() / 1000).toString()

  try {
    prices = JSON.parse(fs.readFileSync(`${__dirname}\\..\\temp\\${config.basis.hourly_prices.data_temp}`, 'utf8'))
  } catch {
    prices = {}
  }

  prices[jobTime] = []

  for (var i = 0; i < config.supported_crypto_currencys.length; i++) {
    createPrices(config.supported_crypto_currencys[i])
    prices[jobTime].push({ crypto_currency: config.supported_crypto_currencys[i], data:JSON.parse(fs.readFileSync(`${__dirname}\\..\\temp\\${config.supported_crypto_currencys[i]}_PRICES_TEMP`, 'utf8'))})
  }

  // Create new temp
  createNewTemp(prices, config.basis.hourly_prices.data_temp)

}


/*
  : Void
*/
function deleteOldTemp(tempFile) {
  try {
    fs.unlinkSync(`${__dirname}\\..\\temp\\${tempFile}`)
  } catch(err) {
    Log(config.basis.error_log_prefix, {
      current: 'DailyChangeStatisticsUpdater',
      step: 'Delete old temp file',
      error: err
    })
  }
}

/*
  : Void
*/
function createNewTemp(data, tempFile) {
  try {
      fs.writeFileSync( `${__dirname}\\..\\temp\\${tempFile}`, JSON.stringify(data))
  } catch(err) {
    Log(config.basis.error_log_prefix, {
      current: 'DailyChangeStatisticsUpdater',
      step: 'Create new temp file',
      error: err
    })
  }
}

/*
  : Void
*/

function createPrices(symbol) {

  function getResponse(endPoint) {
    fetch(endPoint + `/api/v3/ticker/price?symbol=${symbol}USDT`)
    .then(res => res.json())
    // Successfully got 24hr data from binance servers
    .then(body => interpretingCurrencys(body))
    // Couldn't connect that binance endpoint
    .catch(async function() {
      /*
      Choose random binance endpoint
      and get response from there
      */
      await Wait(config.basis.delay)
      getResponse(BREP())
    })
  }

  function interpretingCurrencys(rawUsdtData) {
    if (rawUsdtData === null || rawUsdtData === undefined) {
      return Log(config.basis.error_log_prefix, {
        current: 'SupportedCryptoCurrencysHourlyPricesUpdater',
        step: 'interpreting currencys',
        error: "Unknown error handled"
      })
    }

    function getRates() {

      var symbols = ''
      for (var i = 0; i < config.supported_currencys.length; i++) {
        if(i === 0) {
          symbols += `${config.supported_currencys[i]}`
        } else {
          symbols += `,${config.supported_currencys[i]}`
        }
      }

      fetch(config.external.exchangeratesapi.api_endpoint + `/latest?base=USD&symbols=${symbols}`)
      .then(res => res.json())
      // Successfully got USD EUR TRY exchange rates from server
      .then(body => {
        result = []

        for (var i = 0; i < config.supported_currencys.length; i++) {
          result.push({
            currency: config.supported_currencys[i],
            result: {
              price: rawUsdtData.price * config.basis.usdtusd * body.rates[config.supported_currencys[i]],
            }
          })
        }

        /*
          Delete old temp
        */
        deleteOldTemp(`${symbol}_PRICES_TEMP`)
        /*
          Create new temp
        */
        createNewTemp(result, `${symbol}_PRICES_TEMP`)

      })
    }

    getRates()
  }

  /*
  Choose random binance endpoint
  and get response from there
  */
  getResponse(BREP())
}

module.exports = SupportedCryptoCurrencysHourlyPricesUpdater;

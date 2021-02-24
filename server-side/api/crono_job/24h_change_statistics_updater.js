const config = require('../config')
const fs = require('fs')
const fetch = require('node-fetch');

/*
Modular functions
*/
const Log = require('../functions/log')
const BREP = require('../functions/binance_random_endpoint')
const Wait = require('../functions/wait')

/*
  : Void
*/
const DailyChangeStatisticsUpdater = function() {

  // Delete old temp
  try {
    deleteOldTemp(config.basis.daily_statistics.data_temp)
  } catch(err) {
    Log(config.basis.error_log_prefix, {
      current: 'DailyChangeStatisticsUpdater',
      step: 'Delete old temp file',
      error: err
    })
  }

  /*
    Create statistics
  */
  var statistics = {}

  for (var i = 0; i < config.supported_crypto_currencys.length; i++) {
    createStatistics(config.supported_crypto_currencys[i])
    statistics[config.supported_crypto_currencys[i]] = JSON.parse(fs.readFileSync(`${__dirname}\\..\\temp\\${config.supported_crypto_currencys[i]}_STATISTICS_TEMP`, 'utf8'))
  }

  // Create new temp
  createNewTemp(statistics, config.basis.daily_statistics.data_temp)

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

function createStatistics(symbol) {

  function getResponse(endPoint) {
    fetch(endPoint + `/api/v3/ticker/24hr?symbol=${symbol}USDT`)
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
        current: 'DailyChangeStatisticsUpdater',
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
        result = {

          openTime: rawUsdtData.openTime,
          closeTime: rawUsdtData.closeTime,
          priceChangePercent: rawUsdtData.priceChangePercent,

          prices: []
        }

        for (var i = 0; i < config.supported_currencys.length; i++) {
          result.prices.push({
            currency: config.supported_currencys[i],
            result: {
              priceChange: rawUsdtData.priceChange * config.basis.usdtusd * body.rates[config.supported_currencys[i]],
              weightedAvgPrice: rawUsdtData.weightedAvgPrice * config.basis.usdtusd * body.rates[config.supported_currencys[i]],
              prevClosePrice: rawUsdtData.prevClosePrice * config.basis.usdtusd * body.rates[config.supported_currencys[i]],
              lastPrice: rawUsdtData.lastPrice * config.basis.usdtusd * body.rates[config.supported_currencys[i]],
              bidPrice: rawUsdtData.bidPrice * config.basis.usdtusd * body.rates[config.supported_currencys[i]],
              askPrice: rawUsdtData.askPrice * config.basis.usdtusd * body.rates[config.supported_currencys[i]],
              openPrice: rawUsdtData.openPrice * config.basis.usdtusd * body.rates[config.supported_currencys[i]],
              highPrice: rawUsdtData.highPrice * config.basis.usdtusd * body.rates[config.supported_currencys[i]],
              lowPrice: rawUsdtData.lowPrice * config.basis.usdtusd * body.rates[config.supported_currencys[i]]
            }
          })
        }

        /*
          Delete old temp
        */
        deleteOldTemp(`${symbol}_STATISTICS_TEMP`)
        /*
          Create new temp
        */
        createNewTemp(result, `${symbol}_STATISTICS_TEMP`)

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

module.exports = DailyChangeStatisticsUpdater;

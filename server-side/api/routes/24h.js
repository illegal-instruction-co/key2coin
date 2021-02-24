var express = require('express');
var router = express.Router();

const config = require('../config')

const fetch = require('node-fetch');

/*
Modular functions
*/
const Log = require('../functions/log')
const BREP = require('../functions/binance_random_endpoint')
const Wait = require('../functions/wait')

router.get('/', function(req, res, next) {
  res.json({
    routes: [
      {
        method: "GET",
        end_point: "/crypto_currency/:symbol"
      },
      {
        method: "GET",
        end_point: "/currency/:symbol"
      }
    ],
    message: `24 hour rolling window price change statistics`
  });
});

/*
Route information:
Gets currency informations filtered by
cryptocurrency
*/
router.get('/crypto_currency', function(req, res, next) {

  res.json({
    error: 'missed parameters',
    expected: [
      "symbol"
    ]
  })

  /*
  Request log
  */
  requestLog(req,res)
})

router.get('/crypto_currency/:symbol', function(req, res, next) {

  function getResponse(endPoint) {
    fetch(endPoint + `/api/v3/ticker/24hr?symbol=${req.params.symbol}USDT`)
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
    if (rawUsdtData === null || rawUsdtData === undefined) return res.json( { error: "Unknown error handled" } )

    function getRates() {
      fetch(config.external.exchangeratesapi.api_endpoint + `/latest?base=USD&symbols=EUR,TRY`)
      .then(res => res.json())
      // Successfully got USD EUR TRY exchange rates from server
      .then(body => {
        res.json({

          openTime: rawUsdtData.openTime,
          closeTime: rawUsdtData.closeTime,
          priceChangePercent: rawUsdtData.priceChangePercent,

          prices: [
            {
              currency: "USD",
              result: {
                priceChange: rawUsdtData.priceChange * config.basis.usdtusd,
                weightedAvgPrice: rawUsdtData.weightedAvgPrice * config.basis.usdtusd,
                prevClosePrice: rawUsdtData.prevClosePrice * config.basis.usdtusd,
                lastPrice: rawUsdtData.lastPrice * config.basis.usdtusd,
                bidPrice: rawUsdtData.bidPrice * config.basis.usdtusd,
                askPrice: rawUsdtData.askPrice * config.basis.usdtusd,
                openPrice: rawUsdtData.openPrice * config.basis.usdtusd,
                highPrice: rawUsdtData.highPrice * config.basis.usdtusd,
                lowPrice: rawUsdtData.lowPrice * config.basis.usdtusd
              }
            },
            {
              currency: "EUR",
              result: {
                priceChange: rawUsdtData.priceChange * config.basis.usdtusd * body.rates.EUR,
                weightedAvgPrice: rawUsdtData.weightedAvgPrice * config.basis.usdtusd * body.rates.EUR,
                prevClosePrice: rawUsdtData.prevClosePrice * config.basis.usdtusd * body.rates.EUR,
                lastPrice: rawUsdtData.lastPrice * config.basis.usdtusd * body.rates.EUR,
                bidPrice: rawUsdtData.bidPrice * config.basis.usdtusd * body.rates.EUR,
                askPrice: rawUsdtData.askPrice * config.basis.usdtusd * body.rates.EUR,
                openPrice: rawUsdtData.openPrice * config.basis.usdtusd * body.rates.EUR,
                highPrice: rawUsdtData.highPrice * config.basis.usdtusd * body.rates.EUR,
                lowPrice: rawUsdtData.lowPrice * config.basis.usdtusd * body.rates.EUR
              },
            },
            {
              currency: "TRY",
              result: {
                priceChange: rawUsdtData.priceChange * config.basis.usdtusd * body.rates.TRY,
                weightedAvgPrice: rawUsdtData.weightedAvgPrice * config.basis.usdtusd * body.rates.TRY,
                prevClosePrice: rawUsdtData.prevClosePrice * config.basis.usdtusd * body.rates.TRY,
                lastPrice: rawUsdtData.lastPrice * config.basis.usdtusd * body.rates.TRY,
                bidPrice: rawUsdtData.bidPrice * config.basis.usdtusd * body.rates.TRY,
                askPrice: rawUsdtData.askPrice * config.basis.usdtusd * body.rates.TRY,
                openPrice: rawUsdtData.openPrice * config.basis.usdtusd * body.rates.TRY,
                highPrice: rawUsdtData.highPrice * config.basis.usdtusd * body.rates.TRY,
                lowPrice: rawUsdtData.lowPrice * config.basis.usdtusd * body.rates.TRY
              },
            }
          ]
        })
      })
      // Couldn't connect that exchange rates api endpoint
      .catch(async function() {
        await Wait(config.basis.delay)
        interpretingCurrencys(rawUsdtData)
      })
    }

    getRates()
  }

  /*
  Choose random binance endpoint
  and get response from there
  */
  getResponse(BREP())

  /*
  Request log
  */
  requestLog(req,res)

});

/*
Route information:
Gets cryptocurrency informations filtered by
currency
*/
router.get('/currency', function(req, res, next) {
  res.json({
    error: 'missed parameters',
    expected: [
      "symbol"
    ]
  })

  /*
  Request log
  */
  requestLog(req,res)
})

router.get('/currency/:symbol', function(req, res, next) {

  function getRates() {
    fetch(config.external.exchangeratesapi.api_endpoint + `/latest?base=USD&symbols=${req.params.symbol}`)
    .then(res => res.json())
    // Successfully got USD ${symbol} exchange rates from server
    .then(body => {
      res.json()
    })
    .catch(async function() {
      await Wait(config.basis.delay)
      getRates()
    })
  }

  function interpretingCryptoCurrencys() {

  }

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
    request_end_point: req.url,
    request_parameters: req.params,
    request_method: req.method,
    response_status: 200
  })
}

module.exports = router;

var express = require('express');
var router = express.Router();

const config = require('../config')

const fetch = require('node-fetch');

/*
  Modular functions
*/
const Log = require('../functions/log')
const BREP = require('../functions/binance_random_endpoint')

router.get('/', function(req, res, next) {
  res.json({
    crypto_currencys: [
      "BTC",
      "ETH",
      "LTC",
      "DOGE",
      "GRT",
      "XRP"
    ],
    currencys: [
      "EUR",
      "USD",
      "TRY"
    ],
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

router.get('/crypto_currency/:symbol', function(req, res, next) {

  function getResponse(endPoint) {
    fetch(endPoint + `/api/v3/ticker/24hr?symbol=${req.params.symbol}USDT`)
      .then(res => res.json())
      // Successfully got 24hr data from binance servers
      .then(body => interpretingCurrencys(body))
      // Couldn't connect that binance endpoint
      .catch(function() {
        /*
          Choose random binance endpoint
          and get response from there
        */
        getResponse(BREP())
      })
  }

  function interpretingCurrencys(rawUsdtData) {
    if (rawUsdtData === null || rawUsdtData === undefined) return res.json( { error: "Unknown error handled" } )
    res.json(rawUsdtData)
  }

  /*
    Choose random binance endpoint
    and get response from there
  */
  getResponse(BREP())

  /*
    Request log
  */
  Log(config.basis.log_prefix, {
    request_end_point: req.url,
    request_parameters: req.params,
    request_method: req.method,
    response_status: 200
  })

});

router.get('/currency/:symbol', function(req, res, next) {
  res.json({})

  /*
    Request log
  */
  Log(config.basis.log_prefix, {
    request_end_point: req.url,
    request_parameters: req.params,
    request_method: req.method,
    response_status: 200
  })
});

module.exports = router;

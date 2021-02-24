/*
  Colors
*/
const Colors = require('./utilitys/colors')
const Time = require('./utilitys/time')

const Config = {}

Config.branding = {
  /*
    Project name:
  */
  project_name: "K2C"
}

Config.development = {
  /*
    Development port
  */
  port: 3000
}

Config.basis = {
  /*
    Terminal logs for
    error debugging
  */
  terminal_logs: true,
  log_prefix: Colors.FgCyan + '[LOG]' + Colors.Reset,
  error_log_prefix: Colors.FgRed + '[ERROR]' + Colors.Reset,

  /*
    USDT/USD assumption
  */
  usdtusd: 1.05,

  /*
    Regular delay for
    necessary points
  */
  delay: 10,

  /*
    JWT
  */
  JWT: {
    secret_key_lenght: 20,
    secret_key_temp: 'jwt_secret_key_temp',
  },
}

/*
  External stuff
*/
Config.external = {

  /*
    Rest API
  */

  // Binance
  binance: {
    api_key: '33taJBXlKmY5aCRopQob1tlPo99rq9zouUtSwjdj3KIaH1HXjxs04iQmgqpC3uMv',
    secret_key: 'vXeRToDha0ujyNZRdY6VYv8WhubYWW0g6SHEjZ1FZD6kaqgoWhBq4HXofK63H6sv',
    api_endpoints: [
      "https://api.binance.com",
      "https://api1.binance.com",
      "https://api2.binance.com",
      "https://api3.binance.com"
    ]
  },

  // Exchange Rate API
  exchangeratesapi: {
    api_endpoint: "https://api.exchangeratesapi.io"
  }

}

/*
  Cronojobs
*/
Config.crono = {

  jobs: [
      {
        job: "jwt_secret_key_generator",
        timer: Time.day
      }
  ]

}


module.exports = Config;

const config = require('../config')

/*
  : String
*/

const BREP = function() {
  const random = Math.floor(Math.random() * config.external.binance.api_endpoints.length);
  return config.external.binance.api_endpoints[random]
}

module.exports = BREP;

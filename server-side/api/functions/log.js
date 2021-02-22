const config = require('../config')

/*
  : Void
*/
const Log = function(...params) {
  if(config.basis.terminal_logs) {
    console.log(...params)
  }
}

module.exports = Log;

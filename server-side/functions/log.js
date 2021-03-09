const config = require('../config')

/*
  : Void
*/
const Log = function(...params) {
  if(config.basis.terminal_logs) {
    console.log(config.branding.project_name, ...params)
  }
}

module.exports = Log;

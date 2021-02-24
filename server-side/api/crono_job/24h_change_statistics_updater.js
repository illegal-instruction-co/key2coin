const config = require('../config')
const fs = require('fs')

/*
Modular functions
*/
const Log = require('../functions/log')

/*
  : Void
*/
const DailyChangeStatisticsUpdater = function() {

  // Delete old temp
  try {
    fs.unlinkSync(`${__dirname}\\..\\temp\\${config.basis.daily_statistics.data_temp}`)
  } catch(err) {
    Log(config.basis.error_log_prefix, {
      current: 'DailyChangeStatisticsUpdater',
      step: 'Delete old temp file',
      error: err
    })
  }

  // Create new temp
  try {
      fs.writeFileSync( `${__dirname}\\..\\temp\\${config.basis.daily_statistics.data_temp}`, 'Hello world!')
  } catch(err) {
    Log(config.basis.error_log_prefix, {
      current: 'DailyChangeStatisticsUpdater',
      step: 'Create new temp file',
      error: err
    })
  }

}

module.exports = DailyChangeStatisticsUpdater;

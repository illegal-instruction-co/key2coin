const config = require('../config')

/*
Modular functions
*/
const Log = require('../functions/log')

/*
  : Void
*/

var el

const CronoJobs = function() {
  try {
    for (var i = 0; i < config.crono.jobs.length; i++) {
      el = config.crono.jobs[i]
      if(el.run_at_start) require(`.\\${el.job}`)()
      runJob(el)
    }
  } catch(err) {
    Log(config.basis.error_log_prefix, {
      current: 'CronoJobManager',
      step: 'Scheduling jobs',
      error: err
    })
  }
}

function runJob(el) {
  setInterval(function(){
    try {
      Log(config.basis.log_prefix, {
        current: 'CronoJobManager',
        running: el.job
      })
      require(`.\\${el.job}`)()
    } catch(err) {
      Log(config.basis.error_log_prefix, {
        current: 'CronoJobManager',
        step: 'Running job',
        error: err
      })
    }
  },
    el.timer
  )
}
module.exports = CronoJobs;

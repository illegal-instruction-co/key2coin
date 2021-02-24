const config = require('../config')

/*
  : Void
*/

var el

const CronoJobs = function() {
  for (var i = 0; i < config.crono.jobs.length; i++) {
    el = config.crono.jobs[i]

    setInterval(function(){
      require(`.\\${el.job}`)()
    },
      el.timer
    )
  }

}

module.exports = CronoJobs;

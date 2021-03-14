module.exports = (sequelize, Sequelize) => {
    const CronJobs = sequelize.define("cron_jobs", {
      job: {
        type: Sequelize.STRING
      },
      timer: {
        type: Sequelize.STRING(20)
      },
      start:{
        type: Sequelize.BOOLEAN
      }
    });
    return CronJobs;
};

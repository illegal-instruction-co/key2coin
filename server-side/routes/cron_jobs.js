module.exports = function(app, userAuthMiddleWare) {
    const cron_jobs = require("../controllers/cron_jobs.js");
  
    var router = require("express").Router();
  
    // Create a new cron_jobs
    router.post("/", userAuthMiddleWare, cron_jobs.create);
  
    // Retrieve all cron_jobs
    router.get("/", cron_jobs.findAll);
  
    // Retrieve a single cron_jobs with id
    router.get("/:id", cron_jobs.findOne);
  
    // Update a cron_jobs with id
    router.put("/:id", userAuthMiddleWare, cron_jobs.update);
  
    // Delete a cron_jobs with id
    router.delete("/:id", userAuthMiddleWare, cron_jobs.delete);
  
    // Delete all cron_jobs
    router.delete("/", userAuthMiddleWare, cron_jobs.deleteAll);
  
    app.use('/api/cron-jobs', router);
  };
  
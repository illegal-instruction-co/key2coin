const db = require("../models");
const CronJobs = db.cron_jobs;
const Op = db.Sequelize.Op;

// Create and Save a new CronJobs
exports.create = (req, res) => {
  // Validate request
  if (!req.body.job) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a CronJobs
  const cron_jobs = {
    job:req.body.job,
    timer:req.body.timer,
    start:req.body.start,
  };

  // Save CronJobs in the database
  CronJobs.create(cron_jobs)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the CronJobs."
      });
    });
};

// Retrieve all CronJobs from the database.
exports.findAll = (req, res) => {
  const key = req.query.key;
  var condition = key ? { key: { [Op.like]: `%${key}%` } } : null;

  CronJobs.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving CronJobs."
      });
    });
};

// Find a single CronJobs with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  CronJobs.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving CronJobs with id=" + id
      });
    });
};

// Update a CronJobs by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  CronJobs.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "CronJobs was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update CronJobs with id=${id}. Maybe CronJobs was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating CronJobs with id=" + id
      });
    });
};

// Delete a CronJobs with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  CronJobs.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "CronJobs was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete CronJobs with id=${id}. Maybe CronJobs was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete CronJobs with id=" + id
      });
    });
};

// Delete all CronJobs from the database.
exports.deleteAll = (req, res) => {
  CronJobs.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} CronJobs were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all CronJobs."
      });
    });
};


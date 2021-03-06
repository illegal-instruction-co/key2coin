const db = require("../models");
const Parameters = db.parameters;
const Op = db.Sequelize.Op;

// Create and Save a new Parameters
exports.create = (req, res) => {
  // Validate request
  if (!req.body.parameter) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Parameters
  const parameters = {
    parameter:req.body.parameter,
    name:req.body.name,
    value_:req.body.value_,
  };

  // Save Parameters in the database
  Parameters.create(parameters)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Parameters."
      });
    });
};

// Retrieve all Parameters from the database.
exports.findAll = (req, res) => {
  const key = req.query.key;
  var condition = key ? { key: { [Op.like]: `%${key}%` } } : null;

  Parameters.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Parameters."
      });
    });
};

// Find a single Parameters with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Parameters.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Parameters with id=" + id
      });
    });
};

// Update a Parameters by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Parameters.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Parameters was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Parameters with id=${id}. Maybe Parameters was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Parameters with id=" + id
      });
    });
};

// Delete a Parameters with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Parameters.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Parameters was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Parameters with id=${id}. Maybe Parameters was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Parameters with id=" + id
      });
    });
};

// Delete all Parameters from the database.
exports.deleteAll = (req, res) => {
  Parameters.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Parameters were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Parameters."
      });
    });
};


const db = require("../models");
const Translates = db.translates;
const Op = db.Sequelize.Op;

// Create and Save a new Translates
exports.create = (req, res) => {
  // Validate request
  if (!req.body.key) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Translates
  const translates = {
    key: req.body.key,
    value_: req.body.value_
  };

  // Save Translates in the database
  Translates.create(translates)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Translates."
      });
    });
};

// Retrieve all translates from the database.
exports.findAll = (req, res) => {
  const language_id = req.query.language_id;
  var condition = language_id ? { language_id: { [Op.like]: `%${language_id}%` } } : null;

  Translates.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving translates."
      });
    });
};

// Find a single Translates with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Translates.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Translates with id=" + id
      });
    });
};

// Update a Translates by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Translates.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Translates was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Translates with id=${id}. Maybe Translates was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Translates with id=" + id
      });
    });
};

// Delete a Translates with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Translates.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Translates was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Translates with id=${id}. Maybe Translates was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Translates with id=" + id
      });
    });
};

// Delete all translates from the database.
exports.deleteAll = (req, res) => {
  Translates.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} translates were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all translates."
      });
    });
};

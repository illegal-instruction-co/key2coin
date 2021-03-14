const db = require("../models");
const Currencies = db.currencies;
const Op = db.Sequelize.Op;

// Create and Save a new Currencies
exports.create = (req, res) => {
  // Validate request
  if (!req.body.currency) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Currencies
  const currencies = {
    currency:req.body.currency,
    currency_code:req.body.currency_code,
    currency_symbol:req.body.currency_symbol,
  };

  // Save Currencies in the database
  Currencies.create(currencies)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Currencies."
      });
    });
};

// Retrieve all Currencies from the database.
exports.findAll = (req, res) => {
  const key = req.query.key;
  var condition = key ? { key: { [Op.like]: `%${key}%` } } : null;

  Currencies.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Currencies."
      });
    });
};

// Find a single Currencies with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Currencies.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Currencies with id=" + id
      });
    });
};

// Update a Currencies by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Currencies.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Currencies was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Currencies with id=${id}. Maybe Currencies was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Currencies with id=" + id
      });
    });
};

// Delete a Currencies with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Currencies.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Currencies was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Currencies with id=${id}. Maybe Currencies was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Currencies with id=" + id
      });
    });
};

// Delete all Currencies from the database.
exports.deleteAll = (req, res) => {
  Currencies.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Currencies were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Currencies."
      });
    });
};


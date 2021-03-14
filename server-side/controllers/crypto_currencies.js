const db = require("../models");
const CryptoCurrencies = db.crypto_currencies;
const Op = db.Sequelize.Op;

// Create and Save a new CryptoCurrencies
exports.create = (req, res) => {
  // Validate request
  if (!req.body.crypto) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a CryptoCurrencies
  const crypto_currencies = {
    crypto:req.body.crypto,
    crypto_code:req.body.crypto_code,
    status:req.body.status,
  };

  // Save CryptoCurrencies in the database
  CryptoCurrencies.create(crypto_currencies)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the CryptoCurrencies."
      });
    });
};

// Retrieve all CryptoCurrencies from the database.
exports.findAll = (req, res) => {
  const key = req.query.key;
  var condition = key ? { key: { [Op.like]: `%${key}%` } } : null;

  CryptoCurrencies.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving CryptoCurrencies."
      });
    });
};

// Find a single CryptoCurrencies with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  CryptoCurrencies.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving CryptoCurrencies with id=" + id
      });
    });
};

// Update a CryptoCurrencies by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  CryptoCurrencies.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "CryptoCurrencies was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update CryptoCurrencies with id=${id}. Maybe CryptoCurrencies was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating CryptoCurrencies with id=" + id
      });
    });
};

// Delete a CryptoCurrencies with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  CryptoCurrencies.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "CryptoCurrencies was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete CryptoCurrencies with id=${id}. Maybe CryptoCurrencies was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete CryptoCurrencies with id=" + id
      });
    });
};

// Delete all CryptoCurrencies from the database.
exports.deleteAll = (req, res) => {
  CryptoCurrencies.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} CryptoCurrencies were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all CryptoCurrencies."
      });
    });
};


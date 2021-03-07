const db = require("../models");
const Sales = db.sales;
const Op = db.Sequelize.Op;

// Create and Save a new Sales
exports.create = (req, res) => {
  // Validate request
  if (!req.body.full_name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Sales
  const sales = {
    crypto_name:req.body.crypto_name,
    crypto_voucher_total:req.body.crypto_voucher_total,
    full_name:req.body.full_name,
    key_:req.body.key_,
    payment_total:req.body.payment_total,
    rate_of_exchange:req.body.rate_of_exchange
      
  };

  // Save Sales in the database
  Sales.create(sales)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Sales."
      });
    });
};

// Retrieve all Sales from the database.
exports.findAll = (req, res) => {
  const key = req.query.key;
  var condition = key ? { key: { [Op.like]: `%${key}%` } } : null;

  Sales.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Sales."
      });
    });
};

// Find a single Sales with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Sales.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Sales with id=" + id
      });
    });
};

// Update a Sales by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Sales.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Sales was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Sales with id=${id}. Maybe Sales was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Sales with id=" + id
      });
    });
};

// Delete a Sales with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Sales.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Sales was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Sales with id=${id}. Maybe Sales was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Sales with id=" + id
      });
    });
};

// Delete all Sales from the database.
exports.deleteAll = (req, res) => {
  Sales.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Sales were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Sales."
      });
    });
};


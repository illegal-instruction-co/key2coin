const db = require("../models");
const Redeems = db.redeems;
const Op = db.Sequelize.Op;

// Create and Save a new Redeems
exports.create = (req, res) => {
  // Validate request
  if (!req.body.sales_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Redeems
  const redeems = {
    email:req.body.email,
    status:req.body.status,
    expiry_date:req.body.expiry_date,
    sales_id:req.body.sales_id
  };

  // Save Redeems in the database
  Redeems.create(redeems)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Redeems."
      });
    });
};

// Retrieve all Redeems from the database.
exports.findAll = (req, res) => {
  const key = req.query.key;
  var condition = key ? { key: { [Op.like]: `%${key}%` } } : null;

  Redeems.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Redeems."
      });
    });
};

// Find a single Redeems with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Redeems.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Redeems with id=" + id
      });
    });
};

// Update a Redeems by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Redeems.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Redeems was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Redeems with id=${id}. Maybe Redeems was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Redeems with id=" + id
      });
    });
};

// Delete a Redeems with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Redeems.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Redeems was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Redeems with id=${id}. Maybe Redeems was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Redeems with id=" + id
      });
    });
};

// Delete all Redeems from the database.
exports.deleteAll = (req, res) => {
  Redeems.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Redeems were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Redeems."
      });
    });
};


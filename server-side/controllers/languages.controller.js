const db = require("../models");
const Languages = db.languages;
const Op = db.Sequelize.Op;

// Create and Save a new Languages
exports.create = (req, res) => {
  // Validate request
  if (!req.body.language) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Languages
  const languages = {
    language: req.body.language,
    short_name: req.body.short_name,
    value: req.body.value
  };

  // Save Languages in the database
  Languages.create(languages)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Languages."
      });
    });
};

// Retrieve all languages from the database.
exports.findAll = (req, res) => {
  const language = req.query.language;
  var condition = language ? { language: { [Op.like]: `%${language}%` } } : null;

  Languages.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving languages."
      });
    });
};

// Find a single Languages with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Languages.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Languages with id=" + id
      });
    });
};

// Update a Languages by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Languages.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Languages was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Languages with id=${id}. Maybe Languages was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Languages with id=" + id
      });
    });
};

// Delete a Languages with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Languages.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Languages was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Languages with id=${id}. Maybe Languages was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Languages with id=" + id
      });
    });
};

// Delete all languages from the database.
exports.deleteAll = (req, res) => {
  Languages.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} languages were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all languages."
      });
    });
};


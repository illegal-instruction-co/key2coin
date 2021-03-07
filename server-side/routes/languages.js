module.exports = app => {
  const languages = require("../controllers/languages.controller.js");

  var router = require("express").Router();

  // Create a new Languages
  router.post("/", languages.create);

  // Retrieve all Languages
  router.get("/", languages.findAll);

  // Retrieve a single Languages with id
  router.get("/:id", languages.findOne);

  // Update a Languages with id
  router.put("/:id", languages.update);

  // Delete a Languages with id
  router.delete("/:id", languages.delete);

  // Delete all languages
  router.delete("/", languages.deleteAll);

  app.use('/api/languages', router);
};

module.exports = function(app, userAuthMiddleWare) {
  const languages = require("../controllers/languages.js");

  var router = require("express").Router();

  // Create a new Languages
  router.post("/", userAuthMiddleWare, languages.create);

  // Retrieve all Languages
  router.get("/", languages.findAll);

  // Retrieve a single Languages with id
  router.get("/:id", languages.findOne);

  // Update a Languages with id
  router.put("/:id", userAuthMiddleWare, languages.update);

  // Delete a Languages with id
  router.delete("/:id", userAuthMiddleWare, languages.delete);

  // Delete all languages
  router.delete("/", userAuthMiddleWare, languages.deleteAll);

  app.use('/api/languages', router);
};

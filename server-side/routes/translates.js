module.exports = app => {
    const translates = require("../controllers/translates.js");

    var router = require("express").Router();

    // Create a new translates
    router.post("/", translates.create);

    // Retrieve all translates
    router.get("/", translates.findAll);

    // Retrieve a single translates with id
    router.get("/:id", translates.findOne);

    // Update a translates with id
    router.put("/:id", translates.update);

    // Delete a translates with id
    router.delete("/:id", translates.delete);

    // Delete all translates
    router.delete("/", translates.deleteAll);

    app.use('/api/translates', router);
  };

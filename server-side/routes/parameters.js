module.exports = function(app, userAuthMiddleWare) {
    const parameters = require("../controllers/parameters.js");

    var router = require("express").Router();

    // Create a new parameters
    router.post("/", parameters.create);

    // Retrieve all parameters
    router.get("/", parameters.findAll);

    // Retrieve a single parameters with id
    router.get("/:id", parameters.findOne);

    // Update a parameters with id
    router.put("/:id", parameters.update);

    // Delete a parameters with id
    router.delete("/:id", parameters.delete);

    // Delete all parameters
    router.delete("/", parameters.deleteAll);

    app.use('/api/parameters', router);
  };

module.exports = function(app, userAuthMiddleWare) {
    const parameters = require("../controllers/parameters.js");

    var router = require("express").Router();

    // Create a new parameters
    router.post("/", userAuthMiddleWare, parameters.create);

    // Retrieve all parameters
    router.get("/", parameters.findAll);

    // Retrieve a single parameters with id
    router.get("/:id", parameters.findOne);

    // Update a parameters with id
    router.put("/:id", userAuthMiddleWare, parameters.update);

    // Delete a parameters with id
    router.delete("/:id", userAuthMiddleWare, parameters.delete);

    // Delete all parameters
    router.delete("/", userAuthMiddleWare, parameters.deleteAll);

    app.use('/api/parameters', router);
  };

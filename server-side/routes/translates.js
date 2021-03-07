module.exports = function(app, userAuthMiddleWare) {
    const translates = require("../controllers/translates.js");

    var router = require("express").Router();

    // Create a new translates
    router.post("/", userAuthMiddleWare, translates.create);

    // Retrieve all translates
    router.get("/", translates.findAll);

    // Retrieve a single translates with id
    router.get("/:id", translates.findOne);

    // Update a translates with id
    router.put("/:id", userAuthMiddleWare, translates.update);

    // Delete a translates with id
    router.delete("/:id", userAuthMiddleWare, translates.delete);

    // Delete all translates
    router.delete("/", userAuthMiddleWare, translates.deleteAll);

    app.use('/api/translates', router);
  };

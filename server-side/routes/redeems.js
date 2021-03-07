module.exports = app => {
    const redeem = require("../controllers/redeems.js");

    var router = require("express").Router();

    // Create a new redeem
    router.post("/", redeem.create);

    // Retrieve all redeem
    router.get("/", redeem.findAll);

    // Retrieve a single redeem with id
    router.get("/:id", redeem.findOne);

    // Update a redeem with id
    router.put("/:id", redeem.update);

    // Delete a redeem with id
    router.delete("/:id", redeem.delete);

    // Delete all redeem
    router.delete("/", redeem.deleteAll);

    app.use('/api/redeem', router);
  };

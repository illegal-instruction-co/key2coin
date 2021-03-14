module.exports = function(app, userAuthMiddleWare) {
    const currencies = require("../controllers/currencies.js");
  
    var router = require("express").Router();
  
    // Create a new currencies
    router.post("/", userAuthMiddleWare, currencies.create);
  
    // Retrieve all currencies
    router.get("/", currencies.findAll);
  
    // Retrieve a single currencies with id
    router.get("/:id", currencies.findOne);
  
    // Update a currencies with id
    router.put("/:id", userAuthMiddleWare, currencies.update);
  
    // Delete a currencies with id
    router.delete("/:id", userAuthMiddleWare, currencies.delete);
  
    // Delete all currencies
    router.delete("/", userAuthMiddleWare, currencies.deleteAll);
  
    app.use('/api/currencies', router);
  };
  
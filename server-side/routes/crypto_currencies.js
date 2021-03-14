module.exports = function(app, userAuthMiddleWare) {
    const crypto_currencies = require("../controllers/crypto_currencies.js");
  
    var router = require("express").Router();
  
    // Create a new crypto_currencies
    router.post("/", userAuthMiddleWare, crypto_currencies.create);
  
    // Retrieve all crypto_currencies
    router.get("/", crypto_currencies.findAll);
  
    // Retrieve a single crypto_currencies with id
    router.get("/:id", crypto_currencies.findOne);
  
    // Update a crypto_currencies with id
    router.put("/:id", userAuthMiddleWare, crypto_currencies.update);
  
    // Delete a crypto_currencies with id
    router.delete("/:id", userAuthMiddleWare, crypto_currencies.delete);
  
    // Delete all crypto_currencies
    router.delete("/", userAuthMiddleWare, crypto_currencies.deleteAll);
  
    app.use('/api/crypto-currencies', router);
  };
  
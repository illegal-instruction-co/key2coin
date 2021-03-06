module.exports = app => {
    const sales = require("../controllers/sales.controller.js");
  
    var router = require("express").Router();
  
    // Create a new sales
    router.post("/", sales.create);
  
    // Retrieve all sales
    router.get("/", sales.findAll);
  
    // Retrieve a single sales with id
    router.get("/:id", sales.findOne);
  
    // Update a sales with id
    router.put("/:id", sales.update);
  
    // Delete a sales with id
    router.delete("/:id", sales.delete);
  
    // Delete all sales
    router.delete("/", sales.deleteAll);
  
    app.use('/api/sales', router);
  };
  
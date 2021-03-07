module.exports = function(app, userAuthMiddleWare) {
    const sales = require("../controllers/sales.js");

    var router = require("express").Router();

    /*
      Create a new sales
      This route will be using by payment provider's call back
    */
    router.post("/", sales.create);

    /*
      Retrieve all sales
      This route will be using by admin panel
    */
    router.get("/", sales.findAll);

    /*
      Retrieve a single sales with id
      This route will be using by admin panel
    */
    router.get("/:id", sales.findOne);

    /*
      Update a sales with id
      This route will be using by admin panel
    */
    router.put("/:id", sales.update);

    /*
      Delete a sales with id
      This route will be using by admin panel
    */
    router.delete("/:id", sales.delete);

    /*
      Delete all sales
      This route will be using by admin panel
    */
    router.delete("/", sales.deleteAll);

    app.use('/api/sales', router);
  };

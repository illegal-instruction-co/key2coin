module.exports = function(app, userAuthMiddleWare) {
    const redeem = require("../controllers/redeems.js");

    var router = require("express").Router();

    /*
      Create a new redeem
      This route will be using by client-side
    */
    router.post("/", redeem.create);

    /*
      Retrieve all redeem
      This route will be using by admin panel
    */
    router.get("/", redeem.findAll);

    /*
      Retrieve a single redeem with id
      This route will be using by admin panel
    */
    router.get("/:id", redeem.findOne);

    /*
      Update a redeem with id
      This route will be using by admin panel
    */
    router.put("/:id", redeem.update);

    /*
      Delete a redeem with id
      This route will be using by admin panel
    */
    router.delete("/:id", redeem.delete);

    /*
      Delete all redeem
      This route will be using by admin panel
    */
    router.delete("/", redeem.deleteAll);

    app.use('/api/redeem', router);
  };

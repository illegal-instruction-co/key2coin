module.exports = function(app, userAuthMiddleWare) {
    const translates = require("../controllers/translates.js");

    var router = require("express").Router();

    /*
      Create a new translates
      This route will be using by admin panel
    */
    router.post("/", userAuthMiddleWare, translates.create);

    /*
      Retrieve all translates
      This route will be using by client-side- admin panel
    */
    router.get("/", translates.findAll);

    /*
      Retrieve a single translates with id
      This route will be using by client-side - admin panel
    */
    router.get("/:id", translates.findOne);

    /*
      Update a translates with id
      This route will be using by admin panel
    */
    router.put("/:id", userAuthMiddleWare, translates.update);

    /*
      Delete a translates with id
      This route will be using by admin panel
    */
    router.delete("/:id", userAuthMiddleWare, translates.delete);

    /*
      Delete all translates
      This route will be using by admin panel
    */
    router.delete("/", userAuthMiddleWare, translates.deleteAll);

    app.use('/api/translates', router);
  };

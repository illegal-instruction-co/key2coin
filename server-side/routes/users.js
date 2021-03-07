module.exports = function(app, userAuthMiddleWare) {
    const users = require("../controllers/users.js");

    var router = require("express").Router();

    /*
      Create a new users
      This route will be using by ?
    */
    router.post("/", userAuthMiddleWare, users.create);

    /*
      Retrieve all users
      This route will be using by admin panel
    */
    router.get("/", userAuthMiddleWare, users.findAll);

    /*
      Retrieve a single users with id
      This route will be using by admin panel
    */
    router.get("/:id", userAuthMiddleWare, users.findOne);

    /*
      Update a users with id
      This route will be using by admin panel
    */
    router.put("/:id", userAuthMiddleWare, users.update);

    /*
      Delete a users with id
      This route will be using by admin panel
    */
    router.delete("/:id", userAuthMiddleWare, users.delete);

    /*
      Delete all users
      This route will be using by admin panel
    */
    router.delete("/", userAuthMiddleWare, users.deleteAll);

    app.use('/api/users', router);
  };

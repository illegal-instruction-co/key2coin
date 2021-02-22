var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
    message: "Welcome to K2C API"
  });
});

module.exports = router;

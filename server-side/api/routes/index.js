var express = require('express');
var router = express.Router();

const config = require('../config')

router.get('/', function(req, res, next) {
  res.json({
    message: `Welcome to ${config.branding.project_name} rest API`
  });
});

module.exports = router;

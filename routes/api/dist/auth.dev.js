"use strict";

var express = require('express');

var router = express.Router(); // @router         GET api/auth
// @descreption    Test route
// @access         Public

router.get('/', function (req, res) {
  return res.send('Auth route');
});
module.exports = router;
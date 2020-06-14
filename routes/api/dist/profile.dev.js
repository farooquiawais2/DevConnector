"use strict";

var express = require('express');

var router = express.Router(); // @router         GET api/profile
// @descreption    Test route
// @access         Public

router.get('/', function (req, res) {
  return res.send('Profile route');
});
module.exports = router;
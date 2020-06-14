"use strict";

var express = require('express');

var router = express.Router(); // @router         GET api/users
// @descreption    Test route
// @access         Public

router.get('/', function (req, res) {
  return res.send('User route');
});
module.exports = router;
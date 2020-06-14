"use strict";

var express = require('express');

var router = express.Router(); // @router         GET api/posts
// @descreption    Test route
// @access         Public

router.get('/', function (req, res) {
  return res.send('Posts route');
});
module.exports = router;
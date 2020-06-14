"use strict";

var express = require('express');

var connectDB = require('./config/db'); // Connect DATABASE


connectDB();
var app = express();
app.get('/', function (req, res) {
  return res.send('API Running');
}); // Define Routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
var port = process.env.port || 5000;
app.listen(port, function () {
  return console.log("Example app listening on port ".concat(port, "!"));
});
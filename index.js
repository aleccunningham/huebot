var bot = require('./bot.js');
const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send("Control the lights with /<room>_<event>")
});

app.post('/', function (req, res) {
  bot.respond(req.body)
});

app.listen(5000, function() {
  console.log("Listening on port 5000...")
});

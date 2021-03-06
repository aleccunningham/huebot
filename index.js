var bot = require('./bot.js');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send("Control the lights with /<room>_<event>")
});

app.post('/', function (req, res) {
  bot.respond(req.body)
});

app.listen(process.env.PORT || 5000, function() {
  console.log("Listening on port 5000...")
});

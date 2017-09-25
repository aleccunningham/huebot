var bot;
bot = require('./bot.js');
const express = require('express')
const app = express()

app.route('/')
  .get(function (req, res) {
    res.send("Control the lights with /<room>_<event>")
  })
  .post(function (req, res) {
    bot.respond(req.body)
  })

app.listen(5000, function() {
  console.log("Listening on port 5000...")
})

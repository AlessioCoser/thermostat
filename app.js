'use strict'

var express = require('express')
var fs = require('fs')
var app = express()
var https = require('https')
var server = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/default/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/default/fullchain.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/default/chain.pem')
}, app)

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/thermostat/status', function(req, res) {
  res.json({error: false, response: true})
})

app.post('/thermostat/status', function(req, res) {
  res.json({error: false, response: true})
})

app.get('/thermostat/temperature', function(req, res) {
  res.json({error: false, response: 19.0})
})

app.post('/thermostat/temperature', function(req, res) {
  res.json({error: false, response: 19.0})
})

app.use("/", express.static(__dirname + '/public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

server.listen(5555)
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

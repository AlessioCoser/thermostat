'use strict'

var express = require('express')
var fs = require('fs')
var app = express()
var router = express.Router()
var thermostat = require('./routes/thermostat')
var https = require('https')
var server = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/default/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/default/fullchain.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/default/chain.pem')
}, app)

app.get('/', function (req, res) {
  res.render('index')
})

app.use('/thermostat', thermostat)

app.use("/", express.static(__dirname + '/public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

server.listen(5555)
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

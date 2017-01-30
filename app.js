'use strict'

var path = require('path')
var https = require('https')
var fs = require('fs')
var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var server = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/default/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/default/fullchain.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/default/chain.pem')
}, app)

app.use('/', express.static(path.join(__dirname, '/public')))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index')
})

app.use('/thermostat', require('./routes/thermostat'))
app.use('/schedules', require('./routes/schedules'))

server.listen(5555)
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

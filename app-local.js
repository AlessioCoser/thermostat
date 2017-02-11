'use strict'

var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')

var app = express()

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

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

'use strict'

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const api = require('./api')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/public', express.static(process.cwd() + '/public'))
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`)
  next()
})
app.use('/api/shorturl', api)


app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
})


module.exports = app

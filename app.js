'use strict'

const express = require('express')
const mongo = require('mongodb')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const api = require('./api')

app.use(cors())

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

'use strict'
require('dotenv').config()

const app = require('./app')
const port = process.env.PORT

app.listen(port, function () {
  console.log('Node.js listening ...')
})
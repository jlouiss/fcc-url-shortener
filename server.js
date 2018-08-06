'use strict'

const app = require('./app')
const port = process.env.PORT || 1101

app.listen(port, function () {
  console.log('Node.js listening ...')
})
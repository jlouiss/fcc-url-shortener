'use strict'
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

mongoose.connect(process.env.MONGODB_URL)

const ShortURL = new mongoose.model(
  'ShortURL',
  new mongoose.Schema({
    original_url: String,
    short_url: Number
  })
)

router.post('/new', (req, res) => {
  console.log(req.body)
})

router.get('/:short_url', (req, res) => {

})


module.exports = router
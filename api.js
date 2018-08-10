'use strict'
const express = require('express')
const mongoose = require('mongoose')
const dns = require('dns')
const router = express.Router()

mongoose.connect(process.env.MONGODB_URL)

const ShortURL = mongoose.model(
  'ShortURL',
  new mongoose.Schema({
    original_url: String,
    short_url: Number
  })
)

const invalidUrlResponse = { error: 'invalid URL' }
const urlDoesntExistResponse = { error: 'No short url for given input' }

router.post('/new', (req, res) => {
  const original_url = req.body.url

  dns.lookup(original_url.replace(/https?:\/\//, ''), (err, data) => {
    if (err) return res.json(invalidUrlResponse)

    res.json({ original_url })
  });
})

router.get('/:short_url', (req, res) => {

})


module.exports = router
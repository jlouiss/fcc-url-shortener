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

router.post('/new',
  async function checkURLValidity(req, res, next) {
    await dns.lookup(req.body.url.replace(/^(https?:\/\/)/, ''),
      (err, data) => {
        if (err)
          res.json(invalidUrlResponse)
        else
          next()
      }
    )
  },
  async function checkURLAlreadyExists(req, res, next) {
    await ShortURL.find({ original_url: req.body.url }, (err, data) => {
      if (err) res.json({ err })

      if (data.length > 0) {
        const { original_url, short_url } = data[0]
        res.json({ original_url, short_url })
        res.end()
      } else
        next()
    })
  },
  async (req, res) => {
    const original_url = req.body.url

    // count to get new short_url
    await ShortURL.count((err, count) => {
      if (err) return res.json({ err })

      // insert new record
      const shorturl = new ShortURL({ original_url, short_url: count + 1 })
      shorturl.save((err) => {
        if (err) res.json({ err })

        res.json({
          original_url: shorturl.original_url,
          short_url: shorturl.short_url
        })
      })
    })

  }
)

router.get('/:short_url', async (req, res) => {
  const shortUrlDoesNotExistResponse = { error: 'Missing url for given input' }
  const short_url = req.params.short_url

  ShortURL.find({ short_url }, (err, data) => {
    if (err) res.json({ err })

    if (data.length === 0)
      res.json(shortUrlDoesNotExistResponse)

    if (data.length > 0)
      res.redirect(data[0].original_url)
  })
})


module.exports = router
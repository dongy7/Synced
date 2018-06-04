var express = require('express')
var randomstring = require('randomstring')
var request = require('request')

function configure(redis) {
  var router = express.Router()
  var videos = {}

  function generateRandomString(length) {
    return randomstring.generate(length)
  }

  router.post('/id', function(req, res, next) {
    // TODO: ensure ids are unique
    var videoId = req.body.id
    var id = generateRandomString(11)

    redis.exists(`channel:${id}`, (err, data) => {
      if (err) throw err
      if (data === 0) {
        redis.hmset(
          `channel:${id}`,
          'videoId',
          videoId,
          'count',
          0,
          (err, data) => {
            if (err) throw err
            res.json({
              id: id
            })
          }
        )
      }
    })
  })

  router.get('/valid/:id', function(req, res, next) {
    const id = req.params.id
    redis.exists(`channel:${id}`, (err, data) => {
      if (err) throw err
      res.json({
        valid: data !== 0
      })
    })
  })

  router.get('/video/:id', function(req, res, next) {
    const id = req.params.id
    redis.hget(`channel:${id}`, 'videoId', (err, data) => {
      if (err) throw err
      res.json({
        id: data
      })
    })
  })

  router.get('/title/:id', function(req, res, next) {
    const id = req.params.id
    const apiKey = process.env.YOUTUBE_API_KEY
    request(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${apiKey}`,
      { json: true },
      (err, data, body) => {
        if (err) {
          return console.log(err)
        }

        if (body.items !== undefined && body.items[0] !== undefined) {
          res.json({
            title: body.items[0].snippet.title
          })
        }
      }
    )
  })

  return router
}

module.exports = configure

var express = require('express')
var randomstring = require('randomstring')

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

  return router
}

module.exports = configure

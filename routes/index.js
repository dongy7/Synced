var express = require('express')
var randomstring = require('randomstring')
var router = express.Router()

var videos = {}

function generateRandomString(length) {
  return randomstring.generate(length)
}

router.post('/id', function(req, res, next) {
  // TODO: ensure ids are unique
  var videoId = req.body.id
  var id = generateRandomString(11)

  if (!(id in videos)) {
    videos[id] = videoId
  }

  res.json({
    id: id
  })
})

router.get('/valid/:id', function(req, res, next) {
  res.json({
    valid: req.params.id in videos
  })
})

router.get('/video/:id', function(req, res, next) {
  res.json({
    id: videos[req.params.id]
  })
})

module.exports = router

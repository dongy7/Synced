var express = require('express')
var animals = require('../utils/names')

function configure(redis) {
  var router = express.Router()

  router.get('/channel/:id', function(req, res) {
    var id = req.params.id
    redis.hget(`channel:${id}`, 'count', (err, data) => {
      var count = Math.max(data - 1, 0)
      var num =
        count >= animals.length
          ? ' ' + (Math.floor(count / animals.length) + 1)
          : ''
      var name = 'Anonymous ' + animals[count % animals.length] + num
      res.json(name)
    })
  })

  return router
}

module.exports = configure

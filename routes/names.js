var express = require('express');
var router = express.Router();
var animals = require('../utils/names')

var channels = {}

router.get('/channel/:id', function(req, res) {
  var id = req.params.id
  if (!(id in channels)) {
    channels[id] = {
      count: 0
    }
  }

  var count = channels[id].count
  var num = count >= animals.length ? ' ' + (Math.floor(count/animals.length)+1) : ''
  var name = 'Anonymous ' + animals[count % animals.length] + num
  channels[id].count++

  res.json(name)
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

function createApp(client) {
  var indexRouter = require('./routes/index')(client)
  var namesRouter = require('./routes/names')(client)

  var app = express()

  app.use(logger('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())

  // serve CRA build
  app.use('/', express.static(`${__dirname}/client/build`))

  app.use('/api', indexRouter)
  app.use('/api/names', namesRouter)

  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, 'client/build', 'index.html'))
  })

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404))
  })

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
  })

  return app
}

module.exports = createApp

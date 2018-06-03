module.exports = (io, redis) => {
  io.on('connection', socket => {
    socket.on('channel', id => {
      redis.hincrby(`channel:${id}`, 'count', 1, (err, data) => {
        socket.join(id)
      })
    })

    socket.on('pauseRequest', data => {
      io.sockets.in(data.id).emit('pause')
    })

    socket.on('playRequest', data => {
      io.sockets.in(data.id).emit('ready')
    })

    var checkReady = data => {
      var key = `channel:${data.id}`
      redis.hincrby(key, 'ready', 1, (err, readyCount) => {
        redis.hget(key, 'count', (err, count) => {
          if (parseInt(readyCount) >= parseInt(count)) {
            redis.hset(key, 'ready', 0, (err, rep) => {
              io.sockets.in(data.id).emit('play')
            })
          }
        })
      })
    }

    socket.on('ready', data => {
      checkReady(data)
    })

    socket.on('seekReady', data => {
      checkReady(data)
    })

    socket.on('seekRequest', data => {
      if (data.paused) {
        io.sockets.in(data.id).emit('seek', {
          time: data.time
        })
      } else {
        io.sockets.in(data.id).emit('readySeek', {
          time: data.time
        })
      }
    })

    socket.on('sendMessage', data => {
      io.sockets.in(data.id).emit('messageReceived', data)
    })

    socket.on('disconnecting', reason => {
      const rooms = Object.keys(socket.rooms)
      rooms.forEach(room => {
        const key = `channel:${room}`
        redis.exists(key, (err, count) => {
          if (count === 1) {
            redis.hincrby(key, 'count', -1, (err, remaining) => {
              if (remaining <= 0) {
                redis.del(key, (err, number) => {
                  console.log(`${number} deleted`)
                })
              }
            })
          }
        })
      })
    })
  })
}

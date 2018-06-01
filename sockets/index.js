module.exports = io => {
  const channels = {}

  io.on('connection', socket => {
    socket.on('channel', (id) => {
      if (!channels[id]) {
        channels[id] = {
          numClients: 0,
          readyCount: 0
        }
      }

      channels[id].numClients++
      socket.join(id)
    })

    socket.on('pauseRequest', (data) => {
      io.sockets.in(data.id).emit('pause')
    })

    socket.on('playRequest', (data) => {
      io.sockets.in(data.id).emit('ready')
    })

    socket.on('ready', (data) => {
      const channel = channels[data.id]
      channel.readyCount++
      if (channel.readyCount === channel.numClients) {
        channel.readyCount = 0
        io.sockets.in(data.id).emit('play')
      }
    })

    socket.on('seekReady', (data) => {
      const channel = channels[data.id]
      channel.readyCount++
      if (channel.readyCount === channel.numClients) {
        channel.readyCount = 0
        io.sockets.in(data.id).emit('play')
      }
    })

    socket.on('seekRequest', (data) => {
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

    socket.on('disconnecting', (reason) => {
      const rooms = Object.keys(socket.rooms)
      rooms.forEach(room => {
        if (channels[room]) {
          channels[room].numClients--
          if (channels[room].numClients === 0) {
            delete channels[room]
          }
        }
      })
    })
  })
}
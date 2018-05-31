module.exports = io => {
  let numClients = 0
  let readyCount = 0

  io.on('connection', socket => {
    numClients++
    socket.on('pauseRequest', () => {
      io.emit('pause')
    })

    socket.on('playRequest', () => {
      io.emit('ready')
    })

    socket.on('ready', () => {
      readyCount++
      if (readyCount === numClients) {
        readyCount = 0
        io.emit('play')
      }
    })

    socket.on('seekReady', (data) => {
      readyCount++
      if (readyCount === numClients) {
        readyCount = 0
        io.emit('play')
      }
    })

    socket.on('seekRequest', (data) => {
      if (data.paused) {
        io.emit('seek', {
          time: data.time
        })
      } else {
        io.emit('readySeek', {
          time: data.time
        })
      }
    })

    socket.on('disconnect', () => {
      numClients--
    })
  })
}
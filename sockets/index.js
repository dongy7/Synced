module.exports = io => {
  let numClients = 0
  let readyCount = 0

  io.on('connection', socket => {
    numClients++
    // console.log('connected')
    socket.on('pause', () => {
      // console.log('client paused')
      io.emit('pause')
    })

    socket.on('playRequest', () => {
      console.log('client requested play')
      io.emit('ready')
    })

    socket.on('ready', () => {
      readyCount++
      console.log(`ready: ${readyCount}/${numClients}`)
      if (readyCount === numClients) {
        readyCount = 0
        console.log('everyone ready to play')
        io.emit('play')
      }
    })

    socket.on('disconnect', () => {
      numClients--
    })
  })
}
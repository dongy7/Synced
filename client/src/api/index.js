import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:3001')

export const subscribe = (callbacks) => {
  socket.on('connect', () => {
    console.log('connected to server')
  })

  socket.on('pause', () => {
    callbacks.pause()
  })

  socket.on('ready', () => {
    callbacks.ready()
  })

  socket.on('play', () => {
    callbacks.play()
  })

  socket.on('seek', (data) => {
    callbacks.seek(data.time)
  })

  socket.on('readySeek', (data) => {
    callbacks.readySeek(data.time)
  })
}

export const requestPause = () => {
  socket.emit('pauseRequest')
}

export const requestPlay = () => {
  socket.emit('playRequest')
}

export const ready = () => {
  socket.emit('ready')
}

export const requestSeek = (config) => {
  socket.emit('seekRequest', config)
}

export const readySeek = (time) => {
  socket.emit('seekReady', {time})
}
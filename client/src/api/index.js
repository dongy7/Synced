import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:3001')

export const subscribe = (callbacks) => {
  socket.on('connect', () => {
    console.log('connected')
  })

  socket.on('pause', () => {
    // console.log('server paused')
    callbacks.pause()
  })

  socket.on('ready', () => {
    callbacks.ready()
  })

  socket.on('play', () => {
    // console.log('server played')
    callbacks.play()
  })

  socket.on()
}

export const pause = () => {
  console.log('pausing video')
  socket.emit('pause')
}

export const play = () => {
  socket.emit('playRequest')
}

export const ready = () => {
  console.log('client ready')
  socket.emit('ready')
}
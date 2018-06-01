import openSocket from 'socket.io-client'

export class Hanlder {
  constructor(id) {
    this.socket = openSocket('http://localhost:3001')
    this.id = id
    this.socket.on('connect', () => {
      this.socket.emit('channel', this.id)
    })
  }

  subscribe(callbacks) {
    this.socket.on('pause', () => {
      callbacks.pause()
    })
  
    this.socket.on('ready', () => {
      callbacks.ready()
    })
  
    this.socket.on('play', () => {
      callbacks.play()
    })
  
    this.socket.on('seek', (data) => {
      callbacks.seek(data.time)
    })
  
    this.socket.on('readySeek', (data) => {
      callbacks.readySeek(data.time)
    })
  }

  requestPause() {
    this.socket.emit('pauseRequest', {id: this.id})
  }

  requestPlay() {
    this.socket.emit('playRequest', {id: this.id})
  }

  ready() {
    this.socket.emit('ready', {id: this.id})
  }

  requestSeek(config) {
    this.socket.emit('seekRequest', Object.assign({}, config, {id: this.id}))
  }

  readySeek(time) {
    this.socket.emit('seekReady', {id: this.id, time})
  }
}

// export const subscribe = (id, callbacks) => {
//   console.log('subscribing')
//   socket.on('connect', () => {
//     console.log('connected to server')
//     socket.emit('channel', id)
//   })

//   socket.on('pause', () => {
//     callbacks.pause()
//   })

//   socket.on('ready', () => {
//     callbacks.ready()
//   })

//   socket.on('play', () => {
//     callbacks.play()
//   })

//   socket.on('seek', (data) => {
//     callbacks.seek(data.time)
//   })

//   socket.on('readySeek', (data) => {
//     callbacks.readySeek(data.time)
//   })
// }

// export const requestPause = (id) => {
//   socket.emit('pauseRequest', {id})
// }

// export const requestPlay = (id) => {
//   socket.emit('playRequest', {id})
// }

// export const ready = (id) => {
//   socket.emit('ready', {id})
// }

// export const requestSeek = (id, config) => {
//   socket.emit('seekRequest', Object.assign({}, config, id))
// }

// export const readySeek = (id, time) => {
//   socket.emit('seekReady', {id, time})
// }
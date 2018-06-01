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
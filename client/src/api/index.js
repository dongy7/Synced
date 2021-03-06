import openSocket from 'socket.io-client'

export const validateId = id => {
  return fetch(`/api/valid/${id}`).then(res => res.json())
}

export const getVideoInfo = id => {
  console.log(id)
  return getId(id)
    .then(res => res.id)
    .then(videoId => fetch(`/api/title/${videoId}`))
    .then(res => res.json())
}

export const createId = videoId => {
  return fetch('/api/id', {
    method: 'POST',
    body: JSON.stringify({
      id: videoId
    }),
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json())
}

export const getId = id => {
  return fetch(`/api/video/${id}`).then(res => res.json())
}

export class Handler {
  constructor(id) {
    const url =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3001'
        : `${process.env.REACT_APP_SOCKET_URL}`
    this.socket = openSocket(url)
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

    this.socket.on('seek', data => {
      callbacks.seek(data.time)
    })

    this.socket.on('readySeek', data => {
      callbacks.readySeek(data.time)
    })
  }

  subscribeChat(callbacks) {
    this.socket.on('messageReceived', data => {
      callbacks.messageReceived(data)
    })
  }

  requestPause() {
    this.socket.emit('pauseRequest', { id: this.id })
  }

  requestPlay() {
    this.socket.emit('playRequest', { id: this.id })
  }

  ready() {
    this.socket.emit('ready', { id: this.id })
  }

  requestSeek(config) {
    this.socket.emit('seekRequest', Object.assign({}, config, { id: this.id }))
  }

  readySeek(time) {
    this.socket.emit('seekReady', { id: this.id, time })
  }

  sendMessage(msg) {
    this.socket.emit('sendMessage', Object.assign({}, msg, { id: this.id }))
  }
}

import React from 'react'
import YoutubePlayer from 'youtube-player'
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import ProgressBar from './ProgressBar'
import { Handler } from '../api'
import { getWidth, getHeight } from '../utils'

class Player extends React.Component {
  static stateNames = {
    '-1': 'unstarted',
    0: 'ended',
    1: 'playing',
    2: 'paused',
    3: 'buffering',
    5: 'cued'
  }

  static getState = event => Player.stateNames[event.data]

  constructor(props) {
    super(props)
    this.handler = props.handler
    this.state = {
      duration: 1,
      currentTime: 0,
      playerWidth: 0,
      playerHeight: 0
    }
  }

  componentDidMount() {
    this.boundingBox = this.element.getBoundingClientRect()
    this.setState({
      width: this.boundingBox.width,
      left: this.boundingBox.left
    })

    let controlBox = this.control.getBoundingClientRect()
    let playerWidth = getWidth(controlBox.width)
    let playerHeight = getHeight(playerWidth)

    window.addEventListener('resize', () => {
      controlBox = this.control.getBoundingClientRect()
      this.boundingBox = this.element.getBoundingClientRect()
      this.setState({
        width: this.boundingBox.width,
        left: this.boundingBox.left
      })
      
      playerWidth = getWidth(controlBox.width)
      playerHeight = getHeight(playerWidth)
      this.player.setSize(playerWidth, playerHeight)
    })

    this.player = YoutubePlayer(this.refPlayer, {
      width: playerWidth,
      height: playerHeight,
      videoId: this.props.id,
      playerVars: {
        controls: 0,
        showinfo: 0,
      }
    })

    this.setSubscription()

    this.player.on('ready', () => {
      this.player.getDuration().then(val => this.setState({ duration: val }))
    })

    this.player.on('stateChange', event => {
      if (Player.getState(event) === 'playing') {
        const interval = 50;
        this.timer = setInterval(() => {
          this.setState({
            currentTime: this.state.currentTime + interval/1000
          })
        }, interval)
      } else {
        clearInterval(this.timer)
      }
    })
  }

  setSubscription() {
    this.handler.subscribe({
      pause: () => {
        this.player.pauseVideo()
      },
      play: () => {
        this.player.playVideo()
      },
      ready: () => {
        this.player.playVideo()
        this.setState({
          buffering: true
        }, () => {
          const listener = this.player.on('stateChange', event => {
            if (Player.getState(event) === 'playing') {
              this.player.off(listener)
              this.setState({ buffering: false }, () => {
                this.player.pauseVideo().then(() => {
                  this.handler.ready(this.props.id)
                })
              })
            }
          })
        })
      },
      readySeek: (time) => {
        this.player.seekTo(time).then(() => {
          this.setState({
            currentTime: time
          })
        })
        this.setState({
          buffering: true
        }, () => {
          const listener = this.player.on('stateChange', event => {
            const state = Player.getState(event)
            if (state === 'playing' || state === 'paused') {
              this.player.off(listener)
              this.setState({ buffering: false }, () => {
                this.player.pauseVideo().then(() => {
                  this.handler.readySeek(time)
                })
              })
            }
          })
        })
      },
      seek: (time) => {
        this.player.seekTo(time).then(() => {
          this.setState({
            currentTime: time
          })
        })
      }
    })
  }

  handlePlayClick() {
    this.handler.requestPlay(this.props.id)
  }

  handlePauseClick() {
    this.handler.requestPause(this.props.id)
  }

  handleProgressClick(progress) {
    const seekTime = this.state.duration * progress;
    this.player.getPlayerState().then(val => {
      const state = Player.stateNames[val]
      this.handler.requestSeek({
        time: seekTime,
        paused: state === 'paused'
      })
    })
  }

  render() {
    return (
      <Card>
        <div className="player" ref={element => {
          this.refPlayer = element
        }}/>
        <div className="control" ref={element => {this.control = element}}>
          <IconButton>
            <PlayArrowIcon onClick={() => this.handlePlayClick()} />
          </IconButton>
          <IconButton>
            <PauseIcon onClick={() => this.handlePauseClick()} />
          </IconButton>
          <div 
            className="control-progress"
            ref={element => {this.element = element}}
            onClick={(e) => {
              const progress = e.nativeEvent.pageX - this.state.left
              this.handleProgressClick((progress/this.state.width))
            }}
          >
            <ProgressBar
              completed={this.state.currentTime/this.state.duration}
            />
          </div>
        </div>
      </Card>
    )
  }
}

export default Player
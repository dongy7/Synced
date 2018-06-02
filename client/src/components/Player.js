import React from 'react'
import YoutubePlayer from 'youtube-player'
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import ReplayIcon from '@material-ui/icons/Replay'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import VolumeDownIcon from '@material-ui/icons/VolumeDown'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import ProgressBar from './ProgressBar'
import TimerText from './TimerText'
import VolumeSlider from './VolumeSlider'
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
    this.prevVolume = 100
    this.state = {
      duration: 1,
      currentTime: 0,
      currentSeconds: 0,
      playerWidth: 0,
      playerHeight: 0,
      playing: false,
      ended: false,
      volume: 100
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
        disablekb: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0
      }
    })

    this.setSubscription()

    this.player.on('ready', () => {
      this.player.getDuration().then(val => this.setState({ duration: val }))
    })

    this.interval = setInterval(() => {
      this.player.getCurrentTime().then(time => {
        this.setState({
          currentSeconds: time
        })
      })
    }, 500)

    this.player.on('stateChange', event => {
      if (Player.getState(event) === 'ended') {
        this.setState({
          ended: true
        })
      } else {
        this.setState({
          ended: false
        })
      }

      if (Player.getState(event) === 'playing') {
        const interval = 50
        this.timer = setInterval(() => {
          this.setState({
            currentTime: this.state.currentTime + interval / 1000
          })
        }, interval)
        this.setState({
          playing: true
        })
      } else {
        clearInterval(this.timer)
        this.setState({
          playing: false
        })
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
        this.setState(
          {
            buffering: true
          },
          () => {
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
          }
        )
      },
      readySeek: time => {
        this.player.seekTo(time).then(() => {
          this.setState({
            currentTime: time
          })
        })
        this.setState(
          {
            buffering: true
          },
          () => {
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
          }
        )
      },
      seek: time => {
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

  handleReplayClick() {
    this.handler.requestSeek({
      time: 0,
      paused: false
    })
  }

  handleProgressClick(progress) {
    const seekTime = this.state.duration * progress
    this.player.getPlayerState().then(val => {
      const state = Player.stateNames[val]
      this.handler.requestSeek({
        time: seekTime,
        paused: state === 'paused'
      })
    })
  }

  handleVolumeClick() {
    const volume = this.state.volume
    const nextVolume = volume > 0 ? 0 : this.prevVolume
    this.setState({
      volume: nextVolume
    })
    this.player.setVolume(nextVolume)
  }

  renderVolumeIcon() {
    const volume = this.state.volume
    if (volume === 0) {
      return <VolumeOffIcon />
    } else if (volume < 50) {
      return <VolumeDownIcon />
    } else {
      return <VolumeUpIcon />
    }
  }

  renderControlIcon() {
    if (this.state.ended) {
      return <ReplayIcon onClick={() => this.handleReplayClick()} />
    } else if (this.state.playing) {
      return <PauseIcon onClick={() => this.handlePauseClick()} />
    } else {
      return <PlayArrowIcon onClick={() => this.handlePlayClick()} />
    }
  }

  render() {
    return (
      <Card>
        <div
          className="player"
          ref={element => {
            this.refPlayer = element
          }}
        />
        <div>
          <div
            className="control-progress"
            ref={element => {
              this.element = element
            }}
            onClick={e => {
              const progress = e.nativeEvent.pageX - this.state.left
              this.handleProgressClick(progress / this.state.width)
            }}
          >
            <ProgressBar
              completed={this.state.currentTime / this.state.duration}
            />
          </div>
        </div>
        <div
          className="control"
          ref={element => {
            this.control = element
          }}
        >
          <IconButton>{this.renderControlIcon()}</IconButton>
          <div className="player-volume-button">
            {
              <IconButton onClick={() => this.handleVolumeClick()}>
                {this.renderVolumeIcon()}
              </IconButton>
            }
          </div>
          <div className="player-volume-control">
            <VolumeSlider
              value={this.state.volume}
              onSliderChange={val => {
                this.setState({ volume: val })
                this.player.setVolume(val)
                if (val > 0) {
                  this.prevVolume = val
                }
              }}
            />
          </div>
          <TimerText
            currentTime={this.state.currentSeconds}
            totalTime={this.state.duration}
          />
        </div>
      </Card>
    )
  }
}

export default Player

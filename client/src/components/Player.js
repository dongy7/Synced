import React, { Fragment } from 'react'
import YoutubePlayer from 'youtube-player'
import IconButton from '@material-ui/core/IconButton'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import { subscribe, requestPause, requestPlay, ready } from '../api'
import ProgressBar from './ProgressBar'

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: 0,
      buffering: false,
      totalTime: 1,
      duration: 1,
      currentTime: 0
    }

    subscribe({
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
                  ready()
                })
              })
            }
          })
        })
      }
    })
  }

  static stateNames = {
    '-1': 'unstarted',
    0: 'ended',
    1: 'playing',
    2: 'paused',
    3: 'buffering',
    5: 'cued'
  }

  static getState = event => Player.stateNames[event.data]

  componentDidMount() {
    this.player = YoutubePlayer(this.refPlayer, {
      width: '100%',
      height: '100%',
      videoId: 'i0p1bmr0EmE',
      playerVars: {
        controls: 0,
        showinfo: 0,
      }
    })

    this.listeners = {
      pauseListener: this.player.on('stateChange', event => {
        if (!this.state.buffering) {
          if (Player.getState(event) === 'pause') {
            pause()
          }
        }
      })
    }

    this.player.on('stateChange', event => {
      if (Player.getState(event) === 'playing') {
        const interval = 10;
        this.timer = setInterval(() => {
          this.setState({
            currentTime: this.state.currentTime + interval/1000
          })
        }, interval)
      } else {
        clearInterval(this.timer)
      }
    })

    this.player.on('ready', () => {
      this.player.getDuration().then(val => this.setState({ duration: val }))
    })
  }

  handlePlay() {
    requestPlay()
  }

  handlePause() {
    requestPause()
  }

  handleProgressClick(percent) {
    const seekTime = this.state.duration * percent;
    clearInterval(this.timer)
    this.setState({
      currentTime: seekTime,
    })
    this.player.seekTo(seekTime)
  }

  render() {
    return (
      <Fragment>
        <div className="player" ref={element => {
          this.refPlayer = element
        }}/>
        <div>
          <IconButton>
            <PlayArrowIcon onClick={() => this.handlePlay()} />
          </IconButton>
          <IconButton>
            <PauseIcon onClick={() => this.handlePause()} />
          </IconButton>
          <ProgressBar
            completed={this.state.currentTime/this.state.duration}
            onClick={(progress) => {
              this.handleProgressClick(progress)
            }}
          />
        </div>
      </Fragment>
    )
  }
}

export default Player
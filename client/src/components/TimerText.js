import React from 'react'
import { getTime } from '../utils'

class TimerText extends React.Component {
  render() {
    const { min: currMin, sec: currSec } = getTime(this.props.currentTime)
    const { min: totalMin, sec: totalSec } = getTime(this.props.totalTime - 1)
    return (
      <span className="player-timer">{`${currMin}:${currSec} / ${totalMin}:${totalSec}`}</span>
    )
  }
}

export default TimerText

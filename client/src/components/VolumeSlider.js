import React from 'react'
import Slider from '@material-ui/lab/Slider'

class VolumeSlider extends React.Component {
  render() {
    return (
      <Slider
        value={this.props.value}
        onChange={(e, val) => this.props.onSliderChange(val)}
      />
    )
  }
}

export default VolumeSlider

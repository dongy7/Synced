import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

class LinearDeterminate extends React.Component {
  componentDidMount() {
    this.boundingBox = this.element.getBoundingClientRect()
    this.setState({
      width: this.boundingBox.width
    })

    window.addEventListener('resize', () => {
      this.boundingBox = this.element.getBoundingClientRect()
      this.setState({
        width: this.boundingBox.width
      })
    })
  }

  render() {
    return (
      <div ref={element => {this.element = element}}>
        <LinearProgress
          variant="determinate"
          value={this.props.completed * 100}
          // onClick={(e) => {
          //   console.log(e.nativeEvent.offsetX)
          //   const percent = e.nativeEvent.offsetX/this.boundingBox.width
          //   this.props.onClick(percent)
          // }}
        />
      </div>
    );
  }
}

export default LinearDeterminate;
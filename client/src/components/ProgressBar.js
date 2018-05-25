import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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
          value={this.props.completed}
          onClick={(e) => console.log(e.nativeEvent.offsetX)}
        />
      </div>
    );
  }
}

export default LinearDeterminate;
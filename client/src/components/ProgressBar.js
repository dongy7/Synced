import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

class LinearDeterminate extends React.Component {
  render() {
    return (
      <LinearProgress variant="determinate" value={this.props.completed} />
    );
  }
}

export default LinearDeterminate;
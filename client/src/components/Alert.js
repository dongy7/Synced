import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';

class Alert extends React.Component {
  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={this.props.open}
        autoHideDuration={2000}
        onClose={() => this.props.onClose()}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Code copied to clipboard</span>}
      />
    )
  }
}

export default Alert
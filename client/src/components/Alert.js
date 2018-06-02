import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

class Alert extends React.Component {
  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={this.props.open}
        message={<span id="message-id">{this.props.message}</span>}
        autoHideDuration={2000}
        onClose={() => this.props.onClose()}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => this.props.onClose()}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    )
  }
}

export default Alert

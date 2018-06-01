import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

class Prompt extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: ''
    }
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={() => this.props.onClose()}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <DialogContentText>
              Enter a new nickname.
            </DialogContentText>
            <TextField
              value={this.state.value}
              onChange={e => {
                this.setState({
                  name: e.target.value
                })
              }}
              autoFocus
              margin="dense"
              label="Nickname"
              fullWidth
              placeholder="Nickname"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.onClose()} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.props.onSubmit(this.state.name)} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default Prompt
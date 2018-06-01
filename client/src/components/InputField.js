import React from 'react'
import TextField from '@material-ui/core/TextField'

class InputField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      val: ''
    }
  }
  
  render() {
    return (
      <TextField
        value={this.state.val}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          style: {
            textAlign: 'center'
          }
        }}
        placeholder="Enter YouTube URL"
        fullWidth
        margin="normal"
        onChange={(e) => {
          this.setState({
            val: e.target.value
          })
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            this.props.onEntered(this.state.val)
          }
        }}
      />
    )
  }
}

export default InputField
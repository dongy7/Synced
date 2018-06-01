import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Prompt from './Prompt'

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  }
}

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              YouTube Sync
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                this.setState({
                  open: true
                })
              }}
            >
              {this.props.name}
            </Button>
            <Prompt
              open={this.state.open}
              onClose={() => {
                this.setState({
                  open: false
                })
              }}
              onSubmit={name => {
                this.setState({
                  open: false
                })
                this.props.onNameSubmit(name)
              }}
            />
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(Navbar)

import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'auto',
    maxWidth: 360,
    minHeight: '460px',
    backgroundColor: theme.palette.background.paper,
  },
})

class Chat extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const { classes } = this.props

    return (
      <div className="chat">
        <List className={classes.root} subheader={<ListSubheader>Chat</ListSubheader>}>
          {this.props.messages.map(message => (
            <ListItem divider>
              <ListItemText primary={message.author} secondary={message.text} />
            </ListItem>
          ))}
          <div style={{ float:"left", clear: "both" }}
              ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </List>
        <TextField
          fullWidth
          placeholder="Send a message."
        />
      </div>
    )
  }
}

Chat.defaultProps = {
  messages: []
}

export default withStyles(styles)(Chat)
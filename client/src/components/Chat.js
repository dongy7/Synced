import React from 'react'
import Card from '@material-ui/core/Card'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
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
    backgroundColor: theme.palette.background.paper
  }
})

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  render() {
    const { classes } = this.props

    return (
      <div className="chat">
        <Card>
          <List
            className={classes.root}
            subheader={<ListSubheader>Chat</ListSubheader>}
          >
            {this.props.messages.map(message => (
              <ListItem divider>
                <ListItemText
                  primary={message.author}
                  secondary={message.text}
                />
              </ListItem>
            ))}
            <div
              style={{ float: 'left', clear: 'both' }}
              ref={el => {
                this.messagesEnd = el
              }}
            />
          </List>
          <div className="chat-input">
            <TextField
              value={this.state.text}
              fullWidth
              placeholder="Send a message."
              onChange={e =>
                this.setState({
                  text: e.target.value
                })
              }
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  this.props.onMessageSent(this.state.text)
                  this.setState({
                    text: ''
                  })
                }
              }}
            />
          </div>
        </Card>
      </div>
    )
  }
}

Chat.defaultProps = {
  messages: []
}

export default withStyles(styles)(Chat)

import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Player from '../components/Player'
import Chat from '../components/Chat'
import Navbar from '../components/Navbar'
import { Handler } from '../api'

class Main extends Component {
  constructor(props) {
    super(props)
    this.handler = new Handler(this.props.match.params.id)
    this.state = {
      name: 'Anonymous Bear',
      messages: []
    }
  }

  componentDidMount() {
    this.handler.subscribeChat({
      messageReceived: (msg) => {
        this.setState({
          messages: this.state.messages.concat({
            author: msg.author,
            text: msg.text
          })
        })
      }
    })
  }

  render() {
    return (
      <div>
        <Navbar
          name={this.state.name}
          onNameSubmit={name => {
            this.setState({name})
          }}
        />
        <div className="content">
          <Grid container>
            <Grid item xs={8}>
              <div className="player-container">
                <Player
                  id={this.props.match.params.id}
                  name={this.state.name}
                  handler={this.handler}
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <Chat
                id={this.props.match.params.id}
                handler={this.handler}
                messages={this.state.messages}
                onMessageSent={(text) => {
                  this.handler.sendMessage({
                    author: this.state.name,
                    text
                  })
                }}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default Main
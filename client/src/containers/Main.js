import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid'
import Player from '../components/Player'
import Chat from '../components/Chat'
import Navbar from '../components/Navbar'
import { Handler, getId } from '../api'
import { getName } from '../api/name'

class Main extends Component {
  constructor(props) {
    super(props)
    this.id = this.props.match.params.id
    this.handler = new Handler(this.props.match.params.id)
    this.state = {
      name: '',
      messages: [],
      videoId: '',
      loading: true
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

    getName(this.id).then((name) => {
      this.setState({
        name
      })
    })

    getId(this.id).then(res => {
      this.setState({
        loading: false,
        videoId: res.id
      })
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <CircularProgress />
      )
    }

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
                  id={this.state.videoId}
                  name={this.state.name}
                  handler={this.handler}
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <Chat
                id={this.id}
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
import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Player from '../components/Player'
import Chat from '../components/Chat'
import Navbar from '../components/Navbar'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Anonymous Bear'
    }
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
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <Chat></Chat>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default Main
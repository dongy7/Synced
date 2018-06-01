import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Player from '../components/Player'
import Chat from '../components/Chat'

class Main extends Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={7}>
          <div className="player-container">
            <Player
              id={this.props.match.params.id}
            />
          </div>
        </Grid>
        <Grid item xs={4}>
          <Chat></Chat>
        </Grid>
      </Grid>
    )
  }
}

export default Main
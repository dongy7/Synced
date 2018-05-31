import React, { Component } from 'react';
import Player from '../components/Player'

class Main extends Component {
  render() {
    return (
      <div className="container">
        <Player
          id={this.props.match.params.id}
        />
      </div>
    );
  }
}

export default Main
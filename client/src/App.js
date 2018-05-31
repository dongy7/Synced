import React, { Component } from 'react';
import './App.css';
import Player from './components/Player'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <Player />
        </div>
      </div>
    );
  }
}

export default App;
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Landing from './containers/Landing'
import Main from './containers/Main'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Landing} />
          <Route path="/channel/:id" component={Main} />
        </div>
      </Router>
    )
  }
}

export default App

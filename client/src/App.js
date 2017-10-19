// Make sure to import React on every component

import React, { Component } from 'react'

// Rename BrowserRouter to Router
// Switch guarantees that we won't accidentally show multiple Routes at once
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Import your own components after imports from node_modules
import HomePage from './components/home/HomePage'
import BuildPage from './components/idea/BuildPage'
import LogInPage from './components/login/LogInPage'
import NavBar from './components/NavBar'

class App extends Component {
  render () {
    return (
      <Router>
        {/* Router only allows one child component, so we wrap everything in a div. */}
        <div>
          {/* Anything outside of Switch is global and available in every view */}
          {/* This is a good place to add NavBars or Footers */}
          <NavBar />
          <Switch>
            {/* React Router reads routes from the top down and will match the first route it finds */}
            {/* Use exact to guarantee that React Router hits ONLY on path */}
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LogInPage} />
            {/* Adding semicolons creates a wildcard param that you can */}
            {/* access using this.props.match.params */}
            <Route exact path="/build/:userId" component={BuildPage} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './components/Home.jsx';
import MakeGroup from './components/MakeGroup.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/makeGroup" component={MakeGroup} />
        </div>
      </Router>
    );
  }

}

export default App;

import React from 'react';
import Main from './components/Main';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact path="/" component={Main} />
          </Switch>
      </Router>  
    </div>
  );
}

export default App;

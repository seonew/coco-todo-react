import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Home, Login } from 'pages';
import Header from './Header';
import './App.css';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="Layout">
            <Header/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/login" component={Login}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;

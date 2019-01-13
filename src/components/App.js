import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { Home, Login } from 'pages';
import theme from "./theme";
import './App.css';

class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <div className="App">
            <div className="Layout">
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={Login}/>
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }

}

export default App;

import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login/Login'
import reportWebVitals from './reportWebVitals';
import { usuarioAutenticado } from './services/Auth';

const privateRoute = ({ component: Component, ...rest }) => (
  <Route
  {...rest}
  render={props =>
    usuarioAutenticado() ? (
      <Component {...props} />
    ) : (
      <Redirect to={Login} />
    )
  }
  />
);

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login}/>
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

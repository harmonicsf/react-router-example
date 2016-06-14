import React from 'react';
import ReactDOM from 'react-dom';
import request from './request';
import App from './components/App.react';
import { Router, Route, Link, browserHistory, IndexRedirect } from 'react-router'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
  </Router>
), document.getElementById('app'))

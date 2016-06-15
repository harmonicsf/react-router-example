import React from 'react';
import ReactDOM from 'react-dom';
import request from './request';
import App from './components/App.react';
import About from './components/About.react';
import Container from './components/Container.react';
import Word from './components/Word.react';
import { Router, Route, Link, browserHistory, IndexRedirect } from 'react-router'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="main" component={Container}/>
      <Route path="word/:id" component={Word} />
      <Route path="about" component={About}/>
      <IndexRedirect to="/main" />
    </Route>
  </Router>
), document.getElementById('app'))

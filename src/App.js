import React, { Component } from 'react';
import { Router, hashHistory } from 'react-router';
import deparment from './routers/department';
import quality from './routers/quality';
import user from './routers/user';
import org from './routers/org';
import deptCheck from './routers/deptCheck';
import qualityCheck from './routers/qualityCheck';
const routes = {
  childRoutes: [
    { path: '/' }, 
    {
      path: 'home',
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('container/home').default)
        }, 'home')
      },
      childRoutes: [
        user, deparment, quality, org, deptCheck, qualityCheck
      ]
    }, 
    {
      path: 'login',
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('container/login').default)
        }, 'login')
      }
    }, {
      path: 'hospital',
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('container/register/hospital').default)
        }, 'hospital')
      }
    }, {
      path: 'register',
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('container/register').default)
        }, 'register')
      } ,
    }  
  ]
}    

class App extends Component {
  render() {
    return (
      <Router 
        history={hashHistory}
        routes={routes}
      >
      </Router>
    );
  }
}


export default App;

import React, { Component } from 'react';
import { Router, hashHistory } from 'react-router';
import deparment from './routers/department';
import quality from './routers/quality';
import user from './routers/user';
import org from './routers/org';
import deptCheck from './routers/deptCheck';
import qualityCheck from './routers/qualityCheck';
import checkInfo from './routers/checkInfo';
import api from 'api';
import { connect } from 'react-redux';
import { userAction } from 'action';
import { message } from 'antd';
import { fetchData } from 'utils/tools';

//校验用户权限
const checkUser = () => {
  return new Promise((resolve, reject) => {
    fetchData({
      url: api.CHECK_LOGIN,
      error: err => reject(err),
      success: data => resolve(data)
    })  
  })
}  

class App extends Component {
  render() {
    const routes = {
      childRoutes: [
        {
          path: 'home',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('container/home').default)
            }, 'home')
          },
          onEnter: (nextState, replace, next) => {
            checkUser()
              .then(
                (data) => {
                  if (data.status) {
                    this.props.login(data.result)
                  } else {
                    message.warning(data.msg);
                    replace('/login')
                  }
                  next();
                },//成功,通过next()成功跳转
                (err) => {
                  replace('/login')//重定向
                  next()
                }
              )
          },
          onChange: (prevState, nextState, replace, callback) => {
            //alert('onChange!')
            callback();
          },
          childRoutes: [
            user, deparment, quality, org, deptCheck, qualityCheck, checkInfo
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
        }  ,
        {
          path: '*',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('container/error').default)
            }, 'error')
          } ,
        }  
      ]
    }  
    return (
      <Router 
        history={hashHistory}
        routes={routes}
      >
      </Router>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => {
      dispatch(userAction.fetchUser(user));
    }
  }
};

export default connect(null, mapDispatchToProps)(App);

export default {
  path: '/user',//用户信息列表
  getComponent: (nextState, cb) => {
    require.ensure([], (require) => {
      cb(null, require('container/user').default)
    }, 'user')
  },
  childRoutes: [
    {
      path: '/user/userInfo',//用户信息审核
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('container/user/userInfo').default)
        }, 'userinfon')
      }
    },
    {
      path: '/user/add',//用户信息详情 新增/编辑/详情  公用页面
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('container/user/details').default)
        }, 'userAdd')
      }
    }, 
    {
      path: '/user/editPassword',//修改密码
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('component/user/editPwd').default)
        }, 'userAdd')
      }
    }, 
    {
      path: '/user/org/add',//添加机构
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('container/user/org').default)
        }, 'userAdd')
      }
    }, 
    {
      path: '/user/userInfo/:id',//用户信息详情 新增/编辑/详情  公用页面
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('container/user/details').default)
        }, 'userInfoDetails')
      },
      onEnter: (nextState, replace, cb) => {
        if (!nextState.location.state) {
          replace('/user/userInfo')
        }
        cb();
      } 
    }
  ]
}
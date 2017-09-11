export default {
  path: '/department',//科室信息主页
  getComponent: (nextState, cb) => {
    require.ensure([], (require) => {
      cb(null, require('container/department').default)
    }, 'department')
  },
  childRoutes: [
    {
      path: '/department/deptInfo',//科室信息
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('container/department/deptInfo').default)
        }, 'departmentInfo')
      }
    },
    {
      path: '/department/deptInfo/:id',//科室信息详情
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('container/department/details').default)
        }, 'departmentDetails')
      }
    },
    {
      path: '/department/deptReport',//科室上报
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('container/department/report').default)
        }, 'departmentReport')
      }
    }
  ]
}
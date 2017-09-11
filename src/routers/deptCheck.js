export default {
  path: '/check/deptCheckList',//科室审核列表
  getComponent: (nextState, cb) => {
    require.ensure([], (require) => {
      cb(null, require('container/check/deptCheck').default)
    }, 'departmentCheck')
  },
  childRoutes: [
    {
      path: '/check/deptCheckList/:id',//科室审核详情
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('container/check/deptCheckDetail').default)
        }, 'deptCheckDetail')
      }
    }
  ]
}
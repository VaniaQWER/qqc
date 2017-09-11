export default {
  path: '/quality',//质量信息主页
  getComponent: (nextState, cb) => {
    require.ensure([], (require) => {
      cb(null, require('container/quality').default)
    })
  },
  childRoutes: [
    {
      path: '/quality/qualityInfo',//质量信息详情
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('container/quality/qualityInfo').default)
        })
      }
    },
    {
      path: '/quality/qualityInfo/:id',//质量信息详情
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('container/quality/details').default)
        })
      }
    },
    {
      path: '/quality/qualityReport',//质量上报
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('container/quality/report').default)
        })
      }
    }
  ]
}
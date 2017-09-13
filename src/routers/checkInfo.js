export default {
  path: '/check/checkInfo',//全部列表
  getComponent: (nextState, cb) => {
    require.ensure([], (require) => {
      cb(null, require('container/check/checkInfo').default)
    }, 'checkInfo')
  }
}
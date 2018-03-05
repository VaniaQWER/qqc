export default {
  path: '/questionnaire',//科室审核列表
  getComponent: (nextState, cb) => {
    require.ensure([], (require) => {
      cb(null, require('container/questionnaire').default)
    }, 'questionnaire')
  }
}

export default {
  path: '/department',//科室信息主页
  getComponent: (nextState, cb) => {
    require.ensure([], (require) => {
      cb(null, require('container/department').default)
    }, 'department')
  },
  childRoutes: [
    {
      path: '/department/describe',//基线调查说明
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('container/department/describe').default)
        }, 'departmentInfo')
      }
    },
    {
      path: '/department/deptInfo',//科室信息详情
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('container/department/describe').default)
        }, 'departmentInfo')
      }
    },
    // {
    //   path: '/department/deptReport',//科室上报
    //   getComponent: (nextState, cb) => {
    //     require.ensure([], (require) => {
    //       cb(null, require('container/department/report').default)
    //     }, 'departmentReport')
    //   }
    // },
    {
      path: '/department/deptReport1',//1填报人信息
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('container/department/report1').default)
        }, 'departmentReport')
      }
    },
    {
      path: '/department/deptReport2',//2医疗机构基本情况
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('container/department/report2').default)
        }, 'departmentReport')
      }
    },
    {
      path: '/department/deptReport3',//3医学工程部门基本情况
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('container/department/report3').default)
        }, 'departmentReport')
      }
    },
    {
      path: '/department/deptReport4',//4医学工程部任人员情况
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('container/department/report4').default)
        }, 'departmentReport')
      }
    },
    {
      path: '/department/deptReport51',//5.1医疗设备购置管理情况
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('container/department/report51').default)
        }, 'departmentReport')
      }
    },
    {
      path: '/department/deptReport52',//5.2医用耗材采购管理情况
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('container/department/report52').default)
        }, 'departmentReport')
      }
    },
    {
      path: '/department/deptReport53',//5.3医疗设备维修维护状况
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('container/department/report53').default)
        }, 'departmentReport')
      }
    },
    {
      path: '/department/deptReport54',//5.4质量和风险管理
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('container/department/report54').default)
        }, 'departmentReport')
      }
    },
    {
      path: '/department/deptReport61',//6.1设备新信息化现状
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('container/department/report61').default)
        }, 'departmentReport')
      }
    },
    {
      path: '/department/deptReport62',//6.2耗材信息化现状
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('container/department/report62').default)
        }, 'departmentReport')
      }
    }
  ]
}
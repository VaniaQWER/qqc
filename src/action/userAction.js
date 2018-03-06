/**
 * @file 获取用户权限，信息，菜单以及其相关操作
 * @desc 根据
 */
export const FETCH_STARTED = 'USER/FETCH_STARTED';
export const FETCH_SUCCESS = 'USER/FETCH_SUCCESS';
export const FETCH_FAILURE = 'USER/FETCH_FAILURE';
export const REDIRECT_URI = 'USER/REDIRECT';
export const SET_CURRENT = 'USER/SET_CURRENT';
export const RESET = 'USER/RESET';

export const fetchUserStarted = () => ({
  type: FETCH_STARTED
});

export const fetchUserSuccess = (result) => ({
  type: FETCH_SUCCESS,
  result
})

export const fetchUserFailure = (error) => ({
  type: FETCH_FAILURE,
  error
})

export const setCurrentMenu = (current) => ({
  type: SET_CURRENT,
  current
})

export const resetInfo = () => ({
  type: RESET
})

const menus = {
  '09':   [
    {
      id: 'menuID1',
      icon: 'home',
      text: '主页',
      uri: 'home'
    }, {
      id: 'menuID2',
      icon: 'pie-chart',
      text: '科室建设',
      uri: 'department/deptInfo',
      subMenu: [
        {
          id: 'menuID2_sub1',
          text: '科室建设',
          uri: 'department/deptInfo'
        }, {
          id: 'menuID2_sub1',
          text: '科室上报',
          uri: 'department/deptReport'
        }
      ]
    }, {
      id: 'menuID3',
      icon: 'inbox',
      text: '质量管理',
      uri: 'quality/qualityInfo',
      subMenu: [
        {
          id: 'menuID3_sub1',
          text: '质量管理',
          uri: 'quality/qualityInfo'
        }, {
          id: 'menuID3_sub1',
          text: '质量上报',
          uri: 'quality/qualityReport'
        }
      ]
    }, {
      id: 'menuID4',
      icon: 'setting',
      text: '用户管理',
      uri: 'user/userInfo',
      subMenu: [
        {
          id: 'menuID4_sub1',
          text: '用户管理',
          uri: 'user/userInfo'
        }, {
          id: 'menuID4_sub2',
          text: '新增用户',
          uri: 'user/add'
        }
      ]
    }, {
      id: 'menuID5',
      icon: 'folder',
      text: '机构管理',
      uri: 'org/orgInfo',
      subMenu: [
        {
          id: 'menuID5_sub1',
          text: '机构信息',
          uri: 'org/orgInfo'
        }, {
          id: 'menuID5_sub2',
          text: '新增机构',
          uri: 'org/add'
        }
      ]
    }, {
      id: 'menuID6',
      icon: 'area-chart',
      text: '质控报表',
      uri: 'check/checkInfo',
      subMenu: [
        {
          id: 'menuID6_sub0',
          text: '质控报表',
          uri: 'check/checkInfo'
        },
        {
          id: 'menuID6_sub1',
          text: '科室信息审核',
          uri: 'check/deptCheckList'
        }, {
          id: 'menuID6_sub2',
          text: '指标信息审核',
          uri: 'check/qualityCheckList'
        }
      ]
    }
  ],//admin
  '01':   [
    {
      id: 'menuID1',
      icon: 'home',
      text: '主页',
      uri: 'home'
    }, {
      id: 'menuID2',
      icon: 'pie-chart',
      text: '科室建设',
      uri: 'department/deptInfo',
      subMenu: [
        {
          id: 'menuID2_sub1',
          text: '科室建设',
          uri: 'department/deptInfo'
        }, {
          id: 'menuID2_sub1',
          text: '科室上报',
          uri: 'department/deptReport'
        }
      ]
    }, {
      id: 'menuID3',
      icon: 'inbox',
      text: '质量管理',
      uri: 'quality/qualityInfo',
      subMenu: [
        {
          id: 'menuID3_sub1',
          text: '质量管理',
          uri: 'quality/qualityInfo'
        }, {
          id: 'menuID3_sub2',
          text: '质量上报',
          uri: 'quality/qualityReport'
        },  {
          id: 'menuID3_sub3',
          text: '使用上报',
          uri: 'quality/useReport'
        }
      ]
    }, {
      id: 'menuID6',
      icon: 'area-chart',
      text: '质控报表',
      uri: 'check/checkInfo',
      subMenu: [
        {
          id: 'menuID6_sub0',
          text: '质控报表',
          uri: 'check/checkInfo'
        }
      ]
    }
  ],//bjgjg
  "03":   [
    {
      id: 'menuID1',
      icon: 'home',
      text: '主页',
      uri: 'home'
    }, {
      id: 'menuID2',
      icon: 'pie-chart',
      text: '科室建设',
      uri: 'department/deptInfo',
      subMenu: [
        {
          id: 'menuID2_sub1',
          text: '科室建设',
          uri: 'department/deptInfo'
        }
      ]
    }, {
      id: 'menuID3',
      icon: 'inbox',
      text: '质量管理',
      uri: 'quality/qualityInfo',
      subMenu: [
        {
          id: 'menuID3_sub1',
          text: '质量管理',
          uri: 'quality/qualityInfo'
        }
      ]
    } , {
      id: 'menuID6',
      icon: 'area-chart',
      text: '质控报表',
      uri: 'check/checkInfo',
      subMenu: [
        {
          id: 'menuID6_sub0',
          text: '质控报表',
          uri: 'check/checkInfo'
        },
        {
          id: 'menuID6_sub1',
          text: '科室信息审核',
          uri: 'check/deptCheckList'
        }, {
          id: 'menuID6_sub2',
          text: '指标信息审核',
          uri: 'check/qualityCheckList'
        }
      ]
    }
]//jgjg
}

const mockData = {
  user: {
    id: 1,
    userName: '萌萌的拖鞋酱',
    role: '超级管理员'
  }, 
  menus: [{
    id: 'menuID1',
    icon: 'home',
    text: '主页',
    uri: 'home'
  }]
}

//模拟 后台交互获取菜单以及用户信息
export const fetchUser = user => ( 
  dispatch => {
    console.log(user.orgType)
    console.log(menus[user.orgType], 'userAction')
    return     dispatch(fetchUserSuccess(
      Object.assign({}, 
        mockData, {
          user: user,//result.result,
          menus: menus[user.orgType]//list
        }
      )
    ))
  }
)  

export const setCurrent = current => (
  setCurrentMenu(current)
)

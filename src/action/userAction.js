/**
 * @file 获取用户权限，信息，菜单以及其相关操作
 * @desc 根据
 */

export const FETCH_STARTED = 'USER/FETCH_STARTED';
export const FETCH_SUCCESS = 'USER/FETCH_SUCCESS';
export const FETCH_FAILURE = 'USER/FETCH_FAILURE';
export const REDIRECT_URI = 'USER/REDIRECT';
export const SET_CURRENT = 'USER/SET_CURRENT';

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

const mockData = {
  user: {
    id: 1,
    name: '萌萌的拖鞋酱',
    role: '超级管理员'
  }, 
  menus: [
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
      uri: 'check/deptCheckList',
      subMenu: [
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
  ]
}

//模拟 后台交互获取菜单以及用户信息
export const fetchUser = data => ( 
  dispatch => (
    setTimeout(() => dispatch(fetchUserSuccess({...mockData})), 10)
  )  
)  

export const setCurrent = current => (
  setCurrentMenu(current)
)

import { userAction } from 'action';
const { FETCH_SUCCESS } = userAction;

const userData = {
  user: {
    id: 0,
    name: '游客',
    role: '游客'
  },
  menus: [
    {
      id: 'menuID1',
      icon: 'home',
      text: '主页',
      uri: 'home'
    }
  ]
}

export default (state = userData, action) => {
  switch(action.type) {
    case FETCH_SUCCESS: {
      return { ...action.result };
    }
    default: {
      return state;
    }
  }
}
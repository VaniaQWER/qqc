import user from './user';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  user: user
})

export default reducer;
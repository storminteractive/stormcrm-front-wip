import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';

import packagesReducer from './packages/reducer';
//end-of-imports

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  packagesReducer,
  //end-of-reducers
});

export default reducers;
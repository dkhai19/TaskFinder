import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './slices/authReducer';

const combinedReducer = combineReducers({
  authentication: authReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.TYPE === 'RESET') {
    state = {};
  }
  return combinedReducer(state, action);
};

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

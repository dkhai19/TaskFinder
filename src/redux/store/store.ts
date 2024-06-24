import rootReducer from '../rootReducer';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export default store;

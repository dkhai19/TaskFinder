import {combineReducers} from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import userSlice from './slices/userSlice'
import applicationSlice from './slices/applicationSlice'
import taskSlice from './slices/taskSlice'
const combinedReducer = combineReducers({
  authentication: authSlice,
  application: applicationSlice,
  task: taskSlice,
  user: userSlice,
})

const rootReducer = (state: any, action: any) => {
  if (action.TYPE === 'RESET') {
    state = undefined
  }
  return combinedReducer(state, action)
}

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>

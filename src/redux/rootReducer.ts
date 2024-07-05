import {combineReducers} from '@reduxjs/toolkit'
import authReducer from './slices/authReducer'
import applicationReducer from './slices/applicationReducer'
import taskReducer from './slices/taskReducer'

const combinedReducer = combineReducers({
  authentication: authReducer,
  application: applicationReducer,
  task: taskReducer,
})

const rootReducer = (state: any, action: any) => {
  if (action.TYPE === 'RESET') {
    state = {}
  }
  return combinedReducer(state, action)
}

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>

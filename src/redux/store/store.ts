import rootReducer from '../rootReducer'
import {configureStore} from '@reduxjs/toolkit'

const store = configureStore({
  reducer: (state, action) => {
    if (action.type === 'RESET_STORE') {
      return rootReducer(undefined, action)
    }
    return rootReducer(state, action)
  },
})

export type AppDispatch = typeof store.dispatch
export default store

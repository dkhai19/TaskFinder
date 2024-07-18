import {createSlice} from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    displayBottom: true,
  },
  reducers: {
    resetStore: () => {},
    toggleBottomTab(state) {
      state.displayBottom = !state.displayBottom
    },
  },
})

export const {resetStore, toggleBottomTab} = appSlice.actions
export default appSlice.reducer

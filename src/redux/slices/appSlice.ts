import {createSlice} from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {},
  reducers: {
    resetStore: () => {},
  },
})

export const {resetStore} = appSlice.actions

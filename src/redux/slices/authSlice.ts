import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState = {
  uid: '',
  lightThem: true,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserID(state, action: PayloadAction<string>) {
      state.uid = action.payload
    },
    toggleTheme(state) {
      state.lightThem = !state.lightThem
    },
  },
})

export const {setUserID, toggleTheme} = authSlice.actions
export default authSlice.reducer

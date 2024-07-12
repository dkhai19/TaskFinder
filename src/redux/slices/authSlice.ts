import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState = {
  uid: '',
  token: '',
  lightThem: true,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserID(state, action: PayloadAction<string>) {
      state.uid = action.payload
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload
    },
    toggleTheme(state) {
      state.lightThem = !state.lightThem
    },
  },
})

export const {setUserID, toggleTheme, setToken} = authSlice.actions
export default authSlice.reducer

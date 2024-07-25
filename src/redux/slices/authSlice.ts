import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {darkColors, lightColors} from '../../constants/color'

const initialState = {
  uid: '',
  token: '',
  lightThem: true,
  colors: lightColors,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserID(state, action: PayloadAction<string>) {
      state.uid = action.payload
    },
    setStreamToken(state, action: PayloadAction<string>) {
      state.token = action.payload
    },
    toggleTheme(state) {
      state.lightThem = !state.lightThem
    },
    setColors(state) {
      state.colors = state.lightThem ? lightColors : darkColors
    },
  },
})

export const {setUserID, toggleTheme, setStreamToken, setColors} =
  authSlice.actions
export default authSlice.reducer

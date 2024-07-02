import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  uid: '',
  lightThem: true,
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserID(state, action: PayloadAction<string>) {
      state.uid = action.payload;
    },
    toggleTheme(state) {
      state.lightThem = !state.lightThem;
    },
  },
});

export const {setUserID, toggleTheme} = authReducer.actions;
export default authReducer.reducer;

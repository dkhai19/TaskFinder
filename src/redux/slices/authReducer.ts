import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  uid: '',
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserID(state, action: PayloadAction<string>) {
      state.uid = action.payload;
    },
  },
});

export const {setUserID} = authReducer.actions;
export default authReducer.reducer;

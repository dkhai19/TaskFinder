import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {addUser} from '../thunks/userThunks'
import {IUsers} from '../../types/users.type'

interface userState {
  currentUser: IUsers | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: userState = {
  currentUser: null,
  status: 'idle',
  error: null,
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: state => {
      state.currentUser = null
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addUser.pending, state => {
        state.status = 'loading'
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<IUsers>) => {
        state.status = 'succeeded'
        state.currentUser = action.payload
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })
  },
})

export const {logout} = userSlice.actions
export default userSlice.reducer

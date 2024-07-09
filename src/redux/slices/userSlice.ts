import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {addUser, fetchOthers} from '../thunks/userThunks'
import {IUserProfiles, IUsers} from '../../types/users.type'

interface userState {
  currentUser: IUsers | null
  otherUsers: IUserProfiles[] | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: userState = {
  currentUser: null,
  otherUsers: null,
  status: 'idle',
  error: null,
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<IUsers>) {
      state.currentUser = action.payload
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
      .addCase(fetchOthers.pending, state => {
        state.status = 'loading'
      })
      .addCase(
        fetchOthers.fulfilled,
        (state, action: PayloadAction<IUserProfiles[]>) => {
          state.status = 'succeeded'
          state.otherUsers = action.payload
        },
      )
      .addCase(fetchOthers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })
  },
})

export const {setCurrentUser} = userSlice.actions
export default userSlice.reducer

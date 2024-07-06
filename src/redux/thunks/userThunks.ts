import {createAsyncThunk} from '@reduxjs/toolkit'
import {IUsers} from '../../types/users.type'
import {handleAddUser} from '../../firebase/authentications_api'

export const addUser = createAsyncThunk(
  'users/addUser',
  async (user: IUsers, {rejectWithValue}) => {
    try {
      await handleAddUser(user)
      return user
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

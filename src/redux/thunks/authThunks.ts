import {createAsyncThunk} from '@reduxjs/toolkit'
import {IPayloadUser} from '../../types/users.type'

export const generateJWT = createAsyncThunk(
  'auth/generateToken',
  async (user: IPayloadUser, {dispatch}) => {},
)

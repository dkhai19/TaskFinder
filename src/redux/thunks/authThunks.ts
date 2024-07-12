import {createAsyncThunk} from '@reduxjs/toolkit'
import axiosInstance from '../../apis/AxiosClient'
import {setToken} from '../slices/authSlice'
import {IPayloadUser} from '../../types/users.type'

export const generateJWT = createAsyncThunk(
  'auth/generateToken',
  async (user: IPayloadUser, {dispatch}) => {},
)

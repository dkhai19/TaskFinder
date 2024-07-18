import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IPostApplication} from '../../types/applications.type'
import {formatDate} from '../../validations/convert-date'

export interface IApplication {
  application_date: string
  status: string
  task_id: string
  user_id: string
}

const initialState = {
  applied: [] as IApplication[],
}

const applicationSlice = createSlice({
  name: 'applied',
  initialState,
  reducers: {
    setApplications(state, action: PayloadAction<IApplication[]>) {
      state.applied = action.payload
    },
  },
})

export const {setApplications} = applicationSlice.actions
export default applicationSlice.reducer

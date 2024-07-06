import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface IApplication {
  task_id: string
  user_id: string
  status: string
  application_date: string
}

const initialState = {
  applied: [] as IApplication[],
}

const applicationSlice = createSlice({
  name: 'applied',
  initialState,
  reducers: {
    manageApplied(state, action: PayloadAction<IApplication>) {
      const exists = state.applied.some(
        item =>
          item.task_id === action.payload.task_id &&
          item.user_id === action.payload.user_id,
      )

      if (exists) {
        state.applied = state.applied.filter(
          item =>
            !(
              item.task_id === action.payload.task_id &&
              item.user_id === action.payload.user_id
            ),
        )
      } else {
        state.applied.push(action.payload)
      }
    },
  },
})

export const {manageApplied} = applicationSlice.actions
export default applicationSlice.reducer

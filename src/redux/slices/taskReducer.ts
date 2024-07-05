import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ITask} from '../../types/tasks.type'

const initialState = {
  tasks: [] as ITask[],
  taskModal: false,
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    toggleModal(state) {
      state.taskModal = !state.taskModal
    },
  },
})

export const {toggleModal} = taskSlice.actions
export default taskSlice.reducer

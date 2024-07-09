import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ITask} from '../../types/tasks.type'
import {loadTasks} from '../thunks/taskThunks'

interface taskState {
  tasksData: ITask[] | null
  error: null | string
  isLoading: boolean
  taskModal: boolean
}

const initialState: taskState = {
  tasksData: [] as ITask[],
  error: null,
  isLoading: false,
  taskModal: false,
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    toggleModal(state) {
      state.taskModal = !state.taskModal
    },
    setTasks(state, action: PayloadAction<ITask[]>) {
      state.tasksData = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(loadTasks.pending, state => {
      state.isLoading = true
    })
    builder.addCase(loadTasks.fulfilled, state => {
      state.isLoading = false
    })
    builder.addCase(loadTasks.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
    })
  },
})

export const {toggleModal, setTasks} = taskSlice.actions
export default taskSlice.reducer

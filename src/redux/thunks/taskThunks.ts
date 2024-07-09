import {createAsyncThunk, UnsubscribeListener} from '@reduxjs/toolkit'
import {getAllTasks} from '../../firebase/tasks.api'
import {setTasks} from '../slices/taskSlice'

export const loadTasks = createAsyncThunk(
  'tasks/getTasks',
  async (_, {dispatch}) => {
    return new Promise<void>(resolve => {
      getAllTasks(tasks => {
        dispatch(setTasks(tasks))
        resolve()
      })
    })
  },
)

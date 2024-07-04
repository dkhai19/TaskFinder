import firestore from '@react-native-firebase/firestore'
import {ITask} from '../types/tasks.type'

export const getAllTasks = (callback: (tasks: ITask[]) => void) => {
  const taskCollection = firestore().collection('tasks')
  const unsubcribe = taskCollection.onSnapshot(querySnapshot => {
    const tasks: ITask[] = querySnapshot.docs.map(doc => {
      const data = doc.data()
      const endDate = data.end_date.toDate()
      const startDate = data.start_date.toDate()
      const location = {
        latitude: data.location.latitude,
        longtitude: data.location.longitude,
      }
      return {
        taskId: doc.id,
        userId: data.user_id,
        taskName: data.task_name,
        taskDescription: data.task_description,
        endDate: endDate,
        startDate: startDate,
        location: location,
        status: data.status,
      }
    })
    callback(tasks)
  })
  return unsubcribe
}

import firestore, {query} from '@react-native-firebase/firestore'
import {ITask} from '../types/tasks.type'

export const getAllTasks = (
  callback: (tasks: ITask[]) => void,
): (() => void) => {
  const taskCollection = firestore().collection('tasks')
  const unsubcribe = taskCollection
    .where('status', '==', 'process')
    .onSnapshot(querySnapshot => {
      //console.log('Task querySnapshot', querySnapshot)
      const tasks: ITask[] = querySnapshot.docs.map(doc => {
        const data = doc.data()
        const endDate = data.end_date.toDate().toISOString()
        const startDate = data.start_date.toDate().toISOString()
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

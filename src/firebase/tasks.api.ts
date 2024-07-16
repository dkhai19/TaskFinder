import firestore, {query} from '@react-native-firebase/firestore'
import {ITask} from '../types/tasks.type'
import {convertFirestoreTimestampToDate} from '../validations/convert-date'

const taskCollection = firestore().collection('tasks')

export const getAllTasks = (
  callback: (tasks: ITask[]) => void,
): (() => void) => {
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
          end_date: endDate,
          start_date: startDate,
          location: location,
          status: data.status,
        }
      })
      callback(tasks)
    })
  return unsubcribe
}

export const getTaskById = async (task_id: string) => {
  try {
    const querySnapshot = await taskCollection.doc(task_id).get()
    if (querySnapshot.exists) {
      const data = querySnapshot.data()
      if (data) {
        const endDate = data.end_date.toDate().toISOString()
        const startDate = data.start_date.toDate().toISOString()
        const location = {
          latitude: data.location.latitude,
          longtitude: data.location.longitude,
        }
        return {
          taskId: querySnapshot.id,
          userId: data.user_id,
          taskName: data.task_name,
          taskDescription: data.task_description,
          end_date: endDate,
          start_date: startDate,
          location: location,
          status: data.status,
        }
      }
    } else {
      console.log('No such task!')
      return null
    }
  } catch (error) {
    console.error('Fail to get task detail', error)
  }
}

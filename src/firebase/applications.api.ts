import {IGetApplication, IPostApplication} from '../types/applications.type'
import firestore from '@react-native-firebase/firestore'

const applicationCollection = firestore().collection('applications')
export const postApplication = async (resume: IPostApplication) => {
  try {
    await applicationCollection.add(resume)
    console.log('Applied successfully!')
  } catch (error) {
    console.log('Error while applying', error)
  }
}

export const checkIsApplied = async (task_id: string, user_id: string) => {
  try {
    const querySnapshot = await applicationCollection
      .where('task_id', '==', task_id)
      .where('user_id', '==', user_id)
      .get()
    if (!querySnapshot.empty) {
      return true
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}

export const getAllMyApplications = async (user_id: string) => {
  try {
    const querySnapshot = await applicationCollection
      .where('user_id', '==', user_id)
      .get()
    const result: IGetApplication[] = querySnapshot.docs.map(doc => {
      const data = doc.data() as IGetApplication
      return {
        ...data,
      }
    })

    return result
  } catch (error) {
    console.error('Error fetching messages: ', error)
    return []
  }
}

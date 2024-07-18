import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore'

export type IGetApplication = {
  application_date: FirebaseFirestoreTypes.Timestamp
  status: string
  task_id: string
  user_id: string
}

export type IPostApplication = {
  application_date: Date
  status: string
  task_id: string
  user_id: string
  rating?: number
}

export interface IApplied extends IGetApplication {
  isApplied: boolean
}

import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore'

export type IChat = {
  chatUID: string
  members: string[]
  lastMessage: string
  lastMessageTimestamp: FirebaseFirestoreTypes.Timestamp
}

export type IMessage = {
  _id: string
  text: string
  image?: string
  createdAt: Date
  user: ISender
}

export type IUserChats = {
  [chatUID: string]: {
    members: string[]
    lastMessage: string
    lastMessageTimestamp: FirebaseFirestoreTypes.Timestamp
  }
}

export type ISender = {
  _id: string
  avatar: string
  name: string
}

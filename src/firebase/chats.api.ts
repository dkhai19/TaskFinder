import firestore from '@react-native-firebase/firestore'
import {IChat, IMessage, ISender, IUserChats} from '../types/chats.type'
import {Platform} from 'react-native'
import storage from '@react-native-firebase/storage'
const chatCollection = firestore().collection('chats')

//Find chatUID between 2 users
export const findCommonChats = async (userUID1: string, userUID2: string) => {
  const documentSnapshot = await chatCollection
    .where('members', 'array-contains', userUID1)
    .get()
  const result = documentSnapshot.docs
    .map(doc => {
      const data = doc.data() as Omit<IChat, 'chatUID'>
      return {chatUID: doc.id, ...data}
    })
    .find((chat: IChat) => chat.members.includes(userUID2))
  return result?.chatUID
}

const handleImage = async (uri: string, receiver_id: string) => {
  const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
  const fileName = `${receiver_id}`
  const storageRef = storage().ref(`chatImages/${fileName}`)
  await storageRef.putFile(uploadUri)
  const imageURL = await storageRef.getDownloadURL()
  return imageURL
}

// Function to handle send message logic
export const sendMessage = async (
  receiver_id: string,
  body: {
    text: string
    image: string
  },
  sender: ISender,
) => {
  const timestamp = new Date()

  let message: IMessage
  if (body.image === '') {
    message = {
      _id: '',
      text: body.text,
      createdAt: timestamp,
      user: sender,
    }
  } else {
    const imageUrl = await handleImage(body.image, receiver_id)
    message = {
      _id: '',
      image: imageUrl,
      createdAt: timestamp,
      user: sender,
    }
    //console.log('Anh day nay', imageUrl)
  }

  console.log(body)

  // Fetch common chat UID
  const commonChatUID = await findCommonChats(receiver_id, sender._id)

  if (commonChatUID) {
    console.log('Have common chat')

    // Perform updates in parallel
    const updateChatPromise = firestore()
      .collection('chats')
      .doc(commonChatUID)
      .update({
        lastMessage: body.text,
        lastMessageTimestamp: timestamp,
      })

    const addMessageRef = await chatCollection
      .doc(commonChatUID)
      .collection('messages')
      .add(message)

    const updateMessageIdPromise = addMessageRef.update({
      _id: addMessageRef.id,
    })

    await Promise.all([updateChatPromise, updateMessageIdPromise])
  } else {
    console.log('Dont have common chat')

    const userUIDs = [receiver_id, sender._id]
    const batch = firestore().batch()

    const newChatRef = firestore().collection('chats').doc()
    batch.set(newChatRef, {
      members: userUIDs,
      lastMessage: body.text,
      lastMessageTimestamp: timestamp,
    })

    const newMessageRef = newChatRef.collection('messages').doc()
    batch.set(newMessageRef, {
      ...message,
      _id: newMessageRef.id,
    })

    await batch.commit()
  }
}

//Function used to fetch all conversations of an user
export const fetchConversations = (
  userUID: string,
  callback: (conversations: IChat[]) => void,
) => {
  const chatCollection = firestore().collection('chats')
  const unsubcribe = chatCollection
    .where('members', 'array-contains', userUID)
    .onSnapshot(querySnapshot => {
      const chats: IChat[] = querySnapshot.docs.map(doc => {
        const data = doc.data() as Omit<IChat, 'chatUID'>
        return {chatUID: doc.id, ...data}
      })
      callback(chats)
    })
  return unsubcribe
}

export const fetchMessages = async (
  chatUID: string,
  callback: (messages: IMessage[]) => void,
) => {
  const chatCollection = firestore().collection('chats')

  try {
    const unsubcribe = await chatCollection
      .doc(chatUID)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot(snapshot => {
        const messages: IMessage[] = snapshot.docs.map(doc => ({
          _id: doc.id, // Ensure the _id field is set
          ...doc.data(),
        })) as IMessage[]

        callback(messages)
      })
    return unsubcribe
  } catch (error) {
    console.error('Error fetching messages: ', error)
    return () => {}
  }
}

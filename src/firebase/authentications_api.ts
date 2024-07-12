import {IUserAddtionalInfor, IUsers} from '../types/users.type'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import {convertFirestoreTimestampToDate} from '../validations/convert-date'

const userCollection = firestore().collection('users')

export const handleAddUser = async (user: IUsers) => {
  try {
    console.log('Adding user:', user)
    await userCollection.doc(user.uid).set({...user})
    console.log('User added successfully!')
  } catch (error) {
    console.error('Error adding user to Firestore:', error)
  }
}

export const updateUserById = async (
  user_id: string,
  user_infor: IUserAddtionalInfor,
) => {
  await userCollection
    .doc(user_id)
    .update({...user_infor})
    .then(() => {
      console.log('Updated!')
    })
    .catch(error => console.error('Update failed', error))
}

export const findUserById = async (user_id: string): Promise<IUsers> => {
  const userDoc = await firestore().collection('users').doc(user_id).get()
  const data = userDoc.data()
  if (!data) {
    throw new Error('User data not found!')
  }
  const birthday = convertFirestoreTimestampToDate(data?.birthday).toISOString()
  const {location, ...rest} = data
  return {...rest, uid: userDoc.id, birthday} as IUsers
}

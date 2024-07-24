import {IUserProfiles, IUsers} from '../types/users.type'
import firestore, {GeoPoint} from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import {
  convertFirestoreTimestampToDate,
  formatDate,
} from '../validations/convert-date'
import {parseDateOfBirth} from '../validations/user-infor-validation'
import {Platform} from 'react-native'

const userCollection = firestore().collection('users')

export const handleAddUser = async (user: IUsers) => {
  try {
    console.log('Adding user:', user)
    let convertGeoPoint
    if (user.location) {
      convertGeoPoint = new GeoPoint(
        user.location.latitude + (Math.random() * (0.5 - 0.1) + 0.1),
        user.location.longitude + (Math.random() * (0.5 - 0.1) + 0.1),
      )
    }
    await userCollection.doc(user.id).set({...user, location: convertGeoPoint})
    console.log('User added successfully!')
  } catch (error) {
    console.error('Error adding user to Firestore:', error)
  }
}

export const updateSignUpInformation = async (user_infor: IUsers) => {
  const parseDOB = parseDateOfBirth(user_infor.birthday)
  if (!parseDOB) {
    console.log('Error date format!')
    return
  }
  const updatedInfo = {
    ...user_infor,
    birthday: parseDOB,
  }
  console.log('updated infor', updatedInfo)
  await userCollection
    .doc(updatedInfo.id)
    .update({...updatedInfo})
    .then(() => {
      console.log('Updated!')
    })
    .catch(error => console.error('Update failed', error))
}

export const updateFcmToken = async (user_id: string, fcmToken: string) => {
  await userCollection
    .doc(user_id)
    .update({fcmToken})
    .then(() => {
      console.log('Updated fcm token')
    })
    .catch(error => console.error('Update fcm token failed', error))
}

export const parseDateString = (dateString: string): Date | null => {
  const [day, month, year] = dateString.split('/')
  const parsedDate = new Date(`${year}-${month}-${day}`)
  return isNaN(parsedDate.getTime()) ? null : parsedDate
}

export const updateUserProfile = async (user_infor: IUserProfiles) => {
  console.log(user_infor)
  const birthdayDate = parseDateString(user_infor.birthday)
  const uploadUri =
    Platform.OS === 'ios'
      ? user_infor.avatar.replace('file://', '')
      : user_infor.avatar
  const fileName = 'avatar.jpg'
  const storageRef = storage().ref(`users/${user_infor.id}/${fileName}`)
  await storageRef.putFile(uploadUri)

  const imageURL = await storageRef.getDownloadURL()
  // Ensure the date is valid
  if (!birthdayDate) {
    console.error('Invalid birthday date')
    return
  }

  await userCollection
    .doc(user_infor.id)
    .update({...user_infor, birthday: birthdayDate, avatar: imageURL})
    .then(() => {
      console.log('Change profile success!')
    })
    .catch(error => {
      console.error('Change profile failed', error)
    })
}

export const findUserById = async (user_id: string): Promise<IUsers> => {
  const userDoc = await firestore().collection('users').doc(user_id).get()
  const data = userDoc.data()
  if (!data) {
    throw new Error('User data not found!')
  }
  const birthday = formatDate(
    convertFirestoreTimestampToDate(data?.birthday).toISOString(),
  )
  const {location, ...rest} = data
  return {...rest, id: userDoc.id, birthday} as IUsers
}

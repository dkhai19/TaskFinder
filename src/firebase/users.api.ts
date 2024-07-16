import {IUserProfiles, IUsers} from '../types/users.type'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import {
  convertFirestoreTimestampToDate,
  formatDate,
} from '../validations/convert-date'
import {parseDateOfBirth} from '../validations/user-infor-validation'

const userCollection = firestore().collection('users')

export const handleAddUser = async (user: IUsers) => {
  try {
    console.log('Adding user:', user)
    await userCollection.doc(user.id).set({...user})
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

const parseDateString = (dateString: string): Date | null => {
  const [day, month, year] = dateString.split('/')
  const parsedDate = new Date(`${year}-${month}-${day}`)
  return isNaN(parsedDate.getTime()) ? null : parsedDate
}

export const updateUserProfile = async (user_infor: IUserProfiles) => {
  console.log(user_infor)
  const birthdayDate = parseDateString(user_infor.birthday)
  const imageURL =
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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

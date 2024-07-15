import {IUserAddtionalInfor, IUserProfiles, IUsers} from '../types/users.type'
import firestore from '@react-native-firebase/firestore'
import {
  convertFirestoreTimestampToDate,
  formatDate,
} from '../validations/convert-date'

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

export const updateSignUpInformation = async (
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

const parseDateString = (dateString: string): Date | null => {
  const [day, month, year] = dateString.split('/')
  const parsedDate = new Date(`${year}-${month}-${day}`)
  return isNaN(parsedDate.getTime()) ? null : parsedDate
}

export const updateUserProfile = async (user_infor: IUserProfiles) => {
  console.log(user_infor)
  const birthdayDate = parseDateString(user_infor.birthday)

  // Ensure the date is valid
  if (!birthdayDate) {
    console.error('Invalid birthday date')
    return
  }

  await userCollection
    .doc(user_infor.id)
    .update({...user_infor, birthday: birthdayDate})
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

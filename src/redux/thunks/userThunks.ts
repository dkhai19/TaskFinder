import {createAsyncThunk} from '@reduxjs/toolkit'
import {IUserProfiles, IUsers} from '../../types/users.type'
import {handleAddUser} from '../../firebase/users.api'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import {convertFirestoreTimestampToDate} from '../../validations/convert-date'
const userCollection = firestore().collection('users')

export const addUser = createAsyncThunk(
  'users/addUser',
  async (user: IUsers, {rejectWithValue}) => {
    try {
      await handleAddUser(user)
      return user
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const fetchOthers = createAsyncThunk(
  'users/fetchOthers',
  async (_, {rejectWithValue}) => {
    const currentUser = auth().currentUser
    if (!currentUser) {
      throw new Error('No user is currently authenticated')
    }
    const currentUserUID = currentUser.uid
    try {
      const querySnapshot = await userCollection.get()
      const users = querySnapshot.docs
        .map(doc => {
          const data = doc.data()
          const birthday = convertFirestoreTimestampToDate(
            data?.birthday,
          ).toISOString()
          // console.log('See the birthday after converted', birthday)
          // console.log('Type of birthday', typeof birthday)
          return {
            id: doc.id,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            phone: data.phone,
            gender: data.gender,
            birthday: birthday,
            introduction: data.introduction,
            avatar: data.avatar,
            cover: data.cover,
          }
        })
        .filter(user => user.id !== currentUserUID) as IUserProfiles[]
      //console.log('Fetch all user ne', users[0].birthday)
      return users
    } catch (error) {
      console.error('Error to fetch user on Firestore', error)
      return rejectWithValue(error)
    }
  },
)

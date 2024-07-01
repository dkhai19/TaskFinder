import {users} from '../types/users.type';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
export const handleAddUser = async (user_id: string, user: users) => {
  try {
    console.log('Adding user:', user);
    await firestore()
      .collection('users')
      .doc(user_id)
      .set({...user});
    console.log('User added successfully!');
  } catch (error) {
    console.error('Error adding user to Firestore:', error);
  }
};

export const fetchAllUser = async () => {
  const currentUser = auth().currentUser;
  if (!currentUser) {
    throw new Error('No user is currently authenticated');
  }
  const currentUserUID = currentUser.uid;
  try {
    const querySnapshot = await firestore().collection('users').get();
    const users = querySnapshot.docs
      .map(doc => ({
        uid: doc.id,
        ...doc.data(),
      }))
      .filter(user => user.uid !== currentUserUID);
    console.log(users);
    return users;
  } catch (error) {
    console.error('Error to fetch user on Firestore', error);
    return null;
  }
};

export const updateUserById = async (user_id: string, user_infor: object) => {
  await firestore()
    .collection('users')
    .doc(user_id)
    .update({...user_infor})
    .then(() => {
      console.log('Updated!');
    })
    .catch(error => console.error('Update failed', error));
};

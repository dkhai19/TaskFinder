import {users} from '../types/users.type';
import firestore from '@react-native-firebase/firestore';

export const handleAddUser = async (user: users) => {
  try {
    console.log('Adding user:', user);
    if (!firestore().app) {
      console.error('Firestore is not initialized.');
      return;
    }
    await firestore()
      .collection('profile')
      .add({...user});
    console.log('User added successfully!');
  } catch (error) {
    console.error('Error adding user to Firestore:', error);
  }
};

export const fetchAllUser = async () => {
  try {
    const querySnapshot = await firestore().collection('profile').get();
    const users = querySnapshot.docs.map(doc => doc.data());
    return users;
  } catch (error) {
    console.error('Error to fetch user on Firestore', error);
    return null;
  }
};

export const updateUserById = async (user_id: string, user_infor: object) => {
  await firestore()
    .collection('profile')
    .where('user_id', '==', user_id)
    .get()
    .then(querySnapshot => {
      const profile_id = querySnapshot.docs[0].id;
      firestore()
        .collection('profile')
        .doc(profile_id)
        .update(user_infor)
        .then(() => {
          console.log('Updated!');
        })
        .catch(error => {
          console.log('Update error', error);
        });
    })
    .catch(error => {
      console.log('Error when find user', error);
    });
};

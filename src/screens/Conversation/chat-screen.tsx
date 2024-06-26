import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {fetchAllUser} from '../../api/firebase_api';
import {useEffect, useState} from 'react';
import {users} from '../../types/users.type';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

const ChatScreen = () => {
  const [listUsers, setListUsers] = useState<
    FirebaseFirestoreTypes.DocumentData[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllUser();
      if (data) {
        setListUsers(data);
      }
    };
    fetchData();
  }, []);

  const itemRow = (item: FirebaseFirestoreTypes.DocumentData) => {
    return (
      <TouchableOpacity>
        <Text>{item.email}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList data={listUsers} renderItem={({item}) => itemRow(item)} />
    </View>
  );
};
export default ChatScreen;

import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {fetchAllUser} from '../../firebase/authentications_api';
import {useEffect, useState} from 'react';
import {users} from '../../types/users.type';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {colors} from '../../constants/color';
import {typography} from '../../constants/typo';
import ChatItem from './chat-item';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {ConversationStackParamList} from '../../navigation/RootNavigator';

type Props = NativeStackScreenProps<ConversationStackParamList, 'Conversation'>;

const ConversationScreen: React.FC<Props> = ({navigation}) => {
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

  const goToChatDetail = (uid: string) => {
    navigation.navigate('Chat', {uid: uid});
  };

  const avatarItem = (
    item: FirebaseFirestoreTypes.DocumentData,
    index: number,
  ) => {
    return (
      <View style={styles.avatarItem}>
        <TouchableOpacity
          onPress={() => goToChatDetail(item.uid)}
          style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/photos/image8.jpg')}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        <View>
          <Text
            style={[
              typography.f13_regular,
              {color: colors.opacityBlack(0.55)},
            ]}>
            {item.full_name || item.first_name + ' ' + item.last_name}
          </Text>
        </View>
      </View>
    );
  };

  const chatItem = (item: FirebaseFirestoreTypes.DocumentData) => {
    const name = item.full_name || item.first_name + ' ' + item.last_name;
    const uid = item.uid;
    return (
      <TouchableOpacity
        onPress={() => goToChatDetail(uid)}
        style={{paddingVertical: 8}}>
        <ChatItem
          name={name}
          context="Don't let your dream pass by"
          lastDate="1:30"
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={[typography.f17_medium, styles.black]}>Messages</Text>
      </View>
      <View style={styles.avatarList}>
        <FlatList
          data={listUsers}
          renderItem={({item, index}) => avatarItem(item, index)}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.chatList}>
        <FlatList
          data={listUsers}
          renderItem={({item}) => chatItem(item)}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    marginTop: 36,
    marginBottom: 24,
    alignItems: 'center',
  },
  black: {
    color: colors.black,
  },
  avatarList: {},
  avatarItem: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 24,
    marginBottom: 16,
  },
  imageContainer: {
    width: 60,
    height: 60,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  chatList: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
export default ConversationScreen;

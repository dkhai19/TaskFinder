import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {findUserById} from '../../firebase/authentications_api'
import {useEffect, useState} from 'react'
import {colors} from '../../constants/color'
import {typography} from '../../constants/typo'
import ChatItem from './chat-item'

import {fetchConversations} from '../../firebase/chats.api'
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'
import {IChat, IConversation} from '../../types/chats.type'
import {convertFirestoreTimestampToDate} from '../../validations/convert-date'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types'
import {RootStackParamList} from '../../navigation/RootNavigator'

const ConversationScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const userUID = useSelector((state: RootState) => state.authentication.uid)
  const [listData, setListData] = useState<IConversation[]>([])
  const listOtherUsers = useSelector(
    (state: RootState) => state.user.otherUsers,
  )
  useEffect(() => {
    const processConversations = async (data: IChat[]) => {
      const conversations: IConversation[] = await Promise.all(
        data.map(async chat => {
          const receiverId = chat.members.filter(uid => uid !== userUID)[0]
          const user = listOtherUsers?.find(item => item.uid === receiverId)
          const time = convertFirestoreTimestampToDate(
            chat.lastMessageTimestamp,
          )
          const toHour = time.getHours() + ':' + time.getMinutes()
          return {
            id: receiverId,
            avatar: '5', // can sua
            name: `${user?.first_name} ${user?.last_name}`,
            lastMessage: chat.lastMessage,
            lastMessageTimestamp: toHour,
          }
        }),
      )
      setListData(conversations)
    }

    const unsubscribe = fetchConversations(userUID, processConversations)
    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  const goToChatDetail = (receiver_uid: string) => {
    navigation.navigate('ChatNavigator', {
      screen: 'Chat',
      params: {uid: receiver_uid},
    })
  }

  const avatarItem = (item: IConversation) => {
    return (
      <View style={styles.avatarItem}>
        <TouchableOpacity
          onPress={() => goToChatDetail(item.id)}
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
            {item.name}
          </Text>
        </View>
      </View>
    )
  }

  const chatItem = (item: IConversation) => {
    return (
      <TouchableOpacity
        onPress={() => goToChatDetail(item.id)}
        style={{paddingVertical: 8}}>
        <ChatItem
          name={item.name}
          context={item.lastMessage}
          lastDate={item.lastMessageTimestamp}
        />
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={[typography.f17_medium, styles.black]}>Messages</Text>
      </View>
      <View style={styles.avatarList}>
        <FlatList
          data={listData}
          renderItem={({item}) => avatarItem(item)}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.chatList}>
        <FlatList
          data={listData}
          renderItem={({item}) => chatItem(item)}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

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
})
export default ConversationScreen

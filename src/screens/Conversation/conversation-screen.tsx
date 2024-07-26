import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {useEffect, useState} from 'react'
import {typography} from '../../constants/typo'
import {fetchConversations} from '../../firebase/chats.api'
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'
import {IChat} from '../../types/chats.type'
import {IConversation} from '../../types/conversations.type'
import {convertFirestoreTimestampToDate} from '../../validations/convert-date'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types'
import {RootStackParamList} from '../../navigation/RootNavigator'
import ConversationItem from './components/conversation-item'
import {getOpacityColor} from '../../constants/color'

const ConversationScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  //Need to change
  const userUID = useSelector((state: RootState) => state.authentication.uid)
  const colors = useSelector((state: RootState) => state.authentication.colors)
  const [listData, setListData] = useState<IConversation[]>([])
  const listOtherUsers = useSelector(
    (state: RootState) => state.user.otherUsers,
  )
  //console.log('list other users', listOtherUsers)

  useEffect(() => {
    const processConversations = async (data: IChat[]) => {
      const conversations: IConversation[] = await Promise.all(
        data.map(async chat => {
          const receiverId = chat.members.filter(uid => uid !== userUID)[0]
          //console.log('receiver id', receiverId)
          const user = listOtherUsers?.find(item => item.id === receiverId)
          //console.log('receiver user', user)
          const time = convertFirestoreTimestampToDate(
            chat.lastMessageTimestamp,
          )
          const toHour = time.getHours() + ':' + time.getMinutes()
          return {
            id: receiverId,
            avatar: user?.avatar || '', // can sua
            name: `${user?.first_name} ${user?.last_name}`,
            lastMessage: chat.lastMessage,
            lastMessageTimestamp: toHour,
          } as IConversation
        }),
      )
      setListData(conversations)
    }
    let unsubscribe: (() => void) | null = null
    const loadConversations = async () => {
      unsubscribe = await fetchConversations(userUID, processConversations)
    }
    loadConversations()
    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [userUID])

  const goToChatDetail = (receiver_uid: string) => {
    navigation.navigate('ChatNavigator', {
      screen: 'Chat',
      params: {
        uid: receiver_uid,
      },
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
            source={{uri: item.avatar}}
            resizeMode="stretch"
            alt="Alt"
          />
        </TouchableOpacity>
        <View>
          <Text
            style={[
              typography.f13_regular,
              {color: getOpacityColor(colors.black, 0.55)},
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
        <ConversationItem
          receiver_id={item.id}
          name={item.name}
          imageUrl={item.avatar}
          context={item.lastMessage}
          lastDate={item.lastMessageTimestamp}
        />
      </TouchableOpacity>
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

  if (!listData) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={[typography.f16_semibold, {color: colors.black}]}>
          Loading owner information.
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={[typography.f20_bold, styles.black]}>Messages</Text>
      </View>
      <View style={styles.avatarList}>
        <FlatList
          data={listData}
          renderItem={({item}) => avatarItem(item)}
          horizontal
          showsHorizontalScrollIndicator={false}
          initialNumToRender={10}
        />
      </View>
      <View style={styles.chatList}>
        <FlatList
          data={listData}
          renderItem={({item}) => chatItem(item)}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
        />
      </View>
    </View>
  )
}

export default ConversationScreen

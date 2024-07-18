import {ScrollView, Text, View} from 'react-native'
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types'
import {ChatStackParamList} from '../../navigation/RootNavigator'
import {StyleSheet} from 'react-native'
import {colors} from '../../constants/color'
import ChatHeader from './chat-header'
import ChatInput from './chat-input'
import {useEffect, useState} from 'react'
import {
  fetchMessages,
  findCommonChats,
  sendMessage,
} from '../../firebase/chats.api'
import {IMessage, ISender} from '../../types/chats.type'
import MessageRow from './message-row'
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'
import {ICall} from '../../types/calls.type'
import client, {
  requestCameraPermission,
  requestMicrophonePermission,
  signJWT,
} from '../../apis/stream'
import {UnsubcribeFunc} from '../../types/unsubcribe.type'
import {typography} from '../../constants/typo'

type Props = NativeStackScreenProps<ChatStackParamList, 'Chat'>

const ChatScreen: React.FC<Props> = ({route, navigation}) => {
  const receiver_uid = route.params.uid
  const sender_uid = useSelector((state: RootState) => state.authentication.uid)
  const [text, setText] = useState('')
  const [messages, setMessages] = useState<IMessage[]>([])
  const currentUser = useSelector((state: RootState) => state.user.currentUser)
  const jwtToken = useSelector((state: RootState) => state.authentication.token)
  const navigationItem: ICall = {
    apiKey: 'mmhfdzb5evj2',
    token: jwtToken,
    uid: sender_uid,
    callId: 'default_3f595617-07a3-4f70-9f0f-7a898e85b455',
  }
  useEffect(() => {
    let unsubscribe: UnsubcribeFunc | null
    const loadInformations = async () => {
      const findChatUID = await findCommonChats(sender_uid, receiver_uid)
      if (findChatUID) {
        unsubscribe = await fetchMessages(
          findChatUID,
          (newMessages: IMessage[]) => {
            setMessages(newMessages)
          },
        )
      }
    }
    loadInformations()
    console.log(jwtToken)
    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [receiver_uid])

  const onBackHandler = () => {
    navigation.pop()
  }

  const onTextChange = (text: string) => {
    setText(() => text)
  }

  const sendMessageHandler = async () => {
    const senderInfor: ISender = {
      _id: sender_uid,
      avatar: currentUser.avatar,
      name: 'Do Duc Khai',
    }
    try {
      //console.log('Tin nhan gui di', messages);
      await sendMessage(receiver_uid, text, senderInfor)
      setText('')
    } catch (error) {
      console.error('Fail to send message', error)
    }
  }

  const authenticateUser = async () => {
    const cameraPermission = await requestCameraPermission()
    const microPermission = await requestMicrophonePermission()
    if (cameraPermission && microPermission) {
      await client
        .connectUser(
          {
            id: sender_uid,
            name: `${currentUser?.first_name} ${currentUser?.last_name}`,
          },
          jwtToken,
        )
        .then(() => {
          navigation.navigate('Call', {...navigationItem})
        })
    } else {
      console.log('Cant do call because it require permission')
    }
  }

  const navigateCallScreen = () => {
    authenticateUser()
  }

  return (
    <View style={styles.container}>
      <View style={styles.paddingOfTop}></View>
      <View style={styles.header}>
        <ChatHeader
          receiver_id={receiver_uid}
          onBack={onBackHandler}
          onCallHander={navigateCallScreen}
        />
      </View>
      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {messages.map(message => (
            <MessageRow
              key={message._id}
              receiverId={message.user._id}
              isMine={message.user._id === sender_uid ? true : false}
              content={message.text}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.inputField}>
        <ChatInput
          value={text}
          onSend={sendMessageHandler}
          handleTextChange={(text: string) => onTextChange(text)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paddingOfTop: {
    width: '100%',
    backgroundColor: colors.white,
  },
  header: {
    height: '7%',
    width: '100%',
  },
  body: {
    padding: 12,
    height: '80%',
  },
  inputField: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 24,
    alignItems: 'center',
  },
})

export default ChatScreen

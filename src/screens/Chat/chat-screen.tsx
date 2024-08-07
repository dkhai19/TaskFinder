import {ScrollView, View} from 'react-native'
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types'
import {ChatStackParamList} from '../../navigation/RootNavigator'
import {StyleSheet} from 'react-native'
import ChatHeader from './components/chat-header'
import ChatInput from './components/chat-input'
import {useEffect, useState} from 'react'
import {
  fetchMessages,
  findCommonChats,
  sendMessage,
} from '../../firebase/chats.api'
import {IMessage, ISender} from '../../types/chats.type'
import MessageRow from './components/message-row'
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'
import {ICall} from '../../types/calls.type'
import client, {
  generateRandomCallId,
  requestCameraPermission,
  requestMicrophonePermission,
} from '../../apis/stream'
import {UnsubcribeFunc} from '../../types/unsubcribe.type'
import {IUsers} from '../../types/users.type'
import {findUserById} from '../../firebase/users.api'
import FadeView from '../../animations/FadeView'
import {sendNotification} from '../../apis/notify'
import ImagePicker from 'react-native-image-crop-picker'
type Props = NativeStackScreenProps<ChatStackParamList, 'Chat'>

const ChatScreen: React.FC<Props> = ({route, navigation}) => {
  const receiver_uid = route.params.uid

  // console.log(receiver_uid)
  // console.log(chatUID)
  const [chatUID, setChatUID] = useState<string>('')
  const sender_uid = useSelector((state: RootState) => state.authentication.uid)
  const [text, setText] = useState('')
  const [image, setImage] = useState('')
  const [messages, setMessages] = useState<IMessage[]>([])
  const currentUser = useSelector((state: RootState) => state.user.currentUser)
  const jwtToken = useSelector((state: RootState) => state.authentication.token)
  const colors = useSelector((state: RootState) => state.authentication.colors)
  const [receiver, setReceiver] = useState<IUsers>()
  const callId = generateRandomCallId()
  useEffect(() => {
    let unsubscribe: UnsubcribeFunc | null
    const loadInformations = async () => {
      const findReceiver = await findUserById(receiver_uid)
      setReceiver(findReceiver)
      const findChatUID = await findCommonChats(sender_uid, receiver_uid)
      if (findChatUID) {
        setChatUID(findChatUID)
        unsubscribe = await fetchMessages(
          findChatUID,
          (newMessages: IMessage[]) => {
            setMessages(newMessages)
          },
        )
      }
    }
    loadInformations()
    //console.log(jwtToken)
    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [receiver_uid])

  const navigationItem: ICall = {
    type: 'create',
    receiver_fcmToken: receiver?.fcmToken || '',
    callId: callId,
  }

  const onBackHandler = () => {
    navigation.pop()
  }

  const onTextChange = (text: string) => {
    setText(() => text)
  }

  const sendMessageHandler = async (imageURL?: string) => {
    const senderInfor: ISender = {
      _id: sender_uid,
      avatar: currentUser.avatar,
      name: currentUser.first_name + ' ' + currentUser.last_name,
    }
    //console.log(receiver?.fcmToken)
    try {
      //console.log('Tin nhan gui di', messages);
      setText('')
      await sendMessage(
        receiver_uid,
        {
          text: text,
          image: imageURL ? imageURL : '',
        },
        senderInfor,
      ).then(async () => {
        setImage(() => '')
        await sendNotification(
          receiver?.fcmToken || '',
          `You got new message from ${currentUser.first_name} ${currentUser.last_name}`,
          text,
          {
            chatboxId: chatUID,
            senderId: currentUser.id,
          },
        )
      })
    } catch (error) {
      console.error('Fail to send message', error)
    }
  }

  const handleSendImageLogic = async () => {
    const permission = await requestCameraPermission()
    if (!permission) return
    await ImagePicker.openPicker({
      width: 160,
      height: 160,
      cropping: true,
      mediaType: 'photo',
    })
      .then(image => {
        sendMessageHandler(image.path)
        //setText(() => 'You sent an image')
      })
      .catch(error => {
        console.log('Error: ', error)
        return
      })
  }

  const handleSentImage = () => {
    handleSendImageLogic()
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

  return (
    <FadeView style={styles.container}>
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
              content={message?.text || ''}
              image={message.image}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.inputField}>
        <ChatInput
          value={text}
          onSend={() => sendMessageHandler('')}
          handleTextChange={(text: string) => onTextChange(text)}
          pickImage={handleSentImage}
        />
      </View>
    </FadeView>
  )
}

export default ChatScreen

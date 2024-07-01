import {ScrollView, Text, View} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {ConversationStackParamList} from '../../navigation/RootNavigator';
import {StyleSheet} from 'react-native';
import {colors} from '../../constants/color';
import ChatHeader from './chat-header';
import ChatInput from './chat-input';
import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  fetchMessages,
  findCommonChats,
  sendMessage,
} from '../../firebase/chats.api';
import {Message, Sender} from '../../types/chats.type';
import MessageRow from './message-row';
type Props = NativeStackScreenProps<ConversationStackParamList, 'Chat'>;

const ChatScreen: React.FC<Props> = ({route, navigation}) => {
  const receiver_uid = route.params.uid;
  //console.log(receiver_uid);
  const sender_uid = auth().currentUser?.uid;
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const loadMessages = async () => {
      if (sender_uid) {
        const findChatUID = await findCommonChats(sender_uid, receiver_uid);
        if (findChatUID) {
          //console.log('Then can fetch the messages?');
          const fetch = await fetchMessages(findChatUID);
          setMessages(fetch);
        }
      }
    };
    loadMessages();
  }, []);

  const onBackHandler = () => {
    navigation.pop();
  };

  const onTextChange = (text: string) => {
    setText(() => text);
  };

  const sendMessageHandler = async () => {
    if (sender_uid) {
      const senderInfor: Sender = {
        _id: sender_uid,
        avatar: '5',
        name: 'Do Duc Khai',
      };
      try {
        console.log(messages);
        await sendMessage(receiver_uid, text, senderInfor);
        setText('');
      } catch (error) {
        console.error('Fail to send message', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.paddingOfTop}></View>
      <View style={styles.header}>
        <ChatHeader
          receiver_id={receiver_uid}
          onBack={onBackHandler}
          onCallHander={() => console.log('Call')}
        />
      </View>
      <ScrollView style={styles.body}>
        {messages.map(message => (
          <MessageRow
            isMine={message.user._id === sender_uid ? true : false}
            content={message.text}
          />
        ))}
      </ScrollView>
      <View style={styles.inputField}>
        <ChatInput
          value={text}
          onSend={sendMessageHandler}
          handleTextChange={(text: string) => onTextChange(text)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paddingOfTop: {
    height: '5%',
    width: '100%',
    backgroundColor: colors.white,
  },
  header: {
    height: '7%',
    width: '100%',
  },
  body: {
    paddingHorizontal: 12,
  },
  inputField: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 24,
    alignItems: 'center',
  },
});

export default ChatScreen;

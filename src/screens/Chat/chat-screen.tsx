import {ScrollView, Text, View} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {ConversationStackParamList} from '../../navigation/RootNavigator';
import {StyleSheet} from 'react-native';
import {colors} from '../../constants/color';
import ChatHeader from './chat-header';
import ChatInput from './chat-input';
import {useState} from 'react';

type Props = NativeStackScreenProps<ConversationStackParamList, 'Chat'>;

const ChatScreen: React.FC<Props> = ({route, navigation}) => {
  const uid = route.params.uid;
  const [message, setMessage] = useState('');
  const onBackHandler = () => {
    navigation.pop();
  };

  const onTextChange = (text: string) => {
    setMessage(() => text);
  };

  const sendMessageHandler = () => {
    console.log(message);
  };

  return (
    <View style={styles.container}>
      <View style={styles.paddingOfTop}></View>
      <View style={styles.header}>
        <ChatHeader
          onBack={onBackHandler}
          onCallHander={() => console.log('Call')}
        />
      </View>
      <ScrollView style={styles.body}></ScrollView>
      <View style={styles.inputField}>
        <ChatInput
          value={message}
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

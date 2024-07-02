import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../constants/color';
import Icon from 'react-native-vector-icons/Ionicons';
import {useEffect} from 'react';
import Pulse from '../../animations/Pulse';

const {width} = Dimensions.get('window');

interface IChatInput {
  value: string;
  handleTextChange: (text: string) => void;
  onSend: () => void;
}

const ChatInput: React.FC<IChatInput> = ({handleTextChange, value, onSend}) => {
  const haveText: boolean = value !== '' ? true : false;

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={{width: '90%'}}>
          <TextInput
            value={value}
            placeholder="The input information"
            placeholderTextColor={colors.opacityBlack(0.4)}
            onChangeText={handleTextChange}
          />
        </View>
        <TouchableOpacity onPress={onSend}>
          <Pulse isRinging={haveText}>
            <Icon
              name="send"
              size={26}
              color={haveText ? colors.red : colors.opacityBlack(0.55)}
            />
          </Pulse>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    backgroundColor: colors.white,
    borderRadius: 60,
  },
  body: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ChatInput;

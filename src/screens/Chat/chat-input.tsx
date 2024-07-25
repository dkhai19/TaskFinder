import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Pulse from '../../animations/Pulse'
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'
import {getOpacityColor} from '../../constants/color'

const {width} = Dimensions.get('window')

interface IChatInput {
  value: string
  handleTextChange: (text: string) => void
  onSend: () => void
  pickImage: () => void
}

const ChatInput: React.FC<IChatInput> = ({
  handleTextChange,
  value,
  onSend,
  pickImage,
}) => {
  const haveText: boolean = value !== '' ? true : false
  const colors = useSelector((state: RootState) => state.authentication.colors)

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
  })

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 4,
          }}>
          <TouchableOpacity onPress={pickImage} style={{paddingHorizontal: 8}}>
            <Icon name="image" size={24} color={colors.red} />
          </TouchableOpacity>
          <TextInput
            style={{color: colors.black}}
            value={value}
            placeholder="The input information"
            placeholderTextColor={getOpacityColor(colors.black, 0.4)}
            onChangeText={handleTextChange}
          />
        </View>
        <TouchableOpacity onPress={onSend}>
          <Pulse isRinging={haveText}>
            <Icon
              name="send"
              size={26}
              color={
                haveText ? colors.red : getOpacityColor(colors.black, 0.55)
              }
            />
          </Pulse>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ChatInput

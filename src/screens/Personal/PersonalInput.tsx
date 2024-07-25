import {StyleSheet, Text, TextInput, View} from 'react-native'
import {typography} from '../../constants/typo'
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'
import {getOpacityColor} from '../../constants/color'
interface IPersonalInput {
  label: string
  isNumeric?: boolean
  isEditable?: boolean
  value: string
  handleChangeText: (text: string) => void
}

const PersonalInput: React.FC<IPersonalInput> = ({
  label,
  isNumeric,
  isEditable,
  value,
  handleChangeText,
}) => {
  const colors = useSelector((state: RootState) => state.authentication.colors)
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 62,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: getOpacityColor(colors.black, 0.5),
    },
    input: {
      paddingBottom: 8,
    },
  })
  return (
    <View style={[styles.container]}>
      <View
        style={{paddingLeft: 8, paddingTop: 8, justifyContent: 'space-evenly'}}>
        <Text
          style={[
            typography.f12_regular,
            {color: getOpacityColor(colors.black, 0.5)},
          ]}>
          {label}
        </Text>
        <TextInput
          style={[styles.input, typography.f14_medium, {color: colors.black}]}
          keyboardType={isNumeric ? 'numeric' : 'default'}
          value={value}
          onChangeText={handleChangeText}
          editable={isEditable ? false : true}
        />
      </View>
    </View>
  )
}

export default PersonalInput

import {StyleSheet, Text, TextInput, View} from 'react-native'
import {colors} from '../constants/color'
import {typography} from '../constants/typo'

interface IInput {
  label: string
  isNumeric?: boolean
  isEditable?: boolean
  multiline?: boolean
  numOfLines?: number
  value: string
  handleChangeText: (text: string) => void
}

const Input: React.FC<IInput> = ({
  label,
  isNumeric,
  isEditable,
  value,
  multiline,
  numOfLines,
  handleChangeText,
}) => {
  return (
    <View style={[styles.container]}>
      <View
        style={{paddingLeft: 8, paddingTop: 8, justifyContent: 'space-evenly'}}>
        <Text
          style={[typography.f13_regular, {color: colors.opacityBlack(0.5)}]}>
          {label}
        </Text>
        <TextInput
          style={[styles.input, typography.f14_medium]}
          keyboardType={isNumeric ? 'numeric' : 'default'}
          value={value}
          multiline={multiline}
          numberOfLines={numOfLines}
          onChangeText={handleChangeText}
          editable={isEditable ? false : true}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 62,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: colors.opacityBlack(0.2),
  },
  input: {
    paddingBottom: 16,
  },
})

export default Input

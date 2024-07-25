import {StyleSheet, Text, TextInput, View} from 'react-native'
import {typography} from '../constants/typo'
import {useSelector} from 'react-redux'
import {RootState} from '../redux/rootReducer'
import {getOpacityColor} from '../constants/color'

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
  const colors = useSelector((state: RootState) => state.authentication.colors)
  const lightTheme = useSelector(
    (state: RootState) => state.authentication.lightThem,
  )

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 62,
      borderRadius: 8,
      borderWidth: 3,
      borderColor: getOpacityColor(colors.black, 0.2),
    },
    input: {
      paddingBottom: 16,
    },
  })
  return (
    <View style={[styles.container]}>
      <View
        style={{paddingLeft: 8, paddingTop: 8, justifyContent: 'space-evenly'}}>
        <Text
          style={[
            typography.f13_regular,
            {color: getOpacityColor(colors.black, 0.5)},
          ]}>
          {label}
        </Text>
        <TextInput
          style={[styles.input, typography.f14_medium, {color: colors.black}]}
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

export default Input

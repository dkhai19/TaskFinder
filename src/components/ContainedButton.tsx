import {
  Button,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import {colors} from '../constants/color'
import {typography} from '../constants/typo'

interface IContainedButton {
  title: string
  style?: StyleProp<ViewStyle>
  onPress: () => void
}

const ContainedButton: React.FC<IContainedButton> = ({
  title,
  style,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text style={[typography.f20_medium, {color: colors.white}]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.red,
  },
})

export default ContainedButton

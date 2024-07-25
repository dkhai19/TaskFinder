import {
  Button,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import {typography} from '../constants/typo'
import {useSelector} from 'react-redux'
import {RootState} from '../redux/rootReducer'

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
  const colors = useSelector((state: RootState) => state.authentication.colors)
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
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text style={[typography.f20_medium, {color: colors.white}]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default ContainedButton

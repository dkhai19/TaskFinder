import {StyleSheet} from 'react-native'
import {TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {useSelector} from 'react-redux'
import {RootState} from '../redux/rootReducer'

interface IIconButton {
  onPress: () => void
  iconName: string
}

const IconButton: React.FC<IIconButton> = ({onPress, iconName}) => {
  const colors = useSelector((state: RootState) => state.authentication.colors)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      borderRadius: 12,
      backgroundColor: colors.red,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name={iconName} size={24} color={colors.white} />
    </TouchableOpacity>
  )
}

export default IconButton

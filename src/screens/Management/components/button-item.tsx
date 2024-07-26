import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {typography} from '../../../constants/typo'
import {useSelector} from 'react-redux'
import {RootState} from '../../../redux/rootReducer'
import {getOpacityColor} from '../../../constants/color'
interface IButtonItem {
  iconName?: string
  title: string
  onPress: () => void
}

const ButtonItem: React.FC<IButtonItem> = ({iconName, title, onPress}) => {
  const colors = useSelector((state: RootState) => state.authentication.colors)
  const styles = StyleSheet.create({
    iconContainer: {
      width: 180,
      height: 52,
      backgroundColor: getOpacityColor(colors.black, 0.2),
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderRadius: 8,
    },
    container: {
      width: 180,
      height: 52,
      backgroundColor: getOpacityColor(colors.black, 0.15),
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderRadius: 8,
    },
  })

  return (
    <TouchableOpacity
      style={iconName ? styles.iconContainer : styles.container}
      onPress={onPress}>
      {iconName && (
        <View style={{paddingRight: 8}}>
          <Icon name={iconName} size={28} color={colors.red} />
        </View>
      )}
      <Text
        style={[
          typography.f16_medium,
          {color: iconName ? colors.red : colors.black},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default ButtonItem

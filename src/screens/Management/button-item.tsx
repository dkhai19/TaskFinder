import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {colors} from '../../constants/color'
import {typography} from '../../constants/typo'
interface IButtonItem {
  iconName?: string
  title: string
  onPress: () => void
}

const ButtonItem: React.FC<IButtonItem> = ({iconName, title, onPress}) => {
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

const styles = StyleSheet.create({
  iconContainer: {
    width: 180,
    height: 52,
    backgroundColor: colors.opacityRed(0.2),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 8,
  },
  container: {
    width: 180,
    height: 52,
    backgroundColor: colors.opacityBlack(0.15),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 8,
  },
})

export default ButtonItem

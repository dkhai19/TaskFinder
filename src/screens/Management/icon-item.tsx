import {StyleSheet, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {colors} from '../../constants/color'
import {typography} from '../../constants/typo'
interface IIconItem {
  iconName: string
  label: string
}

const IconItem: React.FC<IIconItem> = ({iconName, label}) => {
  return (
    <View style={styles.container}>
      <View style={{paddingRight: 4}}>
        <Icon name={iconName} size={24} color={colors.opacityRed(0.7)} />
      </View>
      <Text style={[typography.f15_regular, {color: colors.black}]}>
        {label}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default IconItem

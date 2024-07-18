import {Text} from 'react-native'
import {StyleSheet, View} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import {typography} from '../../constants/typo'
import {colors} from '../../constants/color'
interface IRowItem {
  iconName: string
  iconColor: string
  title: string
}

const RowItem: React.FC<IRowItem> = ({iconName, iconColor, title}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name={iconName} color={iconColor} size={20} />
      </View>
      <Text style={[typography.f14_regular, {color: colors.black}]}>
        {title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    paddingHorizontal: 8,
  },
})

export default RowItem

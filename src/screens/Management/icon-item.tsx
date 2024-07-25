import {StyleSheet, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {typography} from '../../constants/typo'
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'
import {getOpacityColor} from '../../constants/color'
interface IIconItem {
  iconName: string
  label: string
}

const IconItem: React.FC<IIconItem> = ({iconName, label}) => {
  const colors = useSelector((state: RootState) => state.authentication.colors)
  return (
    <View style={styles.container}>
      <View style={{paddingRight: 4}}>
        <Icon
          name={iconName}
          size={24}
          color={getOpacityColor(colors.red, 0.75)}
        />
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

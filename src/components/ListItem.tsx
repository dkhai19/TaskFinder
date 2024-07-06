import Icon from 'react-native-vector-icons/Ionicons'
import {StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native'
import {colors} from '../constants/color'
import {typography} from '../constants/typo'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {toggleTheme} from '../redux/slices/authSlice'

interface IListItem {
  iconName: string
  header: string
  value?: string
  onPress?: () => void
  navigate?: boolean
  toggle?: boolean
}

const ListItem: React.FC<IListItem> = ({
  iconName,
  header,
  value,
  onPress,
  navigate,
  toggle,
}) => {
  const dispatch = useDispatch()
  const [isEnable, setIsEnable] = useState(false)
  const toggleSwitch = () => {
    setIsEnable(prevState => !prevState)
    dispatch(toggleTheme())
  }
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <View style={{paddingRight: 8}}>
          <Icon name={iconName} size={24} color={colors.black} />
        </View>
        <Text style={[typography.f16_regular, {color: colors.black}]}>
          {header}
        </Text>
      </View>
      <View style={styles.row}>
        <Text
          style={[typography.f13_regular, {color: colors.opacityBlack(0.25)}]}>
          {value}
        </Text>
        {navigate && (
          <View style={{paddingLeft: 8}}>
            <Icon
              name="chevron-forward-outline"
              size={24}
              color={colors.opacityBlack(0.25)}
            />
          </View>
        )}
        {toggle && (
          <Switch
            trackColor={{false: '#767577', true: colors.red}}
            thumbColor={isEnable ? colors.white : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnable}
          />
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 18,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
})

export default ListItem

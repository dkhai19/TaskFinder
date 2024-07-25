import Icon from 'react-native-vector-icons/Ionicons'
import {StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native'
import {typography} from '../constants/typo'
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setColors, toggleTheme} from '../redux/slices/authSlice'
import {RootState} from '../redux/rootReducer'
import {getOpacityColor} from '../constants/color'

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
  const colors = useSelector((state: RootState) => state.authentication.colors)
  const dispatch = useDispatch()
  const [isEnable, setIsEnable] = useState(false)
  const toggleSwitch = () => {
    setIsEnable(prevState => !prevState)
    dispatch(toggleTheme())
    dispatch(setColors())
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
      alignItems: 'center',
    },
    icon_container: {
      paddingHorizontal: 8,
      paddingVertical: 12,
      backgroundColor: getOpacityColor(colors.red, 0.4),
      borderRadius: 8,
    },
  })
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <View style={styles.icon_container}>
          <View style={{}}>
            <Icon name={iconName} size={24} color={colors.black} />
          </View>
        </View>
        <View style={{paddingLeft: 16}}>
          <Text style={[typography.f16_medium, {color: colors.black}]}>
            {header}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text
          style={[
            typography.f13_regular,
            {color: getOpacityColor(colors.black, 0.5)},
          ]}>
          {value}
        </Text>
        {navigate && (
          <View style={{paddingLeft: 8}}>
            <Icon
              name="chevron-forward-outline"
              size={24}
              color={getOpacityColor(colors.black, 0.5)}
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

export default ListItem

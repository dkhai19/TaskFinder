import {StyleSheet, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {typography} from '../../constants/typo'
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'
import {getOpacityColor} from '../../constants/color'
interface IProfileItem {
  iconName: string
  mainContent: string
  subContent: string
}

const ProfileItem: React.FC<IProfileItem> = ({
  iconName,
  mainContent,
  subContent,
}) => {
  const colors = useSelector((state: RootState) => state.authentication.colors)

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRightWidth: 0.5,
      borderColor: getOpacityColor(colors.black, 0.5),
      minHeight: 60,
      minWidth: 180,
    },
  })
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View style={{marginRight: 4}}>
          <Icon name={iconName} size={24} color={colors.red} />
        </View>
        <Text style={[typography.f16_medium, {color: colors.black}]}>
          {mainContent}
        </Text>
      </View>
      <View
        style={{
          marginTop: 6,
        }}>
        <Text
          style={[
            typography.f16_semibold,
            {color: getOpacityColor(colors.black, 0.5)},
          ]}>
          {subContent}
        </Text>
      </View>
    </View>
  )
}

export default ProfileItem

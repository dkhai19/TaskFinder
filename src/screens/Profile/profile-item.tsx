import {StyleSheet, Text, View} from 'react-native'
import {colors} from '../../constants/color'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {typography} from '../../constants/typo'
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
          style={[typography.f16_semibold, {color: colors.opacityBlack(0.5)}]}>
          {subContent}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 0.5,
    borderColor: colors.opacityBlack(0.5),
    minHeight: 60,
    minWidth: 180,
  },
})

export default ProfileItem

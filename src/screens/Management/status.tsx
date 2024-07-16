import {StyleSheet, View} from 'react-native'
import {colors} from '../../constants/color'
import Icon from 'react-native-vector-icons/Ionicons'

interface IStatus {
  status: string
}

const Status: React.FC<IStatus> = ({status}) => {
  const color =
    status === 'accepted' ? '#399918' : 'rejected' ? '#E4003A' : '#4535C1'
  const iconName =
    status === 'accepted'
      ? 'checkmark-done-sharp'
      : 'rejected'
      ? 'close-sharp'
      : 'sync-circle-sharp'
  return (
    <View style={styles.container}>
      <View style={[styles.content, {borderColor: color}]}>
        <Icon name={iconName} size={28} color={color} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  content: {
    width: 45,
    height: 45,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
  },
})

export default Status

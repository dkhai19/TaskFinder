import messaging from '@react-native-firebase/messaging'
import {PermissionsAndroid, Platform} from 'react-native'

export const getNotificationPermission = async () => {
  if (Platform.OS === 'ios') {
  } else {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true
    } else {
      return false
    }
  }
}

export const checkToken = async () => {
  const checkPermission = await getNotificationPermission()
  if (checkPermission) {
    const fcmToken = await messaging().getToken()
    return fcmToken
  }
  return ''
}

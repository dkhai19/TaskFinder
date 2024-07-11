// streamConfig.ts
import {StreamVideoClient} from '@stream-io/video-react-native-sdk'
import {IUsers} from '../types/users.type'
import {PermissionsAndroid, Platform} from 'react-native'

const STREAM_API_KEY = '9puabwjb5p2p'

const client = new StreamVideoClient({
  apiKey: STREAM_API_KEY,
})

export const requestCameraPermission = async () => {
  if (Platform.OS === 'ios') {
  } else {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'We need access to your camera to make video calls',
        buttonPositive: 'OK',
      },
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true
    } else {
      return false
    }
  }
}

export const requestMicrophonePermission = async () => {
  if (Platform.OS === 'ios') {
  } else {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Microphone Permission',
        message: 'We need access to your microphone to make video calls',
        buttonPositive: 'OK',
      },
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true
    }
    return false
  }
}

export default client

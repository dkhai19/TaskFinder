// streamConfig.ts
import {StreamVideoClient} from '@stream-io/video-react-native-sdk'
import {PermissionsAndroid, Platform} from 'react-native'

import CryptoJS from 'crypto-js'
import base64url from 'base64url'
import {IPayloadUser} from '../types/users.type'

const STREAM_API_KEY = '9puabwjb5p2p'
const SECRET_API =
  'xs93ftx87nujrm35z6eat7uzge5jky74hcby9umye2g4sdcdurkc25hmj8jf3gak'

const client = new StreamVideoClient({
  apiKey: STREAM_API_KEY,
})

export const signJWT = (user: IPayloadUser): string => {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  }

  const encodedHeader = base64url.encode(JSON.stringify(header))
  const encodedPayload = base64url.encode(JSON.stringify(user))

  const data = `${encodedHeader}.${encodedPayload}`
  const signature = base64url.encode(
    CryptoJS.HmacSHA256(data, SECRET_API).toString(CryptoJS.enc.Base64),
  )

  return `${data}.${signature}`
}

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

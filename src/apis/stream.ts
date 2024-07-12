// streamConfig.ts
import {StreamVideoClient} from '@stream-io/video-react-native-sdk'
import {PermissionsAndroid, Platform} from 'react-native'

import CryptoJS from 'crypto-js'
//import base64url from 'base64url'
import {IPayloadUser} from '../types/users.type'

const STREAM_API_KEY = '9puabwjb5p2p'
const SECRET_API =
  'xs93ftx87nujrm35z6eat7uzge5jky74hcby9umye2g4sdcdurkc25hmj8jf3gak'

const client = new StreamVideoClient({
  apiKey: STREAM_API_KEY,
})

const base64url = (input: string): string => {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(input))
    .replace(/=+$/, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

export const signJWT = (user: IPayloadUser): string => {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  }

  const payload = {
    ...user,
  }

  const encodedHeader = base64url(JSON.stringify(header))
  const encodedPayload = base64url(JSON.stringify(payload))

  const data = `${encodedHeader}.${encodedPayload}`

  const signature = CryptoJS.HmacSHA256(data, SECRET_API)
    .toString(CryptoJS.enc.Base64)
    .replace(/=+$/, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')

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

// streamConfig.ts
import {StreamVideoClient} from '@stream-io/video-react-native-sdk'
import {PermissionsAndroid, Platform} from 'react-native'

import CryptoJS from 'crypto-js'
//import base64url from 'base64url'
import {IPayloadUser} from '../types/users.type'

const STREAM_API_KEY = 'j4afxwujxm3t'
const SECRET_API =
  'ppysy4acrw6jcu6ej328en4rmasxekv9d7yeqwyb2n5886cwv9pxz25uvapng5zm'

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

import {PermissionsAndroid, Platform} from 'react-native'
import Geolocation from 'react-native-geolocation-service'

export type LocationCoordinates = [number, number]

export const requestLocationPermission = async () => {
  if (Platform.OS === 'ios') {
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getLocation()
        return 'granted'
      } else {
        return 'denied'
      }
    } catch (err) {
      console.warn(err)
    }
  }
  return 'pending'
}

export const getLocation = (): Promise<LocationCoordinates> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        resolve([position.coords.longitude, position.coords.latitude])
      },
      error => {
        console.log(error.code, error.message)
        reject(error)
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    )
  })
}

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler'
import React, {useEffect} from 'react'
import {SafeAreaView, StyleSheet, useColorScheme} from 'react-native'
import AppNavigator from './src/navigation/AppNavigator'
import {Provider} from 'react-redux'
import store from './src/redux/store/store'
import {Buffer} from 'buffer'
import {getNotificationPermission} from './src/firebase/notifications.api'
import messaging from '@react-native-firebase/messaging'
global.Buffer = Buffer

getNotificationPermission()
function App(): React.JSX.Element {
  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background message handled:', remoteMessage)
    })
    messaging().onMessage(remoteMessage => {
      console.log('Foreground message:', remoteMessage)
      // Display the notification to the user
    })
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'App opened by notification while in foreground:',
        remoteMessage,
      )
      // Handle notification interaction when the app is in the foreground
    })
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log(
          'App opened by notification from closed state:',
          remoteMessage,
        )
        // Handle notification interaction when the app is opened from a closed state
      })
  }, [])

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
  },
})

export default App

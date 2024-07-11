import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native'
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types'
import {ChatStackParamList} from '../../navigation/RootNavigator'
import {
  Call,
  CallContent,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-native-sdk'
import {useEffect, useState} from 'react'
import client from '../../apis/stream'
import {typography} from '../../constants/typo'
import {colors} from '../../constants/color'

type Props = NativeStackScreenProps<ChatStackParamList, 'Call'>

const CallScreen: React.FC<Props> = ({navigation, route}) => {
  const [call, setCall] = useState<Call | null>(null)

  const callId = route.params.callId

  useEffect(() => {
    const setupCall = async () => {
      const _call = client.call('default', callId)
      try {
        await _call.create() // Create the call
      } catch (error) {
        // Ignore if the call already exists
        if (error !== 'Call already exists') {
          console.error('Error creating call:', error)
          return
        }
      }

      setCall(_call)

      try {
        await _call.join() // Join the call
        console.log('Joined the call')
      } catch (error) {
        console.error('Error joining call:', error)
      }
    }

    setupCall()
  }, [])

  if (!call) {
    return (
      <View
        style={[
          styles.container,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <Text style={[typography.f17_medium, {color: colors.black}]}>
          Waiting to join the call...
        </Text>
      </View>
    )
  }

  const goBack = () => {
    navigation.pop()
    call.leave()
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <SafeAreaView style={styles.container}>
          <CallContent
            layout="spotlight"
            onHangupCallHandler={goBack}
            onBackPressed={goBack}
          />
        </SafeAreaView>
      </StreamCall>
    </StreamVideo>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default CallScreen

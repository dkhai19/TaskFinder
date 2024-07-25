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
import {sendCallNotification} from '../../apis/notify'
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'

type Props = NativeStackScreenProps<ChatStackParamList, 'Call'>

const CallScreen: React.FC<Props> = ({navigation, route}) => {
  const [call, setCall] = useState<Call | null>(null)
  const fcmToken = route.params.receiver_fcmToken
  const currentUser = useSelector((state: RootState) => state.user.currentUser)
  const callId = route.params.callId
  const callType = route.params.type
  const colors = useSelector((state: RootState) => state.authentication.colors)
  useEffect(() => {
    const setupCall = async () => {
      const _call = client.call('default', callId)
      if (callType === 'create') {
        try {
          Promise.all([
            await sendCallNotification(
              fcmToken,
              `${currentUser.first_name} ${currentUser.last_name}`,
              'Invite you to a call',
              {
                callId: callId,
              },
            ),
            await _call.join({
              create: true,
            }),
          ])
        } catch (error) {
          if (error !== 'Call already exists') {
            console.error('Error creating call:', error)
            return
          }
        }
      } else {
        await _call.join()
      }

      setCall(_call)

      // try {
      //   await _call.join() // Join the call
      //   console.log('Joined the call')
      // } catch (error) {
      //   console.error('Error joining call:', error)
      // }
    }

    setupCall()
    const leaveCall = async () => {
      await call?.endCall()
    }
    return () => {
      leaveCall()
    }
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
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <SafeAreaView style={styles.container}>
          <CallContent
            layout="grid"
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

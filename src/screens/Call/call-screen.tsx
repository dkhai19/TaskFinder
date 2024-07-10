import {Text, View} from 'react-native'
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types'
import {ChatStackParamList} from '../../navigation/RootNavigator'

type Props = NativeStackScreenProps<ChatStackParamList, 'Call'>

const CallScreen: React.FC<Props> = ({navigation, route}) => {
  return (
    <View>
      <Text>{route.params.apiKey}</Text>
      <Text>{route.params.callId}</Text>
      <Text>{route.params.token}</Text>
      <Text>{route.params.uid}</Text>
    </View>
  )
}

export default CallScreen

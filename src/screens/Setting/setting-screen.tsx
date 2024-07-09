import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {colors} from '../../constants/color'
import {typography} from '../../constants/typo'
import Icon from 'react-native-vector-icons/Ionicons'
import {useDispatch} from 'react-redux'
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types'
import {LoginStackParamList} from '../../navigation/RootNavigator'
import {StackNavigationProp} from '@react-navigation/stack'
import {useNavigation} from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import KeyValueText from '../../components/KeyValue'
import ListItem from '../../components/ListItem'

type Props = StackNavigationProp<LoginStackParamList, 'Login'>

const SettingScreen: React.FC = () => {
  const navigation = useNavigation<Props>()
  const dispatch = useDispatch()

  const showAlert = () => {
    Alert.alert('Signing out', 'Do you want to sign out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: confirmSignOut,
      },
    ])
  }

  //Clear redux and also firebase state
  const confirmSignOut = () => {
    //Clear redux
    dispatch({type: 'RESET_STORE'})
    try {
      auth().signOut()
      navigation.replace('Login')
    } catch (error) {
      console.log(error)
    }
  }

  const currentUser = auth().currentUser
  return (
    <View style={settingStyles.container}>
      <View style={settingStyles.body}>
        <View style={settingStyles.header}>
          <Text style={[typography.f24_semibold, {color: colors.black}]}>
            Personal
          </Text>
        </View>
        <View style={settingStyles.image_row}>
          <Image
            style={settingStyles.image}
            source={{
              uri: 'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg',
            }}
          />
          <View style={settingStyles.text_column}>
            <Text style={[typography.f17_medium, {color: colors.black}]}>
              Do Duc Khai
            </Text>
            <Text
              style={[
                typography.f13_regular,
                {color: colors.opacityBlack(0.4)},
              ]}>
              {currentUser?.email}
            </Text>
          </View>
        </View>
        <View style={settingStyles.achievement_container}>
          <KeyValueText title="Tasks done" value="123" />
          <KeyValueText title="Rating" value="4.6" />
        </View>
        <View style={settingStyles.navigation_container}>
          <ListItem
            iconName="person-outline"
            header="Personal Information"
            navigate
          />
          <ListItem
            iconName="people-outline"
            header="Following"
            value="14"
            navigate
          />
          <ListItem iconName="moon" header="Dark mode" toggle />
          <ListItem
            iconName="log-out-outline"
            header="Sign out"
            navigate
            onPress={showAlert}
          />
        </View>
      </View>
    </View>
  )
}

const settingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 16,
  },
  body: {
    paddingTop: 16,
    paddingHorizontal: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    //backgroundColor: colors.red,
  },
  image_row: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
    maxHeight: 100,
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  text_column: {
    paddingLeft: 16,
    justifyContent: 'center',
    height: '100%',
  },
  achievement_container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  navigation_container: {
    paddingTop: 32,
  },
})
export default SettingScreen

import {Alert, Image, StyleSheet, Text, View} from 'react-native'
import {typography} from '../../constants/typo'
import {useDispatch, useSelector} from 'react-redux'
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types'
import {RootStackParamList} from '../../navigation/RootNavigator'
import {useNavigation} from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import KeyValueText from '../../components/KeyValue'
import ListItem from '../../components/ListItem'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {RootState} from '../../redux/rootReducer'
import {getOpacityColor} from '../../constants/color'

const SettingScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const dispatch = useDispatch()
  const currentUser = useSelector((state: RootState) => state.user.currentUser)
  const colors = useSelector((state: RootState) => state.authentication.colors)
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
      AsyncStorage.clear()
      navigation.replace('LoginNavigator')
    } catch (error) {
      console.log(error)
    }
  }

  const navigateToProfile = () => {
    navigation.navigate('Personal')
  }

  if (!currentUser) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={[typography.f16_semibold, {color: colors.black}]}>
          Loading owner information.
        </Text>
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
      borderBottomWidth: 0.2,
      borderColor: getOpacityColor(colors.black, 0.5),
    },
    image_container: {
      height: 80,
      width: 80,
      elevation: 5,
      shadowColor: getOpacityColor(colors.black, 0.8),
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      overflow: 'hidden',
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      height: 70,
      width: 70,
      borderRadius: 16,
    },
    text_column: {
      paddingLeft: 16,
      justifyContent: 'center',
      height: '100%',
    },
    achievement_container: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingTop: 24,
    },
    navigation_container: {
      paddingTop: 24,
    },
  })

  return (
    <View style={settingStyles.container}>
      <View style={settingStyles.body}>
        <View style={settingStyles.image_row}>
          <View style={settingStyles.image_container}>
            <Image
              style={settingStyles.image}
              source={{uri: currentUser.avatar}}
              alt="Alt"
            />
          </View>
          <View style={settingStyles.text_column}>
            <Text style={[typography.f20_bold, {color: colors.black}]}>
              {currentUser?.first_name + ' ' + currentUser?.last_name}
            </Text>
            <Text
              style={[
                typography.f15_regular,
                {color: getOpacityColor(colors.black, 0.5)},
              ]}>
              {currentUser?.email}
            </Text>
          </View>
        </View>
        <View style={settingStyles.achievement_container}>
          {/* <KeyValueText title="Tasks done" value="123" />
          <KeyValueText title="Rating" value="4.6" /> */}
        </View>
        <View style={settingStyles.navigation_container}>
          <ListItem
            iconName="person"
            header="Personal Information"
            navigate
            onPress={navigateToProfile}
          />
          <ListItem iconName="people" header="Following" value="14" navigate />
          <ListItem iconName="moon" header="Dark mode" toggle />
          <ListItem
            iconName="log-out"
            header="Sign out"
            navigate
            onPress={showAlert}
          />
        </View>
      </View>
    </View>
  )
}

export default SettingScreen

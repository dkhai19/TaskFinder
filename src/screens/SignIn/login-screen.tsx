import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {typography} from '../../constants/typo'
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types'
import {LoginStackParamList} from '../../navigation/RootNavigator'
import auth from '@react-native-firebase/auth'
import {useEffect, useState} from 'react'
import {
  validateEmail,
  validatePassword,
} from '../../validations/user-infor-validation'
import Icon from 'react-native-vector-icons/Ionicons'
import {useDispatch, useSelector} from 'react-redux'
import {setUserID} from '../../redux/slices/authSlice'
import LoadingModal from '../../animations/LoadingModal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {findUserById, updateFcmToken} from '../../firebase/users.api'
import {setCurrentUser} from '../../redux/slices/userSlice'
import {checkToken} from '../../firebase/notifications.api'
import {AppDispatch} from '../../redux/store/store'
import {RootState} from '../../redux/rootReducer'
import {getOpacityColor} from '../../constants/color'

type Props = NativeStackScreenProps<LoginStackParamList, 'Login'>

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>()
  const colors = useSelector((state: RootState) => state.authentication.colors)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [errorText, setErrorText] = useState({
    errorEmail: '',
    errorPwd: '',
  })

  const [hidePassword, setHidePassword] = useState<boolean>(true)
  const handleHideOrShowPassword = () => {
    setHidePassword(prev => !prev)
  }
  //Handle change input
  const handleChangeUserInput = (key: string, value: string) => {
    setUser({
      ...user,
      [key]: value,
    })
  }
  //Navigate to sign up screen
  const signUpHandler = () => {
    navigation.navigate('Signup')
  }

  const storeLoginInformation = async (
    email: string,
    password: string,
    uid: string,
  ) => {
    await Promise.all([
      await AsyncStorage.setItem('email', email),
      await AsyncStorage.setItem('password', password),
    ])
    const getUserInfor = await findUserById(uid)
    dispatch(setCurrentUser(getUserInfor))
    const fcmToken = await checkToken()
    await updateFcmToken(uid, fcmToken)
  }

  useEffect(() => {
    if (!validateEmail(user.email)) {
      setErrorText(prevState => ({
        ...prevState,
        errorEmail:
          'Email must have at least 6 characters and suffix is @gmail.com',
      }))
    } else {
      setErrorText(prevState => ({
        ...prevState,
        errorEmail: '',
      }))
    }
    if (!validatePassword(user.password)) {
      setErrorText(prevState => ({
        ...prevState,
        errorPwd:
          'Password must contain at least a capital letter, a number and a special character',
      }))
    } else {
      setErrorText(prevState => ({
        ...prevState,
        errorPwd: '',
      }))
    }
  }, [user])

  // useEffect(() => {
  //   const autoSignIn = async () => {
  //     const getEmail = await AsyncStorage.getItem('email')
  //     const getPwd = await AsyncStorage.getItem('password')
  //     if (getEmail && getPwd) {
  //       setIsLoading(() => true)
  //       auth()
  //         .signInWithEmailAndPassword(getEmail, getPwd)
  //         .then(currentUser => {
  //           dispatch(setUserID(currentUser.user.uid))
  //           storeLoginInformation(
  //             user.email,
  //             user.password,
  //             currentUser.user.uid,
  //           )
  //           setTimeout(() => {
  //             setIsLoading(() => false)
  //             navigation.replace('Main')
  //           }, 1500)
  //         })
  //         .catch(error => {
  //           setIsLoading(() => false)
  //           console.log(error)
  //         })
  //     } else {
  //       return
  //     }
  //   }
  //   autoSignIn()
  // }, [])

  //Handle sign in logic
  const signInHandler = () => {
    setIsLoading(() => true)
    auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(currentUser => {
        dispatch(setUserID(currentUser.user.uid))
        //console.log(currentUser.user.uid);
        storeLoginInformation(user.email, user.password, currentUser.user.uid)
        setTimeout(() => {
          setIsLoading(() => false)
          navigation.replace('Main')
        }, 1500)
      })
      .catch(error => {
        setIsLoading(() => false)
        console.log(error)
      })
  }

  const loginStyles = StyleSheet.create({
    container: {
      flex: 1,
    },
    images_layer: {
      ...StyleSheet.absoluteFillObject,
      zIndex: -1,
    },
    background_layer: {
      flex: 1,
      backgroundColor: getOpacityColor(colors.black, 0.75),
    },
    image1_container: {
      width: '100%',
      height: '60%',
      backgroundColor: colors.blue,
    },
    image2_container: {
      width: '100%',
      height: '40%',
      backgroundColor: colors.red,
    },
    image3_container: {
      width: '100%',
      height: '45%',
      backgroundColor: colors.red,
    },
    image4_container: {
      width: '100%',
      height: '55%',
      backgroundColor: colors.blue,
    },
    content_container: {
      flex: 1,
      paddingHorizontal: 16,
    },
    slogan_container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    middle: {
      flex: 5,
    },
    input_container: {
      width: '100%',
      height: 60,
      borderRadius: 71,
      backgroundColor: getOpacityColor(colors.white, 0.3),
      justifyContent: 'center',
      marginTop: 16,
    },
    input: {
      color: colors.white,
      paddingVertical: 18,
      paddingRight: 16,
      paddingHorizontal: 24,
      width: '85%',
    },
    button_container: {
      width: '100%',
      height: 60,
      borderRadius: 71,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 16,
    },
    register_container: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'flex-end',
      marginTop: 16,
    },
    agreement_container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      paddingBottom: 16,
    },
    icon_container: {
      padding: 8,
      paddingRight: 16,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 1,
    },
    error: {
      fontSize: 14,
      color: 'red',
    },
  })

  return (
    <View
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={loginStyles.container}>
      {isLoading && <LoadingModal visible />}
      <View style={loginStyles.images_layer}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <View style={loginStyles.image1_container}>
              <Image
                source={require('../../assets/photos/image1.jpg')}
                resizeMode="stretch"
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <View style={loginStyles.image2_container}>
              <Image
                source={require('../../assets/photos/image2.jpg')}
                resizeMode="stretch"
                style={{width: '100%', height: '100%'}}
              />
            </View>
          </View>
          <View style={{flex: 1}}>
            <View style={loginStyles.image3_container}>
              <Image
                source={require('../../assets/photos/image3.jpg')}
                resizeMode="stretch"
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <View style={loginStyles.image4_container}>
              <Image
                source={require('../../assets/photos/image4.jpg')}
                resizeMode="stretch"
                style={{width: '100%', height: '100%'}}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={loginStyles.background_layer}>
        <View style={loginStyles.content_container}>
          <View style={loginStyles.slogan_container}>
            <Text
              style={[
                typography.f36_boldItalic,
                {
                  color: colors.white,
                  letterSpacing: 2,
                },
              ]}>
              Get tasks
            </Text>
          </View>
          <View style={loginStyles.middle}>
            <View style={loginStyles.input_container}>
              <TextInput
                style={loginStyles.input}
                placeholder="Enter email or username"
                placeholderTextColor={getOpacityColor(colors.white, 0.8)}
                onChangeText={text => handleChangeUserInput('email', text)}
              />
            </View>
            {errorText.errorEmail !== '' && (
              <View style={{paddingLeft: 24, marginTop: 8}}>
                <Text style={loginStyles.error}>{errorText.errorEmail}</Text>
              </View>
            )}
            <View
              style={[
                loginStyles.input_container,
                {flexDirection: 'row', justifyContent: 'space-between'},
              ]}>
              <TextInput
                style={[loginStyles.input]}
                placeholder="Enter password"
                placeholderTextColor={getOpacityColor(colors.white, 0.8)}
                onChangeText={text => handleChangeUserInput('password', text)}
                secureTextEntry={hidePassword}
              />
              <TouchableOpacity
                onPress={handleHideOrShowPassword}
                style={loginStyles.icon_container}>
                <Icon
                  name={hidePassword ? 'eye' : 'eye-off'}
                  size={24}
                  color={colors.red}
                />
              </TouchableOpacity>
            </View>
            {errorText.errorPwd !== '' && (
              <View style={{paddingLeft: 24, marginTop: 8}}>
                <Text style={loginStyles.error}>{errorText.errorPwd}</Text>
              </View>
            )}
            <TouchableOpacity
              onPress={signInHandler}
              disabled={
                !validateEmail(user.email) || !validatePassword(user.password)
              }
              style={[
                loginStyles.button_container,
                {
                  backgroundColor:
                    validateEmail(user.email) && validatePassword(user.password)
                      ? colors.red
                      : '#888d89',
                },
              ]}>
              <Text style={[typography.f17_medium, {color: colors.white}]}>
                Sign In
              </Text>
            </TouchableOpacity>
            <View style={loginStyles.register_container}>
              <Text
                style={[
                  typography.f15_regular,
                  {
                    color: colors.white,
                  },
                ]}>
                Dont have account?{' '}
              </Text>
              <TouchableOpacity onPress={signUpHandler}>
                <Text
                  style={[
                    typography.f16_medium,
                    {
                      color: colors.blue,
                      textDecorationLine: 'underline',
                    },
                  ]}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={loginStyles.agreement_container}>
            <Text style={[typography.f13_regular, {color: colors.white}]}>
              By signing in, you agree to the User Agreemen
            </Text>
            <Text style={[typography.f13_regular, {color: colors.white}]}>
              and Privacy Terms.
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default LoginScreen

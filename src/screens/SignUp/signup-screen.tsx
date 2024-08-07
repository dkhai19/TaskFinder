import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
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
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validatePhone,
} from '../../validations/user-infor-validation'
import Icon from 'react-native-vector-icons/Ionicons'
import SignUpModal from './signup-modal'
import {IUsers} from '../../types/users.type'
import LoadingModal from '../../animations/LoadingModal'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../redux/store/store'
import {addUser} from '../../redux/thunks/userThunks'
import {setUserID} from '../../redux/slices/authSlice'
import {RootState} from '../../redux/rootReducer'
import {findUserById} from '../../firebase/users.api'
import {setCurrentUser} from '../../redux/slices/userSlice'
import {getOpacityColor} from '../../constants/color'

type Props = NativeStackScreenProps<LoginStackParamList, 'Signup'>

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const userId = useSelector((state: RootState) => state.authentication.uid)
  const location = useSelector((state: RootState) => state.permission)
  const colors = useSelector((state: RootState) => state.authentication.colors)
  //State store user information
  const dispatch = useDispatch<AppDispatch>()
  //State to control loading
  const [isLoading, setIsLoading] = useState(false)
  //State to check input
  const [input, setInput] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  })

  //State to control modal
  const [openModal, setOpenModal] = useState<boolean>(false)

  //State to store error message
  const [errorMessages, setErrorMessage] = useState({
    invalidEmail: '',
    invalidPassword: '',
    invalidConfirmPassword: '',
    invalidPhone: '',
  })
  let checkInput: Boolean
  if (
    validateEmail(input.email) &&
    validatePassword(input.password) &&
    validatePhone(input.phoneNumber) &&
    input.password === input.confirmPassword
  ) {
    checkInput = true
  } else {
    checkInput = false
  }
  //Check every input of confirmPassword whether it matchs password

  useEffect(() => {
    setErrorMessage(prevState => ({
      ...prevState,
      invalidEmail: !validateEmail(input.email)
        ? 'Email must have at least 6 characters before @ and the suffix follow @gmail.com'
        : '',
    }))
  }, [input.email])

  useEffect(() => {
    setErrorMessage(prevState => ({
      ...prevState,
      invalidPassword: !validatePassword(input.password)
        ? 'Password must have at least 8 characters, 1 number, 1 capital and 1 special character '
        : '',
    }))
  }, [input.password])

  useEffect(() => {
    setErrorMessage(prevState => ({
      ...prevState,
      invalidPhone: !validatePhone(input.phoneNumber)
        ? 'Phone number must match VietNam phone number'
        : '',
    }))
  }, [input.phoneNumber])

  useEffect(() => {
    setErrorMessage(prevState => ({
      ...prevState,
      invalidConfirmPassword: !validateConfirmPassword(
        input.password,
        input.confirmPassword,
      )
        ? 'Your confirm password not match!'
        : '',
    }))
  }, [input.confirmPassword])

  //State to control user want to hide password or not
  const [hidePassword, setHidePassword] = useState<boolean>(true)
  const handleHideOrShowPassword = () => {
    setHidePassword(prev => !prev)
  }
  //Navigate to sign in screen
  const signInHandler = () => {
    navigation.goBack()
  }

  const setUserInformation = async () => {
    const getUserInfor = await findUserById(userId)
    dispatch(setCurrentUser(getUserInfor))
  }

  const navigateToHome = () => {
    setIsLoading(() => true)
    setUserInformation()
    setTimeout(() => {
      setIsLoading(() => false)
      navigation.replace('Main')
    }, 1000)
  }

  //Handle input value base on key and text changed
  const handleInputChange = (key: string, value: string) => {
    setInput({
      ...input,
      [key]: value,
    })
  }

  //Logic for sign up
  const handleConfirmSignUp = () => {
    signUpFirebaseHandler()
  }

  //Sign up function
  const signUpFirebaseHandler = () => {
    setIsLoading(true)
    auth()
      .createUserWithEmailAndPassword(input.email, input.password)
      .then(UserCredential => {
        const uid = UserCredential.user.uid
        const userData: IUsers = {
          id: uid,
          avatar: '',
          email: input.email,
          birthday: '',
          first_name: '',
          last_name: '',
          gender: '',
          introduction: '',
          rating: 0,
          phone: input.phoneNumber,
          location: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
          role: 'employee',
        }
        dispatch(addUser(userData))
        dispatch(setUserID(uid))
        dispatch(setCurrentUser(userData))
        setIsLoading(false)
        setOpenModal(true)
        //navigation.navigate('Main');
      })
      .catch(error => {
        setIsLoading(() => false)
        if (error.code === 'auth/email-already-in-use') {
          console.log(
            ' The email address is already in use by another account.',
          )
        }
      })
  }

  const signupStyles = StyleSheet.create({
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
      flex: 7,
    },
    input_container: {
      width: '100%',
      height: 60,
      borderRadius: 71,
      backgroundColor: getOpacityColor(colors.white, 0.3),
      marginTop: 16,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    input: {
      color: colors.white,
      paddingVertical: 18,
      paddingLeft: 28,
      paddingRight: 16,
      width: '85%',
    },
    icon_container: {
      padding: 8,
      justifyContent: 'center',
      alignItems: 'center',
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
    alert: {
      height: 60,
      width: '60%',
      backgroundColor: colors.white,
    },
    phone_container: {
      width: '20%',
      height: '80%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRightWidth: 1,
      borderColor: colors.white,
    },
  })

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={signupStyles.container}>
      {openModal && <SignUpModal onPress={navigateToHome} />}
      {isLoading && <LoadingModal visible />}
      <View style={signupStyles.images_layer}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <View style={signupStyles.image1_container}>
              <Image
                source={require('../../assets/photos/image1.jpg')}
                resizeMode="stretch"
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <View style={signupStyles.image2_container}>
              <Image
                source={require('../../assets/photos/image2.jpg')}
                resizeMode="stretch"
                style={{width: '100%', height: '100%'}}
              />
            </View>
          </View>
          <View style={{flex: 1}}>
            <View style={signupStyles.image3_container}>
              <Image
                source={require('../../assets/photos/image3.jpg')}
                resizeMode="stretch"
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <View style={signupStyles.image4_container}>
              <Image
                source={require('../../assets/photos/image4.jpg')}
                resizeMode="stretch"
                style={{width: '100%', height: '100%'}}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={signupStyles.background_layer}>
        <View style={signupStyles.content_container}>
          <View style={signupStyles.slogan_container}>
            <Text
              style={[
                typography.f36_boldItalic,
                {
                  color: colors.white,
                  letterSpacing: 2,
                },
              ]}>
              Take the 1st step
            </Text>
          </View>
          <View style={signupStyles.middle}>
            <View style={signupStyles.input_container}>
              <TextInput
                style={signupStyles.input}
                placeholder="Enter email or username"
                onChangeText={text => handleInputChange('email', text)}
                placeholderTextColor={getOpacityColor(colors.white, 0.8)}
              />
            </View>
            {errorMessages.invalidEmail !== '' && (
              <View style={{paddingHorizontal: 16}}>
                <Text style={[typography.f15_regular, {color: 'red'}]}>
                  {errorMessages.invalidEmail}
                </Text>
              </View>
            )}
            <View style={[signupStyles.input_container]}>
              <TextInput
                style={signupStyles.input}
                placeholder="Enter password"
                placeholderTextColor={getOpacityColor(colors.white, 0.8)}
                onChangeText={text => handleInputChange('password', text)}
                secureTextEntry={hidePassword}
              />
              <TouchableOpacity
                onPress={handleHideOrShowPassword}
                style={signupStyles.icon_container}>
                <Icon
                  name={hidePassword ? 'eye' : 'eye-off'}
                  size={24}
                  color={colors.red}
                />
              </TouchableOpacity>
            </View>
            {errorMessages.invalidPassword !== '' && (
              <View style={{paddingHorizontal: 16}}>
                <Text style={[typography.f15_regular, {color: 'red'}]}>
                  {errorMessages.invalidPassword}
                </Text>
              </View>
            )}
            <View style={[signupStyles.input_container]}>
              <TextInput
                style={signupStyles.input}
                placeholder="Confirm your password"
                placeholderTextColor={getOpacityColor(colors.white, 0.8)}
                onChangeText={text =>
                  handleInputChange('confirmPassword', text)
                }
                secureTextEntry={hidePassword}
              />
              <TouchableOpacity
                onPress={handleHideOrShowPassword}
                style={signupStyles.icon_container}>
                <Icon
                  name={hidePassword ? 'eye' : 'eye-off'}
                  size={24}
                  color={colors.red}
                />
              </TouchableOpacity>
            </View>
            {errorMessages.invalidConfirmPassword !== '' && (
              <View style={{paddingHorizontal: 16}}>
                <Text style={[typography.f15_regular, {color: 'red'}]}>
                  {errorMessages.invalidConfirmPassword}
                </Text>
              </View>
            )}
            <View style={signupStyles.input_container}>
              <View style={signupStyles.phone_container}>
                <Text style={[typography.f17_medium, {color: colors.white}]}>
                  +84
                </Text>
              </View>
              <TextInput
                style={signupStyles.input}
                inputMode="numeric"
                placeholder="Enter phone number"
                onChangeText={text => handleInputChange('phoneNumber', text)}
                placeholderTextColor={getOpacityColor(colors.white, 0.8)}
              />
            </View>
            {errorMessages.invalidPhone !== '' && (
              <View style={{paddingHorizontal: 16}}>
                <Text style={[typography.f15_regular, {color: 'red'}]}>
                  {errorMessages.invalidPhone}
                </Text>
              </View>
            )}
            <TouchableOpacity
              onPress={handleConfirmSignUp}
              disabled={checkInput ? false : true}
              style={[
                signupStyles.button_container,
                {
                  backgroundColor: checkInput ? colors.red : '#888d89',
                },
              ]}>
              <Text style={[typography.f17_medium, {color: colors.white}]}>
                Create Account
              </Text>
            </TouchableOpacity>
            <View style={signupStyles.register_container}>
              <Text
                style={[
                  typography.f15_regular,
                  {
                    color: colors.white,
                  },
                ]}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={signInHandler}>
                <Text
                  style={[
                    typography.f16_medium,
                    {
                      color: colors.blue,
                      textDecorationLine: 'underline',
                    },
                  ]}>
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={signupStyles.agreement_container}>
            <Text style={[typography.f13_regular, {color: colors.white}]}>
              By signing in, you agree to the User Agreemen
            </Text>
            <Text style={[typography.f13_regular, {color: colors.white}]}>
              and Privacy Terms.
            </Text>
          </View> */}
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

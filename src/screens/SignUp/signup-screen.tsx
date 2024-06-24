import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../constants/color';
import {typography} from '../../constants/typo';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {LoginStackParamList} from '../../navigation/RootNavigator';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {
  validateEmail,
  validatePassword,
} from '../../validations/user-infor-validation';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {PinwheelIn, PinwheelOut} from 'react-native-reanimated';
type Props = NativeStackScreenProps<LoginStackParamList, 'Signup'>;

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });

  const [userCreated, setUserCreated] = useState(false);

  //State to store error message
  const [errorMessages, setErrorMessage] = useState({
    invalidEmail: '',
    invalidPassword: '',
    invalidConfirmPassword: '',
    invalidPhone: '',
  });

  //Check every input of confirmPassword whether it matchs password
  useEffect(() => {
    if (input.confirmPassword !== input.password && input.password !== '') {
      errorMessages.invalidConfirmPassword = 'Your confirm password not match!';
    } else {
      setErrorMessage({
        ...errorMessages,
        invalidConfirmPassword: '',
      });
    }
  }, [input.confirmPassword]);

  //State to control user want to hide password or not
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const handleHideOrShowPassword = () => {
    setHidePassword(prev => !prev);
  };
  //Navigate to sign in screen
  const signInHandler = () => {
    navigation.goBack();
  };

  //Handle input value base on key and text changed
  const handleInputChange = (key: string, value: string) => {
    setInput({
      ...input,
      [key]: value,
    });
  };

  //Logic for sign up
  const handleConfirmSignUp = () => {
    signUpFirebaseHandler();
  };

  //Sign up function
  const signUpFirebaseHandler = () => {
    setUserCreated(true);
    if (!validateEmail(input.email)) {
      setErrorMessage(prevState => ({
        ...prevState,
        invalidEmail:
          'Email must have at least 6 characters before @ and the suffix follow @gmail.com',
      }));
    }
    if (!validatePassword(input.password)) {
      setErrorMessage(prevState => ({
        ...prevState,
        invalidPassword:
          'Password must have at least 8 characters, 1 number, 1 capital and 1 special character ',
      }));
    }
    if (
      validateEmail(input.email) &&
      validatePassword(input.password) &&
      input.password === input.confirmPassword
    ) {
      auth()
        .createUserWithEmailAndPassword(input.email, input.password)
        .then(() => {})
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log(
              ' The email address is already in use by another account.',
            );
          }
        });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={loginStyles.container}>
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
      {userCreated && (
        <Animated.View entering={PinwheelIn} exiting={PinwheelOut}>
          <View style={loginStyles.alert}></View>
        </Animated.View>
      )}
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
              Start to finding job
            </Text>
          </View>
          <View style={loginStyles.middle}>
            <View style={loginStyles.input_container}>
              <TextInput
                style={loginStyles.input}
                placeholder="Enter email or username"
                onChangeText={text => handleInputChange('email', text)}
                placeholderTextColor={colors.opacityWhite(0.8)}
              />
            </View>
            {errorMessages.invalidEmail !== '' ? (
              <View style={{paddingHorizontal: 16}}>
                <Text style={[typography.f15_regular, {color: 'yellow'}]}>
                  {errorMessages.invalidEmail}
                </Text>
              </View>
            ) : null}
            <View style={[loginStyles.input_container]}>
              <TextInput
                style={loginStyles.input}
                placeholder="Enter password"
                placeholderTextColor={colors.opacityWhite(0.8)}
                onChangeText={text => handleInputChange('password', text)}
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
            {errorMessages.invalidPassword !== '' ? (
              <View style={{paddingHorizontal: 16}}>
                <Text style={[typography.f15_regular, {color: 'yellow'}]}>
                  {errorMessages.invalidPassword}
                </Text>
              </View>
            ) : null}
            <View style={[loginStyles.input_container]}>
              <TextInput
                style={loginStyles.input}
                placeholder="Confirm your password"
                placeholderTextColor={colors.opacityWhite(0.8)}
                onChangeText={text =>
                  handleInputChange('confirmPassword', text)
                }
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
            {errorMessages.invalidConfirmPassword !== '' ? (
              <View style={{paddingHorizontal: 16}}>
                <Text style={[typography.f15_regular, {color: 'yellow'}]}>
                  {errorMessages.invalidConfirmPassword}
                </Text>
              </View>
            ) : null}
            <View style={loginStyles.input_container}>
              <TextInput
                style={loginStyles.input}
                inputMode="numeric"
                placeholder="Enter phone number"
                onChangeText={text => handleInputChange('phone', text)}
                placeholderTextColor={colors.opacityWhite(0.8)}
              />
            </View>
            <TouchableOpacity
              onPress={handleConfirmSignUp}
              style={loginStyles.button_container}>
              <Text style={[typography.f17_medium, {color: colors.white}]}>
                Create Account
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
          {/* <View style={loginStyles.agreement_container}>
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
  );
};

const {width, height} = Dimensions.get('window');

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
    backgroundColor: colors.opacityBlack(0.75),
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
    backgroundColor: colors.opacityWhite(0.3),
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
    backgroundColor: colors.red,
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
});

export default LoginScreen;

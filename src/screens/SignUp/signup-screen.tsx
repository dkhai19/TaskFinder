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
  validatePhone,
} from '../../validations/user-infor-validation';
import Icon from 'react-native-vector-icons/Ionicons';
import SignUpModal from './signup-model';
import {signupStyles} from './signup-styles';
import {handleAddUser} from '../../api/firebase_api';
import {users} from '../../types/users.type';
import LoadingModal from '../../animations/LoadingModal';
type Props = NativeStackScreenProps<LoginStackParamList, 'Signup'>;

const LoginScreen: React.FC<Props> = ({navigation}) => {
  //State store user information

  //State to check input
  const [input, setInput] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });

  //State to control modal
  const [openModal, setOpenModal] = useState<boolean>(false);

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

  const navigateToHome = () => {
    navigation.replace('Main');
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

  //State to control loading
  const [isLoading, setIsLoading] = useState(false);
  //Sign up function
  const signUpFirebaseHandler = () => {
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
    if (!validatePhone(input.phoneNumber)) {
      console.log(input.phoneNumber);
      setErrorMessage(prevState => ({
        ...prevState,
        invalidPhone: 'Phone number must match VietNam phone number',
      }));
    }
    if (
      validateEmail(input.email) &&
      validatePassword(input.password) &&
      input.password === input.confirmPassword &&
      validatePhone(input.phoneNumber)
    ) {
      setIsLoading(true);
      auth()
        .createUserWithEmailAndPassword(input.email, input.password)
        .then(UserCredential => {
          const uid = UserCredential.user.uid;
          handleAddUser({
            user_id: uid,
            email: input.email,
            phone: input.phoneNumber,
            role: 'employee',
          });
          setIsLoading(false);
          setOpenModal(true);
          //navigation.navigate('Main');
        })
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
            <View style={[signupStyles.input_container]}>
              <TextInput
                style={signupStyles.input}
                placeholder="Enter password"
                placeholderTextColor={colors.opacityWhite(0.8)}
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
            {errorMessages.invalidPassword !== '' ? (
              <View style={{paddingHorizontal: 16}}>
                <Text style={[typography.f15_regular, {color: 'yellow'}]}>
                  {errorMessages.invalidPassword}
                </Text>
              </View>
            ) : null}
            <View style={[signupStyles.input_container]}>
              <TextInput
                style={signupStyles.input}
                placeholder="Confirm your password"
                placeholderTextColor={colors.opacityWhite(0.8)}
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
            {errorMessages.invalidConfirmPassword !== '' ? (
              <View style={{paddingHorizontal: 16}}>
                <Text style={[typography.f15_regular, {color: 'yellow'}]}>
                  {errorMessages.invalidConfirmPassword}
                </Text>
              </View>
            ) : null}
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
                placeholderTextColor={colors.opacityWhite(0.8)}
              />
            </View>
            {errorMessages.invalidPhone !== '' ? (
              <View style={{paddingHorizontal: 16}}>
                <Text style={[typography.f15_regular, {color: 'yellow'}]}>
                  {errorMessages.invalidPhone}
                </Text>
              </View>
            ) : null}
            <TouchableOpacity
              onPress={handleConfirmSignUp}
              style={signupStyles.button_container}>
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
  );
};

const {width, height} = Dimensions.get('window');

export default LoginScreen;

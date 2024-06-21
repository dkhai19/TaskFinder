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
import {useState} from 'react';
import {
  validateEmail,
  validatePassword,
} from '../../validations/user-infor-validation';
import Icon from 'react-native-vector-icons/Ionicons';
type Props = NativeStackScreenProps<LoginStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  //Set error string to use to notice user about invalid input
  const [alert, setAlert] = useState('');

  //State to control user want to hide password or not
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const handleHideOrShowPassword = () => {
    setHidePassword(prev => !prev);
  };
  //Handle change input
  const handleChangeUserInput = (key: string, value: string) => {
    setUser({
      ...user,
      [key]: value,
    });
  };
  //Navigate to sign up screen
  const signUpHandler = () => {
    navigation.navigate('Signup');
  };

  //Handle sign in logic
  const signInHandler = () => {
    if (validateEmail(user.email) && validatePassword(user.password)) {
      auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
          console.log('Logged in!');
          navigation.navigate('Main');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      Alert.alert('Your input is invalid, check again!');
    }
  };
  return (
    <View
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
                placeholderTextColor={colors.opacityWhite(0.8)}
                onChangeText={text => handleChangeUserInput('email', text)}
              />
            </View>
            <View style={[loginStyles.input_container, {flexDirection: 'row'}]}>
              <TextInput
                style={loginStyles.input}
                placeholder="Enter password"
                placeholderTextColor={colors.opacityWhite(0.8)}
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
            <TouchableOpacity
              onPress={signInHandler}
              style={loginStyles.button_container}>
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
    flex: 5,
  },
  input_container: {
    width: '100%',
    height: 60,
    borderRadius: 71,
    backgroundColor: colors.opacityWhite(0.3),
    justifyContent: 'center',
    marginTop: 16,
  },
  input: {
    color: colors.white,
    paddingVertical: 18,
    paddingLeft: 28,
    paddingRight: 16,
    width: '85%',
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
  icon_container: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;

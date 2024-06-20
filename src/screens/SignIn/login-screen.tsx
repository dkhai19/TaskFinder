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
} from 'react-native';
import {colors} from '../../constants/color';
import {typography} from '../../constants/typo';

const LoginScreen = () => {
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
              />
            </View>
            <View style={loginStyles.input_container}>
              <TextInput
                style={loginStyles.input}
                placeholder="Enter password"
                placeholderTextColor={colors.opacityWhite(0.8)}
              />
            </View>
            <TouchableOpacity style={loginStyles.button_container}>
              <Text style={[typography.f17_medium, {color: colors.white}]}>
                Sign In
              </Text>
            </TouchableOpacity>
            <View style={loginStyles.register_container}>
              <TouchableOpacity>
                <Text
                  style={[
                    typography.f15_regular,
                    {
                      color: colors.white,
                    },
                  ]}>
                  Dont have account?{' '}
                  <Text
                    style={[
                      typography.f15_regular,
                      {
                        color: colors.blue,
                        textDecorationLine: 'underline',
                      },
                    ]}>
                    Sign up
                  </Text>
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
    width: '100%',
    alignItems: 'flex-end',
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
});

export default LoginScreen;

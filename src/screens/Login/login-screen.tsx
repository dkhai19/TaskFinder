import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../constants/color';

const LoginScreen = () => {
  return (
    <View style={loginStyles.container}>
      <View style={loginStyles.background_layer}></View>
    </View>
  );
};

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background_layer: {
    flex: 1,
    backgroundColor: colors.opacityBlack(0.7),
  },
});

export default LoginScreen;

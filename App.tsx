/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, StyleSheet, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import store from './src/redux/store/store';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
  },
});

export default App;

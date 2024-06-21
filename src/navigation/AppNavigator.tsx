import {createStackNavigator} from '@react-navigation/stack';
import {LoginStackParamList, RootTabParamList} from './RootNavigator';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/SignIn/login-screen';
import SignUpScreen from '../screens/SignUp/signup-screen';
import HomeScreen from '../screens/Home/home-screen';
import ChatScreen from '../screens/Conversation/chat-screen';
import NotificationScreen from '../screens/Notification/notification-screen';
import SettingScreen from '../screens/Setting/setting-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../constants/color';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {StatusBar, useColorScheme} from 'react-native';
import {useCallback} from 'react';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';

const RootStack = createStackNavigator<LoginStackParamList>();
const RootTab = createBottomTabNavigator<RootTabParamList>();
type LoginScreenProps = NativeStackScreenProps<LoginStackParamList, 'Login'>;
type SignUpScreenProps = NativeStackScreenProps<LoginStackParamList, 'Signup'>;
//const RootStack = createStackNavigator<RootStackParamList>();

// const SignInNavigator = () => {
//   return (
//     <RootStack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <RootStack.Screen name="Login" component={LoginScreen} />
//       <RootStack.Screen name="Signup" component={SignUpScreen} />
//       <RootStack.Screen name="Main" component={RootTabNavigator} />
//     </RootStack.Navigator>
//   );
// };

const LoginScreenWrapper: React.FC<LoginScreenProps> = props => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
    }, []),
  );
  return <LoginScreen {...props} />;
};

const SignUpScreenWrapper: React.FC<SignUpScreenProps> = props => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
    }, []),
  );
  return <SignUpScreen {...props} />;
};

const RootTabNavigator = () => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
    }, []),
  );
  return (
    <RootTab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({focused}) => {
          let iconName: string = '';
          if (route.name === 'Homepage') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'chatbubbles-sharp' : 'chatbubbles-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused
              ? 'notifications-sharp'
              : 'notifications-outline';
          } else if (route.name === 'Setting') {
            iconName = focused ? 'settings-sharp' : 'settings-outline';
          }
          return (
            <Icon
              name={iconName}
              size={24}
              color={focused ? colors.red : colors.black}
            />
          );
        },
      })}>
      <RootTab.Screen name="Homepage" component={HomeScreen} />
      <RootTab.Screen name="Messages" component={ChatScreen} />
      <RootTab.Screen name="Notifications" component={NotificationScreen} />
      <RootTab.Screen name="Setting" component={SettingScreen} />
    </RootTab.Navigator>
  );
};

const AppNavigator = () => {
  // const isDarkMode = useColorScheme() === 'light';
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="transparent" translucent />
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Screen name="Login" component={LoginScreenWrapper} />
        <RootStack.Screen name="Signup" component={SignUpScreenWrapper} />
        <RootStack.Screen name="Main" component={RootTabNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

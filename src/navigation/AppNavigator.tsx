import {createStackNavigator} from '@react-navigation/stack';
import {
  ConversationStackParamList,
  LoginStackParamList,
  RootTabParamList,
} from './RootNavigator';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/SignIn/login-screen';
import SignUpScreen from '../screens/SignUp/signup-screen';
import HomeScreen from '../screens/Home/home-screen';
import ConversationScreen from '../screens/Conversation/conversation-screen';
import NotificationScreen from '../screens/Notification/notification-screen';
import SettingScreen from '../screens/Setting/setting-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../constants/color';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {StatusBar, View, useColorScheme} from 'react-native';
import {useCallback} from 'react';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import SpinAnimation from '../animations/SpiningRound';
import ChatScreen from '../screens/Chat/chat-screen';

const RootStack = createStackNavigator<LoginStackParamList>();
const RootTab = createBottomTabNavigator<RootTabParamList>();
const ConversationStack = createStackNavigator<ConversationStackParamList>();
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

const ConversationWrapper = () => {
  return (
    <ConversationStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ConversationStack.Screen
        name="Conversation"
        component={ConversationScreen}
      />
      {/* <ConversationStack.Screen name="Chat" component={ChatScreen} /> */}
    </ConversationStack.Navigator>
  );
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
        tabBarStyle: {
          position: 'absolute',
          height: 60,
          left: 16,
          right: 16,
          bottom: 16,
          borderRadius: 12,
          elevation: 5,
        },
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
          //console.log(`Tab: ${route.name}, Focused: ${focused}`);
          return focused ? (
            <SpinAnimation>
              <Icon name={iconName} size={26} color={colors.red} />
            </SpinAnimation>
          ) : (
            <Icon name={iconName} size={26} color={colors.black} />
          );
        },
      })}>
      <RootTab.Screen name="Homepage" component={HomeScreen} />
      <RootTab.Screen name="Messages" component={ConversationWrapper} />
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
        <RootStack.Screen name="Chat" component={ChatScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

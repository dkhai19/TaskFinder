import {createStackNavigator} from '@react-navigation/stack';
import {
  LoginStackParamList,
  RootStackParamList,
  RootTabParamList,
} from './RootNavigator';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/SignIn/login-screen';
import SignUpScreen from '../screens/SignUp/signup-screen';
import HomeScreen from '../screens/Home/home-screen';
import ChatScreen from '../screens/Conversation/chat-screen';
import NotificationScreen from '../screens/Notification/notification-screen';
import SettingScreen from '../screens/Setting/setting-screen';

const LoginStack = createStackNavigator<LoginStackParamList>();
const RootTab = createBottomTabNavigator<RootTabParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

const SignInNavigator = () => {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen name="Login" component={LoginScreen} />
      <LoginStack.Screen name="Signup" component={SignUpScreen} />
    </LoginStack.Navigator>
  );
};

const RootTabNavigator = () => {
  return (
    <RootTab.Navigator
      screenOptions={({route}) => ({
        // tabBarIcon: ({focused}) => {
        //     let iconName = '';
        //     if(route.name === 'Homepage') {
        //         iconName = focused ? 'home-shapr' : 'home-outline'
        //     } else if(route.name === 'Messages') {
        //         iconName = focused ? 'chatbubbles-sharp' : 'chatbubbles-outline'
        //     } else if(route.name === "Notifications") {
        //         iconName = focused ? 'notifications-sharp' : 'notifications-outline'
        //     } else {
        //         iconName = focused ? 'settings-sharp' : 'settings-outline'
        //     }
        //     return
        // }
      })}>
      <RootTab.Screen name="Homepage" component={HomeScreen} />
      <RootTab.Screen name="Messages" component={ChatScreen} />
      <RootTab.Screen name="Notifications" component={NotificationScreen} />
      <RootTab.Screen name="Setting" component={SettingScreen} />
    </RootTab.Navigator>
  );
};

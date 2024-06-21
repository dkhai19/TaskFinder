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
import {NavigationContainer} from '@react-navigation/native';

const RootStack = createStackNavigator<LoginStackParamList>();
const RootTab = createBottomTabNavigator<RootTabParamList>();
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

const RootTabNavigator = () => {
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
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="Signup" component={SignUpScreen} />
        <RootStack.Screen name="Main" component={RootTabNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

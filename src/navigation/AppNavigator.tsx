import {createStackNavigator} from '@react-navigation/stack'
import {
  ChatStackParamList,
  LoginStackParamList,
  RootStackParamList,
  RootTabParamList,
} from './RootNavigator'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import LoginScreen from '../screens/SignIn/login-screen'
import SignUpScreen from '../screens/SignUp/signup-screen'
import HomeScreen from '../screens/Home/home-screen'
import ConversationScreen from '../screens/Conversation/conversation-screen'
import SettingScreen from '../screens/Setting/setting-screen'
import Icon from 'react-native-vector-icons/Ionicons'
import {colors} from '../constants/color'
import {NavigationContainer, useFocusEffect} from '@react-navigation/native'
import {StatusBar, View, useColorScheme} from 'react-native'
import {useCallback} from 'react'
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types'
import SpinAnimation from '../animations/SpiningRound'
import ChatScreen from '../screens/Chat/chat-screen'
import ManagementScreen from '../screens/Management/manage-screen'
import CallScreen from '../screens/Call/call-screen'
import PersonalScreen from '../screens/Personal/personal-screen'
import ProfileScreen from '../screens/Profile/profile-screen'
import {useSelector} from 'react-redux'
import {RootState} from '../redux/rootReducer'

const RootTab = createBottomTabNavigator<RootTabParamList>()
const RootStack = createStackNavigator<RootStackParamList>()
const LoginStack = createStackNavigator<LoginStackParamList>()
const ChatStack = createStackNavigator<ChatStackParamList>()

type LoginScreenProps = NativeStackScreenProps<LoginStackParamList, 'Login'>
type SignUpScreenProps = NativeStackScreenProps<LoginStackParamList, 'Signup'>

const LoginScreenWrapper: React.FC<LoginScreenProps> = props => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content')
    }, []),
  )
  return <LoginScreen {...props} />
}

const SignUpScreenWrapper: React.FC<SignUpScreenProps> = props => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content')
    }, []),
  )
  return <SignUpScreen {...props} />
}

const ChatStackNavigator = () => {
  return (
    <ChatStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ChatStack.Screen name="Chat" component={ChatScreen} />
      <ChatStack.Screen name="Call" component={CallScreen} />
    </ChatStack.Navigator>
  )
}

const RootTabNavigator = () => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content')
    }, []),
  )
  const isDisplay = useSelector((state: RootState) => state.app.displayBottom)
  return (
    <RootTab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          display: isDisplay ? 'flex' : 'none',
          position: 'absolute',
          zIndex: 1,
          height: 60,
          left: 16,
          right: 16,
          bottom: 16,
          borderRadius: 12,
          elevation: 8,
        },
        tabBarIcon: ({focused}) => {
          let iconName: string = ''
          if (route.name === 'Homepage') {
            iconName = focused ? 'home-sharp' : 'home-outline'
          } else if (route.name === 'Messages') {
            iconName = focused ? 'chatbubbles-sharp' : 'chatbubbles-outline'
          } else if (route.name === 'Management') {
            iconName = focused ? 'documents-sharp' : 'documents-outline'
          } else if (route.name === 'Setting') {
            iconName = focused ? 'settings-sharp' : 'settings-outline'
          }
          //console.log(`Tab: ${route.name}, Focused: ${focused}`);
          return focused ? (
            <SpinAnimation>
              <Icon name={iconName} size={26} color={colors.red} />
            </SpinAnimation>
          ) : (
            <Icon name={iconName} size={26} color={colors.black} />
          )
        },
      })}>
      <RootTab.Screen name="Homepage" component={HomeScreen} />
      <RootTab.Screen name="Messages" component={ConversationScreen} />
      <RootTab.Screen name="Management" component={ManagementScreen} />
      <RootTab.Screen name="Setting" component={SettingScreen} />
    </RootTab.Navigator>
  )
}

const LoginStackNavigator = () => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content')
    }, []),
  )
  return (
    <LoginStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <LoginStack.Screen name="Login" component={LoginScreenWrapper} />
      <LoginStack.Screen name="Signup" component={SignUpScreenWrapper} />
      <LoginStack.Screen name="Main" component={RootTabNavigator} />
    </LoginStack.Navigator>
  )
}

const AppNavigator = () => {
  // const isDarkMode = useColorScheme() === 'light';
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Screen
          name="LoginNavigator"
          component={LoginStackNavigator}
        />
        <RootStack.Screen
          name="RootTabNavigator"
          component={RootTabNavigator}
        />
        <RootStack.Screen name="ChatNavigator" component={ChatStackNavigator} />
        <RootStack.Screen name="Personal" component={PersonalScreen} />
        <RootStack.Screen name="Profile" component={ProfileScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator

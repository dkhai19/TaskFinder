import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types'
import {ICall} from '../types/calls.type'
import {RouteProp} from '@react-navigation/native'

export type LoginStackParamList = {
  Login: undefined
  Signup: undefined
  Main: undefined
}

export type RootTabParamList = {
  Homepage: undefined
  Messages: undefined
  Management: undefined
  Setting: undefined
}

export type ChatStackParamList = {
  Chat: {uid: string}
  Call: ICall
}

export type RootStackParamList = {
  LoginNavigator: undefined
  RootTabNavigator: undefined
  ChatNavigator: {
    screen: keyof ChatStackParamList
    params: ChatStackParamList[keyof ChatStackParamList]
  }
  Personal: undefined
  Profile: {uid: string}
}
// export type RootStackParamList = {
//   SigninScreen: undefined;
//   MainScreen: undefined;
// };

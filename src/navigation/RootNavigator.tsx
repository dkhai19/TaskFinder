export type LoginStackParamList = {
  Login: undefined
  Signup: undefined
  Main: undefined
  Chat: {uid: string}
}

export type RootTabParamList = {
  Homepage: undefined
  Messages: undefined
  Management: undefined
  Setting: undefined
}

export type ConversationStackParamList = {
  Conversation: undefined
  Chat: {uid: string}
}

// export type RootStackParamList = {
//   SigninScreen: undefined;
//   MainScreen: undefined;
// };

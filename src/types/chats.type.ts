import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export type Chat = {
  chatUID: string;
  members: string[];
  lastMessage: string;
  lastMessageTimestamp: Date;
};

export type Message = {
  text: string;
  createdAt: Date;
  user: Sender;
};

export type UserChats = {
  [chatUID: string]: {
    lastMessage: string;
    lastMessageTimestamp: Date;
  };
};

export type Sender = {
  _id: string;
  avatar: string;
  name: string;
};

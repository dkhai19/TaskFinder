import firestore, {
  FieldValue,
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {Message, Sender, UserChats} from '../types/chats.type';

//Find chatUID between 2 users
export const findCommonChats = async (userUID1: string, userUID2: string) => {
  try {
    const user1ChatsSnapshot = await firestore()
      .collection('users')
      .doc(userUID1)
      .collection('userChats')
      .get();
    if (user1ChatsSnapshot.empty) {
      return null;
    }
    const user2ChatsSnapshot = await firestore()
      .collection('users')
      .doc(userUID2)
      .collection('userChats')
      .get();
    if (user2ChatsSnapshot.empty) {
      return null;
    }

    const user2ChatIDs = new Set(user2ChatsSnapshot.docs.map(doc => doc.id));
    const commonChat = user1ChatsSnapshot.docs.find(doc =>
      user2ChatIDs.has(doc.id),
    );
    //console.log('commonChat', commonChat?.id);
    if (commonChat) {
      return commonChat.id;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error finding chat common:', error);
    return null;
  }
};

// Function to handle send message logic
export const sendMessage = async (
  receiver_id: string,
  text: string,
  sender: Sender,
) => {
  const timestamp = new Date();
  const message: Message = {
    text: text,
    createdAt: timestamp,
    user: sender,
  };
  const commonChatUID = await findCommonChats(receiver_id, sender._id);
  if (commonChatUID !== null) {
    console.log('Have common chat');
    await firestore().collection('chats').doc(commonChatUID).update({
      lastMessage: text,
      lastMessageTimestamp: timestamp,
    });
    const messageRef = await firestore()
      .collection('chats')
      .doc(commonChatUID)
      .collection('messages')
      .add(message);

    const messageUID = messageRef.id;
    await messageRef.update({
      _id: messageUID,
    });

    const chatDoc = await firestore()
      .collection('chats')
      .doc(commonChatUID)
      .get();
    //console.log(chatDoc);

    const chatData = chatDoc.data();
    const memebers = chatData?.members || [];

    await Promise.all(
      memebers.map(async (userUID: string) => {
        await firestore()
          .collection('users')
          .doc(userUID)
          .collection('userChats')
          .doc(commonChatUID)
          .update({
            lastMessage: chatData?.lastMessage,
            lastMessageTimestamp: chatData?.lastMessageTimestamp,
          });
      }),
    );
  } else {
    console.log('Dont have common chat');
    const userUIDs = [receiver_id, sender._id];
    const conversationDoc = firestore().collection('chats').add({
      members: userUIDs,
      lastMessage: text,
      lastMessageTimestamp: timestamp,
    });
    const chatUID = (await conversationDoc).id;
    //Add message to chats collection
    await firestore()
      .collection('chats')
      .doc(chatUID)
      .collection('messages')
      .add(message);
    await Promise.all(
      userUIDs.map(async userUID => {
        await firestore()
          .collection('users')
          .doc(userUID)
          .collection('userChats')
          .doc(chatUID)
          .set({
            lastMessage: text,
            lastMessageTimestamp: new Date(),
          });
      }),
    );
  }
};

//Function used to fetch all conversations of an user
export const fetchConversations = async (
  userUID: string,
  callback: (chats: UserChats) => void,
) => {
  return firestore()
    .collection('users')
    .doc(userUID)
    .collection('userChats')
    .orderBy('lastMessageTimestamp', 'desc')
    .onSnapshot(snapshot => {
      const chats: UserChats = {};
      snapshot.docs.forEach(doc => {
        chats[doc.id] = doc.data() as {
          lastMessage: string;
          lastMessageTimestamp: Date;
        };
      });
      callback(chats);
    });
};

//Function used to fetch all messages of a chat
export const fetchMessages = async (chatUID: string) => {
  try {
    const snapshot = await firestore()
      .collection('chats')
      .doc(chatUID)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .get();
    console.log('Fetch messages', snapshot);
    const messages: Message[] = snapshot.docs.map(doc => ({
      ...doc.data(),
    })) as Message[];

    return messages;
  } catch (error) {
    console.error('Error fetching messages: ', error);
    return [];
  }
};

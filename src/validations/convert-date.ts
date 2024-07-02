import {
  FirebaseFirestoreTypes,
  firebase,
} from '@react-native-firebase/firestore';

export const convertFirestoreTimestampToDate = (
  timestampObject: FirebaseFirestoreTypes.Timestamp,
): Date => {
  const firestoreTimestamp = new firebase.firestore.Timestamp(
    timestampObject.seconds,
    timestampObject.nanoseconds,
  );
  return firestoreTimestamp.toDate();
};

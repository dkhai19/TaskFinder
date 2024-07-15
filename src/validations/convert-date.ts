import {
  FirebaseFirestoreTypes,
  firebase,
} from '@react-native-firebase/firestore'

export const convertFirestoreTimestampToDate = (
  timestampObject: FirebaseFirestoreTypes.Timestamp,
): Date => {
  const firestoreTimestamp = new firebase.firestore.Timestamp(
    timestampObject.seconds,
    timestampObject.nanoseconds,
  )
  return firestoreTimestamp.toDate()
}

export const formatDate = (isoString: string | undefined) => {
  if (isoString) {
    const date = new Date(isoString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // getMonth() returns 0-11
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
  } else {
    return ''
  }
}

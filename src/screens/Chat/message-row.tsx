import {Image, StyleSheet, Text, View} from 'react-native'
import {typography} from '../../constants/typo'
import {colors} from '../../constants/color'
import {useEffect, useState} from 'react'
import {IUsers} from '../../types/users.type'
import {findUserById} from '../../firebase/users.api'
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'
import LoadingModal from '../../animations/LoadingModal'

interface IMessageRow {
  isMine: boolean
  content: string
  receiverId: string
}

const MessageRow: React.FC<IMessageRow> = ({isMine, content, receiverId}) => {
  const listOthers = useSelector((state: RootState) => state.user.otherUsers)
  const receiver = listOthers?.find(item => item.id === receiverId)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!receiver) {
      setIsLoading(false)
    }
  }, [receiver])

  if (!receiver && !isMine) {
    return (
      <View>
        <Text>Relax</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {isMine ? (
        <View style={styles.right}>
          <View style={styles.rightMessage}>
            <Text style={[typography.f16_regular, {color: colors.black}]}>
              {content}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.left}>
          <View style={styles.leftImage}>
            <Image
              source={
                receiver
                  ? {uri: receiver?.avatar}
                  : require('../../assets/photos/image1.jpg')
              }
              onLoadStart={() => setIsLoading(true)}
              onLoadEnd={() => setIsLoading(false)}
              style={styles.image}
              alt=""
            />
          </View>
          <View style={styles.leftMessage}>
            <Text style={[typography.f16_regular, {color: colors.black}]}>
              {content}
            </Text>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 8,
  },
  left: {
    flexDirection: 'row',
    width: '70%',
  },
  leftImage: {
    paddingRight: 8,
  },
  leftMessage: {
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    width: '100%',
    alignItems: 'flex-end',
  },
  rightMessage: {
    maxWidth: '70%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    backgroundColor: '#67C4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 38,
    height: 38,
    borderRadius: 20,
  },
})

export default MessageRow

import {Image, StyleSheet, Text, View} from 'react-native'
import {typography} from '../../constants/typo'
import {colors} from '../../constants/color'
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'

interface IConversationItem {
  receiver_id: string
  imageUrl?: string
  name: string
  context: string
  lastDate: string
}

const ConversationItem: React.FC<IConversationItem> = ({
  receiver_id,
  name,
  context,
  lastDate,
  imageUrl,
}) => {
  const current = useSelector((state: RootState) => state.user.currentUser.id)

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Image style={styles.image} source={{uri: imageUrl}} alt="Alt" />
      </View>
      <View style={styles.mid}>
        <Text style={[typography.f16_medium, {color: colors.black}]}>
          {name}
        </Text>
        <Text
          style={[
            typography.f13_regular,
            {
              color: colors.black,
            },
          ]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {`${context}`}
        </Text>
      </View>
      <View style={styles.tail}>
        <Text
          style={[typography.f11_regular, {color: colors.opacityBlack(0.55)}]}>
          {lastDate}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 70,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  mid: {
    flex: 2,
    marginVertical: 4,
    justifyContent: 'space-between',
  },
  tail: {
    flex: 1,
    alignItems: 'flex-end',
  },
})

export default ConversationItem

import React, {useEffect, useState} from 'react'
import {IUserProfiles} from '../../types/users.type'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {UnsubcribeFunc} from '../../types/unsubcribe.type'
import {getTaskByOwnerId} from '../../firebase/tasks.api'
import {ITask} from '../../types/tasks.type'
import {typography} from '../../constants/typo'
import Icon from 'react-native-vector-icons/Ionicons'
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'
interface ISearchItem {
  user: IUserProfiles
  onPress: (uid: string) => void
}

const SearchItem: React.FC<ISearchItem> = ({user, onPress}) => {
  const [ownerTasks, setOwnerTasks] = useState<ITask[]>()
  const colors = useSelector((state: RootState) => state.authentication.colors)
  useEffect(() => {
    if (user) {
      let unsubscribe: UnsubcribeFunc | undefined
      const getOwnerTasks = async () => {
        unsubscribe = await getTaskByOwnerId(user.id, data =>
          setOwnerTasks(data),
        )
      }
      getOwnerTasks()
      return () => {
        if (unsubscribe) {
          unsubscribe()
        }
      }
    }
  }, [])

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 80,
      padding: 12,
      marginTop: 16,
      borderBottomWidth: 0.25,
      borderColor: colors.black,
    },
    content: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    imgContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 30,
    },
    profileButton: {
      width: 90,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 8,
      backgroundColor: colors.red,
      borderRadius: 8,
    },
  })

  if (!ownerTasks) {
    return (
      <View>
        <Text>Loading information ...</Text>
      </View>
    )
  }
  const processingTask = ownerTasks?.filter(item => item.status === 'process')
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.imgContainer}>
            <Image
              source={{
                uri: user.avatar,
              }}
              alt="Alt"
              style={styles.image}
            />
          </View>
          <View
            style={{
              justifyContent: 'space-around',
              marginLeft: 16,
            }}>
            <View>
              <Text style={[typography.f13_regular, {color: colors.black}]}>
                {user.first_name} {user.last_name}
              </Text>
            </View>
            <View>
              <Text style={[typography.f15_medium, {color: colors.black}]}>
                {processingTask.length} tasks available
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.profileButton}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onPress(user.id)}>
            <Icon name="people-circle-outline" size={24} color={colors.white} />
            <Text style={[typography.f13_regular, {color: colors.white}]}>
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default SearchItem

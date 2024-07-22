import {Dimensions, Image, StyleSheet, Text, View} from 'react-native'
import {IPostApplication} from '../../types/applications.type'
import {colors} from '../../constants/color'
import {ITask} from '../../types/tasks.type'
import {useEffect, useState} from 'react'
import {getTaskById} from '../../firebase/tasks.api'
import {typography} from '../../constants/typo'
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'
import IconItem from './icon-item'
import {
  convertFirestoreTimestampToDate,
  formatDate,
} from '../../validations/convert-date'
import ButtonItem from './button-item'
import {useNavigation} from '@react-navigation/native'
import {RootStackParamList} from '../../navigation/RootNavigator'
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types'
import Status from './status'
import {IApplication} from '../../redux/slices/applicationSlice'
import LoadingModal from '../../animations/LoadingModal'

interface IApplicationItem {
  item: IApplication
}

const ApplicationItem: React.FC<IApplicationItem> = ({item}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [taskDetail, setTaskDetail] = useState<ITask | null>()
  const others = useSelector((state: RootState) => state.user.otherUsers)
  const [ownerId, setOwnerId] = useState<string | null>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  //console.log(item)
  useEffect(() => {
    const loadTask = async () => {
      setIsLoading(() => true)
      const data = await getTaskById(item.task_id)
      //console.log('data', data)
      setTaskDetail(() => data)
      setOwnerId(data?.userId)
      setIsLoading(() => false)
      //console.log(taskDetail)
    }
    loadTask()
  }, [item])
  const ownerInfor = others?.find(item => item.id === ownerId)

  const navigateToChat = () => {
    if (ownerId) {
      navigation.navigate('ChatNavigator', {
        screen: 'Chat',
        params: {uid: ownerId},
      })
    }
  }

  const navigateToProfile = () => {
    if (ownerId) {
      navigation.navigate('Profile', {uid: ownerId})
    }
  }

  //console.log('Task detail ne', taskDetail)
  if (!taskDetail || !ownerInfor || isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={[typography.f16_semibold, {color: colors.black}]}>
          Loading my applications...
        </Text>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Status status={item.status} />
        <View style={{flexDirection: 'row'}}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: ownerInfor?.avatar}}
              alt="Pic"
              style={styles.image}
            />
          </View>
          <View style={styles.headingContainer}>
            <Text style={[typography.f17_medium, {color: colors.black}]}>
              {taskDetail?.taskName}
            </Text>
            <Text
              style={[
                typography.f15_regular,
                {color: colors.opacityBlack(0.7)},
              ]}>
              {ownerInfor?.first_name + ' ' + ownerInfor?.last_name}
            </Text>
          </View>
        </View>
        <View style={styles.iconItems}>
          <IconItem
            iconName="wallet-outline"
            label={taskDetail?.price.toString() || ''}
          />
          <IconItem iconName="time-outline" label={item.application_date} />
        </View>
        <View style={styles.buttons}>
          <ButtonItem
            iconName="chatbubble-ellipses-outline"
            title="Contact"
            onPress={navigateToChat}
          />
          <ButtonItem title="Employer Profile" onPress={navigateToProfile} />
        </View>
      </View>
    )
  }
}
const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 20,
  },
  imageContainer: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    borderRadius: 8,
    marginLeft: 24,
    marginRight: 12,
  },
  image: {
    width: 66,
    height: 66,
    borderRadius: 8,
  },
  headingContainer: {
    justifyContent: 'space-evenly',
    maxWidth: width * 0.6,
  },
  iconItems: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: 8,
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  buttons: {
    flexDirection: 'row',
    marginHorizontal: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
})

export default ApplicationItem

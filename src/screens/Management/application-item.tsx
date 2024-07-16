import {Dimensions, Image, StyleSheet, Text, View} from 'react-native'
import {IGetApplication} from '../../types/applications.type'
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

interface IApplicationItem {
  item: IGetApplication
}

const ApplicationItem: React.FC<IApplicationItem> = ({item}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [taskDetail, setTaskDetail] = useState<ITask | null>()
  const others = useSelector((state: RootState) => state.user.otherUsers)
  const [ownerId, setOwnerId] = useState<string | null>()

  const convertDate = formatDate(
    convertFirestoreTimestampToDate(item.application_date).toDateString(),
  )

  //console.log(item)
  useEffect(() => {
    const loadTask = async () => {
      const data = await getTaskById(item.task_id)
      //console.log('data', data)
      setTaskDetail(() => data)
      setOwnerId(data?.userId)
      //console.log(taskDetail)
    }
    loadTask()
  }, [])
  const ownerInfor = others?.find(item => item.id === ownerId)

  const navigateToChat = () => {
    if (ownerId) {
      navigation.navigate('ChatNavigator', {
        screen: 'Chat',
        params: {uid: ownerId},
      })
    }
  }

  return (
    <View style={styles.container}>
      <Status status={item.status} />
      <View style={{flexDirection: 'row'}}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/photos/image10.jpg')}
            style={styles.image}
          />
        </View>
        <View style={styles.headingContainer}>
          <Text style={[typography.f17_medium, {color: colors.black}]}>
            {taskDetail?.taskName}
          </Text>
          <Text
            style={[typography.f15_regular, {color: colors.opacityBlack(0.7)}]}>
            {ownerInfor?.first_name + ' ' + ownerInfor?.last_name}
          </Text>
        </View>
      </View>
      <View style={styles.iconItems}>
        <IconItem iconName="cash-outline" label="1.000.000 VNĐ" />
        <IconItem iconName="time-outline" label={convertDate} />
      </View>
      <View style={styles.buttons}>
        <ButtonItem
          iconName="chatbubble-ellipses-outline"
          title="Contact"
          onPress={navigateToChat}
        />
        <ButtonItem title="Employer Profile" onPress={navigateToChat} />
      </View>
    </View>
  )
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
    alignItems: 'center',
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

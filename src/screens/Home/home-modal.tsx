import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import DragView from '../../animations/Modal'
import {colors} from '../../constants/color'
import {ITask} from '../../types/tasks.type'
import {useEffect, useState} from 'react'
import {IUsers} from '../../types/users.type'
import {findUserById} from '../../firebase/authentications_api'
import {typography} from '../../constants/typo'
import ContainedButton from '../../components/ContainedButton'
import RowItem from './row-item'
import {IApplication} from '../../types/applications.type'
import {checkIsApplied, postApplication} from '../../firebase/applications.api'
import {RootState} from '../../redux/rootReducer'

interface IHomeModal {
  item: ITask
}

const HomeModal: React.FC<IHomeModal> = ({item}) => {
  //console.log('The task modal', item)
  const [user, setUser] = useState<IUsers>()
  const [isApplied, setIsApplied] = useState<boolean>()

  useEffect(() => {
    const fetchData = async () => {
      const findUser = await findUserById(item.userId)
      setUser(findUser)
      const isUserApplied = await checkIsApplied(item.taskId, item.userId)
      console.log('Have I applied to this task', isUserApplied)
      setIsApplied(isUserApplied)
    }
    fetchData()
  }, [])

  const handleFollow = () => {}

  const navigateToProfile = (userId: string) => {
    console.log('Go to user profile with this user_id: ', userId)
  }

  const handleApply = async (application: IApplication) => {
    //console.log(application)
    if (isApplied) {
      console.log('Handle go to application screen')
    } else {
      setIsApplied(true)
      try {
        await postApplication(application)
      } catch (error) {
        console.error('Error handling apply press', error)
      }
    }
  }

  return (
    <DragView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.heading}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => navigateToProfile(item.userId)}>
              <Image
                style={styles.image}
                source={require('../../assets/photos/image5.jpg')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToProfile(item.userId)}>
              <Text style={[typography.f14_medium, {color: colors.black}]}>
                {user?.first_name + ' ' + user?.last_name}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleFollow}
            style={styles.buttonContainer}>
            <Text style={[typography.f12_regular, {color: colors.white}]}>
              Follow
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 12}}>
          <RowItem
            iconName="pricetags-outline"
            iconColor={colors.red}
            title={item.taskName}
          />
          <RowItem
            iconName="time-outline"
            iconColor={colors.red}
            title={`${item.startDate.toDateString()} - ${item.endDate.toDateString()}`}
          />
        </View>
        <View style={styles.description}>
          <TextInput value={item.taskDescription} editable={false} multiline />
        </View>
        <View style={{marginTop: 24}}>
          <ContainedButton
            title={isApplied ? 'Check your application' : 'Apply'}
            onPress={() =>
              handleApply({
                task_id: item.taskId,
                user_id: item.userId,
                application_date: new Date(),
                status: 'applying',
              })
            }
          />
        </View>
      </View>
    </DragView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  heading: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  description: {
    marginTop: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    minHeight: 100,
    backgroundColor: colors.opacityBlack(0.15),
  },
})

export default HomeModal

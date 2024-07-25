import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import DragView from '../../animations/Modal'
import {ITask} from '../../types/tasks.type'
import {useEffect, useRef, useState} from 'react'
import {IUsers} from '../../types/users.type'
import {findUserById} from '../../firebase/users.api'
import {typography} from '../../constants/typo'
import ContainedButton from '../../components/ContainedButton'
import RowItem from './row-item'
import {IPostApplication} from '../../types/applications.type'
import {checkIsApplied, postApplication} from '../../firebase/applications.api'
import {RootState} from '../../redux/rootReducer'
import {useSelector} from 'react-redux'
import {formatDate} from '../../validations/convert-date'
import {RootTabParamList} from '../../navigation/RootNavigator'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types'
import {getOpacityColor} from '../../constants/color'

interface IHomeModal {
  item: ITask
  display: boolean
}

const {width, height} = Dimensions.get('window')

const HomeModal: React.FC<IHomeModal> = ({item, display}) => {
  //console.log('The task modal', item)
  const navigation =
    useNavigation<NativeStackNavigationProp<RootTabParamList>>()
  const [owner, setOwner] = useState<IUsers>()
  const [isApplied, setIsApplied] = useState<boolean>(false)
  const currentUser = useSelector((state: RootState) => state.user.currentUser)
  const colors = useSelector((state: RootState) => state.authentication.colors)

  const animValue = useRef(new Animated.Value(height)).current

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: height * 0.5,
      duration: 2000,
      useNativeDriver: true,
    }).start()
    return () => {
      Animated.timing(animValue, {
        toValue: height,
        duration: 2000,
        useNativeDriver: true,
      }).start()
    }
  }, [display])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [findOwner, isUserApplied] = await Promise.all([
          findUserById(item.userId),
          checkIsApplied(item.taskId, currentUser.id),
        ])
        setOwner(findOwner)
        setIsApplied(isUserApplied)

        //console.log('Have I applied to this task', isUserApplied);
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }
    fetchData()
  }, [item])

  const handleFollow = () => {}

  const navigateToProfile = (userId: string) => {
    console.log('Go to user profile with this user_id: ', userId)
  }

  const handleApply = async (application: IPostApplication) => {
    //console.log(application)
    if (isApplied) {
      console.log('Handle go to application screen')
      navigation.navigate('Management')
    } else {
      setIsApplied(true)
      try {
        await postApplication(application)
      } catch (error) {
        console.error('Error handling apply press', error)
      }
    }
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
      backgroundColor: getOpacityColor(colors.black, 0.15),
    },
  })

  if (!owner) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={[typography.f16_semibold, {color: colors.black}]}>
          Loading owner information.
        </Text>
      </View>
    )
  }

  return (
    <DragView
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: animValue,
            },
          ],
        },
      ]}>
      <View style={styles.content}>
        <View style={styles.heading}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => navigateToProfile(item.userId)}>
              <Image
                style={styles.image}
                source={{uri: owner?.avatar}}
                alt="Alt"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToProfile(item.userId)}>
              <Text style={[typography.f16_semibold, {color: colors.black}]}>
                {owner?.first_name + ' ' + owner?.last_name}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleFollow}
            style={styles.buttonContainer}>
            <Text style={[typography.f15_regular, {color: colors.white}]}>
              Follow
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 12}}>
          <RowItem
            iconName="tag"
            iconColor={colors.red}
            title={item.taskName}
          />
          <RowItem
            iconName="clock"
            iconColor={colors.red}
            title={`${formatDate(item.start_date)} - ${formatDate(
              item.end_date,
            )}`}
          />
          <RowItem
            iconName="dollar-sign"
            iconColor={colors.red}
            title={item.price.toString()}
          />
        </View>
        <View style={styles.description}>
          <TextInput
            style={{color: colors.black}}
            value={item.taskDescription}
            editable={false}
            multiline
          />
        </View>
        <View style={{marginTop: 24}}>
          <ContainedButton
            title={isApplied ? 'Check your application' : 'Apply'}
            onPress={() =>
              handleApply({
                task_id: item.taskId,
                user_id: currentUser.id,
                application_date: new Date(),
                status: 'applying',
                rating: currentUser.rating,
              })
            }
          />
        </View>
      </View>
    </DragView>
  )
}

export default HomeModal

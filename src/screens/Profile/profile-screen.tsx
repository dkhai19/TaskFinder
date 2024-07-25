import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types'
import {RootStackParamList} from '../../navigation/RootNavigator'
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'
import {useEffect, useState} from 'react'
import {UnsubcribeFunc} from '../../types/unsubcribe.type'
import {getTaskByOwnerId} from '../../firebase/tasks.api'
import {ITask} from '../../types/tasks.type'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
import {typography} from '../../constants/typo'
import HeaderCustom from '../../components/Header'
import ProfileItem from './profile-item'
import CardItem from './card-item'
import {getOpacityColor} from '../../constants/color'

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>
const {width, height} = Dimensions.get('window')
const ProfileScreen: React.FC<Props> = ({navigation, route}) => {
  const others = useSelector((state: RootState) => state.user.otherUsers)
  const target = others?.find(item => item.id === route.params.uid)
  const [ownerTasks, setOwnerTasks] = useState<ITask[]>()
  const myAppied = useSelector((state: RootState) => state.application.applied)
  const colors = useSelector((state: RootState) => state.authentication.colors)
  const lightTheme = useSelector(
    (state: RootState) => state.authentication.lightThem,
  )
  useEffect(() => {
    if (target) {
      let unsubscribe: UnsubcribeFunc | undefined
      const getOwnerTasks = async () => {
        unsubscribe = await getTaskByOwnerId(target?.id, data =>
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
  }, [route])

  const handleGoBack = () => {
    navigation.pop()
  }

  //console.log('target ne', target)
  if (!target) {
    return (
      <View>
        <Text>Can't find this user profile!</Text>
      </View>
    )
  }

  const gotoChat = () => {
    navigation.navigate('ChatNavigator', {
      screen: 'Chat',
      params: {uid: target?.id},
    })
  }

  const processingTask = ownerTasks?.filter(item => item.status === 'process')
  const finishedTask = ownerTasks?.filter(item => item.status === 'finished')
  const sumPrice = ownerTasks?.reduce(
    (accumulator, item) => accumulator + item.price,
    0,
  )
  let average
  if (ownerTasks && sumPrice) {
    average = sumPrice / ownerTasks.length
  }

  const profileStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    headerContainer: {
      position: 'absolute',
      zIndex: 20,
    },
    coverContainer: {
      width: width,
      height: height * 0.25,
      backgroundColor: colors.blue,
    },
    avatarContainer: {
      position: 'absolute',
      zIndex: 20,
      left: 16,
      top: height * 0.19,
      width: 130,
      height: 130,
      borderRadius: 80,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarInner: {
      width: 122,
      height: 122,
      borderRadius: 60,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    avatar: {
      width: 115,
      height: 115,
      borderRadius: 60,
    },
    contactContainer: {
      position: 'absolute',
      zIndex: 20,
      right: 16,
      top: height * 0.22,
    },
    contactButton: {
      width: 150,
      height: 60,
      borderRadius: 30,
      backgroundColor: lightTheme ? '#e0e0e6' : '#404040',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: colors.white,
    },
    nameContainer: {
      flexDirection: 'row',
      marginTop: height * 0.09,
      paddingLeft: 24,
    },
    tickContainer: {
      paddingTop: 6,
      paddingLeft: 8,
    },
    tickBackground: {
      width: 22,
      height: 22,
      borderRadius: 20,
      backgroundColor: getOpacityColor(colors.white, 0.9),
      justifyContent: 'center',
      alignItems: 'center',
    },
    introContainer: {
      marginTop: 8,
      paddingHorizontal: 24,
    },
    taskContainer: {
      marginTop: 24,
      paddingHorizontal: 24,
      marginBottom: 24,
    },
    itemsContainer: {
      marginTop: 36,
      marginHorizontal: 24,
      alignItems: 'center',
      flexDirection: 'row',
    },
  })

  return (
    <ScrollView
      style={profileStyle.container}
      showsVerticalScrollIndicator={false}>
      <View style={profileStyle.headerContainer}>
        <HeaderCustom onPress={handleGoBack} />
      </View>
      {/* Avatar container */}
      <LinearGradient
        colors={['#f2ffaf', '#f47014']}
        style={profileStyle.avatarContainer}>
        <View style={profileStyle.avatarInner}>
          <Image
            source={{uri: target.avatar}}
            style={profileStyle.avatar}
            alt="Alt"
          />
        </View>
      </LinearGradient>
      {/* Contact button container */}
      <View style={profileStyle.contactContainer}>
        <TouchableOpacity onPress={gotoChat} style={profileStyle.contactButton}>
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingRight: 6}}>
              <Icon name="chatbubble-outline" size={28} color={colors.black} />
            </View>
            <Text style={[typography.f17_medium, {color: colors.black}]}>
              Contact
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{marginTop: 12, alignItems: 'flex-end', marginRight: 8}}>
          <Text style={[typography.f15_medium, {color: colors.black}]}>
            {ownerTasks?.length} <Text style={{color: '#b3b3b8'}}>•</Text> tasks
          </Text>
        </View>
      </View>
      <View style={profileStyle.coverContainer}>
        <Image
          source={{uri: target.cover}}
          style={{flex: 1}}
          resizeMode="cover"
          alt="Alt"
        />
      </View>
      <View style={profileStyle.nameContainer}>
        <Text style={[typography.f20_bold, {color: colors.black}]}>
          {target.first_name + ' ' + target.last_name}
        </Text>
        <View style={profileStyle.tickContainer}>
          <View style={profileStyle.tickBackground}>
            <Icon name="checkmark-sharp" size={16} color={colors.white} />
          </View>
        </View>
      </View>
      <View style={profileStyle.introContainer}>
        <Text
          style={[typography.f14_regular, {color: colors.black}]}
          numberOfLines={4}
          ellipsizeMode="tail">
          {target.introduction}
        </Text>
      </View>
      <View style={profileStyle.itemsContainer}>
        <ProfileItem
          iconName="task"
          mainContent={finishedTask?.length.toString() + ' tasks' || ''}
          subContent="Done"
        />
        <ProfileItem
          iconName="attach-money"
          mainContent={average?.toString() + ' per task' || '0 per task'}
          subContent="Average"
        />
      </View>
      <View style={profileStyle.taskContainer}>
        <Text style={[typography.f20_medium, {color: colors.black}]}>
          Tasks available
        </Text>
        {processingTask &&
          processingTask.map(task => (
            <CardItem
              key={task.taskId}
              onPress={() => console.log('dummy press')}
              title={task.taskName}
              descript={task.taskDescription}
              fromDate={task.start_date}
              toDate={task.end_date}
              price={task.price}
              status={
                myAppied.find(item => item.task_id === task.taskId)?.status ||
                'Open'
              }
            />
          ))}
      </View>
    </ScrollView>
  )
}

export default ProfileScreen

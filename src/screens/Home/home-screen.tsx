import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native'
import Mapbox from '@rnmapbox/maps'
import {colors} from '../../constants/color'
import {useEffect, useState} from 'react'
import IconButton from '../../components/IconButton'

import {getAllTasks} from '../../firebase/tasks.api'
import {ITask} from '../../types/tasks.type'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'
import HomeModal from './home-modal'
import {setTasks, toggleModal} from '../../redux/slices/taskSlice'
import {AppDispatch} from '../../redux/store/store'
import {UnsubcribeFunc} from '../../types/unsubcribe.type'
import {fetchOthers} from '../../redux/thunks/userThunks'
import client, {signJWT} from '../../apis/stream'
import {setStreamToken} from '../../redux/slices/authSlice'
import {getAllMyApplications} from '../../firebase/applications.api'
import {
  IApplication,
  setApplications,
} from '../../redux/slices/applicationSlice'
import {IPostApplication} from '../../types/applications.type'
import {formatDate} from '../../validations/convert-date'
import SearchScreen from './search-screen'
import {toggleBottomTab} from '../../redux/slices/appSlice'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types'
import {RootStackParamList} from '../../navigation/RootNavigator'
import messaging from '@react-native-firebase/messaging'
import {
  CallContent,
  StreamCall,
  StreamVideo,
} from '@stream-io/video-react-native-sdk'
import {getLocation, requestLocationPermission} from '../../apis/location'
import {
  setCurrentLocation,
  setLocationPermisstion,
} from '../../redux/slices/permissionSlice'

Mapbox.setAccessToken(
  'pk.eyJ1IjoiZHVja2hhaTIwMDJ2biIsImEiOiJjbHh2ODBvZXQwamtkMmpwdTFsa3JoeDVrIn0.vrtl6qLPN_NGnRKA2EvLvg',
)

const {width, height} = Dimensions.get('window')

const HomeScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [movingCamera, setMovingCamera] = useState(false)
  const currentUser = useSelector((state: RootState) => state.user.currentUser)
  //const [tasks, setTasks] = useState<TaskData>([])
  const modalVisible = useSelector((state: RootState) => state.task.taskModal)
  const tasks = useSelector((state: RootState) => state.task.tasksData)
  const [taskModal, setTaskModal] = useState<ITask>()
  const location = useSelector((state: RootState) => state.permission)

  const streamToken = useSelector(
    (state: RootState) => state.authentication.token,
  )
  //console.log('Where are tasks', tasks)
  const dispatch = useDispatch<AppDispatch>()

  const handleNotification = (uid: string) => {
    navigation.navigate('ChatNavigator', {
      screen: 'Chat',
      params: {
        uid: uid,
      },
    })
  }

  const handleJoinCall = async (callId: string) => {
    //console.log('call ne', callId)
    await client.connectUser(
      {
        id: currentUser.id,
        name: `${currentUser.first_name} ${currentUser.last_name}`,
      },
      streamToken,
    )
    const _call = client.call('default', callId)
    await _call.join()
    return (
      <StreamVideo client={client}>
        <StreamCall call={_call}>
          <SafeAreaView style={{flex: 1}}>
            <CallContent layout="grid" />
          </SafeAreaView>
        </StreamCall>
      </StreamVideo>
    )
  }

  useEffect(() => {
    let unsubscribe: UnsubcribeFunc | undefined
    const setupTasks = async () => {
      try {
        // dispatch(loadTasks()).unwrap()
        unsubscribe = await getAllTasks(tasks => {
          dispatch(setTasks(tasks))
        })
      } catch (error) {
        console.error('Failed to load tasks:', error)
      }
    }

    let unsubcribeApps: UnsubcribeFunc | undefined
    const setupApps = async () => {
      try {
        unsubcribeApps = await getAllMyApplications(currentUser.id, data => {
          const listChangeDate = data.map(item => {
            const cvDate = formatDate(item.application_date.toISOString())
            return {
              ...item,
              application_date: cvDate,
            } as IApplication
          })
          dispatch(setApplications(listChangeDate))
        })
      } catch (error) {
        console.error('Fail to load applications', error)
      }
    }

    const jwtString = signJWT({
      user_id: currentUser?.id,
      name: `${currentUser?.first_name} ${currentUser?.last_name}`,
    })
    //console.log(jwtString)

    setupTasks()
    setupApps()
    dispatch(fetchOthers())
    dispatch(setStreamToken(jwtString))
    setTimeout(() => {
      setMovingCamera(true)
    }, 2000)

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
      // if (unsubcribeApps) {
      //   unsubcribeApps()
      // }
    }
  }, [dispatch])

  useEffect(() => {
    const setupLocation = async () => {
      const requestStatus = await requestLocationPermission()
      dispatch(setLocationPermisstion(requestStatus))
      if (requestStatus === 'granted') {
        const currentLocation = await getLocation()
        dispatch(setCurrentLocation(currentLocation))
        //console.log('Current location:', currentLocation)
      }
    }
    setupLocation()
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage.data) {
        if (remoteMessage.data.hasOwnProperty('callId')) {
          const callId = remoteMessage.data.callId as string
          handleJoinCall(callId)
        } else {
          const uid = remoteMessage.data.userId as string
          handleNotification(uid)
        }
      }
      // Handles notification interactions when the app is brought from the background to the foreground by a notification tap.
    })

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage && remoteMessage.data) {
          if (remoteMessage.data.hasOwnProperty('callId')) {
            const callId = remoteMessage.data.callId as string
            handleJoinCall(callId)
          } else {
            const uid = remoteMessage.data.userId as string
            handleNotification(uid)
          }
        }
        // Handle notification interaction when the app is opened from a closed state
      })
  }, [])

  if (location.status === 'pending') {
    return (
      <View style={styles.page}>
        <Text>Requesting location permission...</Text>
      </View>
    )
  }

  if (location.status !== 'granted') {
    return (
      <View style={styles.page}>
        <Text>Location permission was not granted.</Text>
        <Text>Please enable location services to use this app.</Text>
      </View>
    )
  }

  const handleTaskPress = (item: ITask) => {
    setTaskModal(item)
    dispatch(toggleModal())
    dispatch(toggleBottomTab())
  }

  const touchWithoutFeedback = () => {}

  const toggleSeachSreen = () => {
    dispatch(toggleBottomTab())
  }

  return (
    <KeyboardAvoidingView style={styles.page}>
      <View style={styles.container}>
        <SearchScreen onPress={toggleSeachSreen} />
        {taskModal && modalVisible && (
          <View style={styles.overlay}>
            <TouchableWithoutFeedback
              onPress={() => {
                dispatch(toggleModal())
                dispatch(toggleBottomTab())
              }}>
              <View style={styles.overlayBackground}></View>
            </TouchableWithoutFeedback>
            <HomeModal item={taskModal} display={modalVisible} />
          </View>
        )}

        <Mapbox.MapView
          styleURL="mapbox://styles/mapbox/streets-v12"
          style={styles.map}
          zoomEnabled
          rotateEnabled>
          {movingCamera && (
            <View>
              <Mapbox.Camera
                //followUserLocation
                centerCoordinate={[location.longitude, location.latitude]}
                zoomLevel={15}
                pitch={70}
                animationDuration={2000}
                animationMode="flyTo"
              />
              <Mapbox.PointAnnotation
                id="marker"
                coordinate={[location.longitude, location.latitude]}>
                <View style={{width: 30, height: 30}}>
                  <IconButton
                    iconName="person-outline"
                    onPress={() => touchWithoutFeedback}
                  />
                </View>
              </Mapbox.PointAnnotation>
              {tasks &&
                tasks.map((item: ITask) => (
                  <Mapbox.PointAnnotation
                    onSelected={() => handleTaskPress(item)}
                    id={`marker-${item.taskId}`}
                    key={`marker-${item.taskId}`}
                    coordinate={[
                      item.location.longtitude,
                      item.location.latitude,
                    ]}>
                    <View />
                  </Mapbox.PointAnnotation>
                ))}
            </View>
          )}
        </Mapbox.MapView>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width,
    height: height,
  },
  map: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  overlayBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.opacityBlack(0.6),
  },
})

export default HomeScreen

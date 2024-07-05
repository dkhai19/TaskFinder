import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Animated,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import Mapbox from '@rnmapbox/maps'
import {Button} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {colors} from '../../constants/color'
import {useEffect, useState} from 'react'
import IconButton from '../../components/IconButton'
import Geolocation from 'react-native-geolocation-service'
import {getAllTasks} from '../../firebase/tasks.api'
import {ITask} from '../../types/tasks.type'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'
import HomeModal from './home-modal'
import {toggleModal} from '../../redux/slices/taskReducer'

Mapbox.setAccessToken(
  'pk.eyJ1IjoiZHVja2hhaTIwMDJ2biIsImEiOiJjbHh2ODBvZXQwamtkMmpwdTFsa3JoeDVrIn0.vrtl6qLPN_NGnRKA2EvLvg',
)
type LocationCoordinates = [number, number] | null
type TaskData = ITask[]
const {width, height} = Dimensions.get('window')
const HomeScreen = () => {
  const [location, setLocation] = useState<LocationCoordinates>(null); //prettier-ignore
  const [permissionStatus, setPermissionStatus] = useState('pending')
  const [movingCamera, setMovingCamera] = useState(false)
  const [tasks, setTasks] = useState<TaskData>([])
  const [taskModal, setTaskModal] = useState<ITask>()
  //const tasks = useSelector((state: RootState) => state.task.tasks)
  const modalVisible = useSelector((state: RootState) => state.task.taskModal)
  const dispatch = useDispatch()
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setPermissionStatus('granted')
          getLocation()
        } else {
          setPermissionStatus('denied')
          console.log('Location permission denied')
        }
      } catch (err) {
        console.warn(err)
      }
    }
  }

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('Get the current position')
        console.log(position.coords)
        setLocation([position.coords.longitude, position.coords.latitude])
      },
      error => {
        console.log(error.code, error.message)
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    )
  }

  useEffect(() => {
    const handleSetData = (items: ITask[]) => {
      console.log(items)
      setTasks(items)
    }
    const unsubcribe = getAllTasks(handleSetData)

    requestLocationPermission()
    setTimeout(() => {
      setMovingCamera(true)
    }, 2000)
    //console.log(tasks)
    return () => unsubcribe()
  }, [])

  if (permissionStatus === 'pending') {
    return (
      <View style={styles.page}>
        <Text>Requesting location permission...</Text>
      </View>
    )
  }

  if (permissionStatus !== 'granted') {
    return (
      <View style={styles.page}>
        <Text>Location permission was not granted.</Text>
        <Text>Please enable location services to use this app.</Text>
      </View>
    )
  }

  const validLocation =
    Array.isArray(location) && location.length === 2 && !isNaN(location[0]) && !isNaN(location[1])
      ? location
      : [21.027763, 105.834160]; // prettier-ignore

  const handleTaskPress = (item: ITask) => {
    console.log(item)
    setTaskModal(item)
    dispatch(toggleModal())
  }

  const touchWithoutFeedback = () => {}

  // const generateFeatureCollection = () => {
  //   return {
  //     type: 'FeatureCollection',
  //     features: [
  //       {
  //         type: 'Feature',
  //         geometry: {
  //           type: 'Point',
  //           coordinates: [validLocation],
  //         },
  //         properties: {
  //           id: '1',
  //           name: '2',
  //         },
  //       },
  //     ],
  //   }
  // }
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        {modalVisible && taskModal && (
          <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={() => dispatch(toggleModal())}>
              <View style={styles.overlayBackground}></View>
            </TouchableWithoutFeedback>
            <HomeModal item={taskModal} />
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
                centerCoordinate={validLocation}
                zoomLevel={13}
                pitch={60}
                animationDuration={2000}
                animationMode="flyTo"
              />
              <Mapbox.PointAnnotation id="marker" coordinate={validLocation}>
                <View style={{width: 40, height: 40}}>
                  <IconButton
                    iconName="person-outline"
                    onPress={() => touchWithoutFeedback}
                  />
                </View>
              </Mapbox.PointAnnotation>
              {tasks.map((item: ITask) => (
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
    </View>
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

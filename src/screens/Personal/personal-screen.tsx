import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {useEffect, useRef, useState} from 'react'
import {typography} from '../../constants/typo'
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types'
import {RootStackParamList} from '../../navigation/RootNavigator'
import {useNavigation} from '@react-navigation/native'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'
import Input from '../../components/Input'
import {IUserProfiles} from '../../types/users.type'
import IconButton from '../../components/IconButton'
import DatePicker from 'react-native-date-picker'
import {formatDate} from '../../validations/convert-date'
import RadioButtonGroup from '../../components/RadioButtonGroup'
import ContainedButton from '../../components/ContainedButton'
import {updateUserProfile} from '../../firebase/users.api'
import ToastMessage from '../../animations/ToastMessage'
import {AppDispatch} from '../../redux/store/store'
import {updateCurrentUser} from '../../redux/slices/userSlice'
import {validatePhone} from '../../validations/user-infor-validation'
import SuccessAnimation from '../../animations/ToastSuccess'
import HeaderCustom from '../../components/Header'
import ImagePicker from 'react-native-image-crop-picker'
import {requestCameraPermission} from '../../apis/stream'
import {getOpacityColor} from '../../constants/color'

const {width, height} = Dimensions.get('window')

const PersonalScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const dispatch = useDispatch<AppDispatch>()
  const currentUser = useSelector((state: RootState) => state.user.currentUser)
  const colors = useSelector((state: RootState) => state.authentication.colors)
  const lightTheme = useSelector(
    (state: RootState) => state.authentication.lightThem,
  )
  const animValue = useRef(new Animated.Value(width)).current
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [updated, setUpdated] = useState<boolean>(false)
  const [displayToast, setDisplayToast] = useState<boolean>(false)
  const [canUpdated, setCanUpdate] = useState<boolean>(false)
  const [editInfor, setEditInfor] = useState<IUserProfiles>({
    id: currentUser.id,
    avatar: currentUser.avatar,
    first_name: currentUser.first_name,
    last_name: currentUser.last_name,
    birthday: currentUser.birthday,
    phone: currentUser.phone,
    gender: currentUser.gender,
    introduction: currentUser.introduction,
    email: currentUser.email,
  })
  const genderOptions = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Others', value: 'Others'},
  ]
  useEffect(() => {
    //console.log(currentUser)
    Animated.timing(animValue, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start()
    //console.log(editInfor)
  }, [])

  useEffect(() => {
    const checkIfEqual = (
      obj1: IUserProfiles,
      obj2: IUserProfiles,
    ): boolean => {
      return (
        obj1.id === obj2.id &&
        obj1.first_name === obj2.first_name &&
        obj1.last_name === obj2.last_name &&
        obj1.birthday === obj2.birthday &&
        obj1.phone === obj2.phone &&
        obj1.gender === obj2.gender &&
        obj1.introduction === obj2.introduction &&
        obj1.email === obj2.email &&
        obj1.avatar === obj2.avatar
      )
    }

    const isEqual = checkIfEqual(editInfor, currentUser)
    if (
      isEqual ||
      editInfor.first_name === '' ||
      editInfor.last_name === '' ||
      editInfor.phone === '' ||
      editInfor.introduction === ''
    ) {
      setCanUpdate(() => false)
    } else {
      setCanUpdate(() => true)
    }
  }, [editInfor, currentUser])

  const animationGoBack = () => {
    Animated.timing(animValue, {
      toValue: width,
      duration: 1000,
      useNativeDriver: true,
    }).start()
    setTimeout(() => {
      navigation.pop()
    }, 1000)
  }

  const onChangeInformation = (key: string, value: string) => {
    if (key === 'phone') {
      value = value.toString()
    }
    setEditInfor(prevState => ({
      ...prevState,
      [key]: value,
    }))
  }

  const updateHandler = async (user: IUserProfiles) => {
    if (!validatePhone(user.phone)) {
      setDisplayToast(() => true)
    } else {
      await updateUserProfile(user)
        .then(() => {
          dispatch(updateCurrentUser(user))
          setUpdated(() => true)
          setTimeout(() => {
            setUpdated(() => false)
            animationGoBack()
          }, 2000)
          return true
        })
        .catch(() => {
          setDisplayToast(() => true)
          return false
        })
    }
  }

  const handleGoBack = () => {
    animationGoBack()
  }

  const handlePickImage = async () => {
    const permission = await requestCameraPermission()
    if (!permission) return
    await ImagePicker.openPicker({
      width: 100,
      height: 110,
      cropping: true,
      mediaType: 'photo',
    })
      .then(async image => {
        setEditInfor(prevState => ({
          ...prevState,
          avatar: image.path,
        }))
      })
      .catch(error => {
        console.log('Error: ', error)
      })
  }

  const pickImage = () => {
    handlePickImage()
  }

  const handleUpdate = () => {
    updateHandler(editInfor)
  }

  if (!currentUser) {
    return (
      <View style={{flex: 1}}>
        <Text>Fetching user information...</Text>
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    imageContainer: {
      height: height * 0.18,

      alignItems: 'center',
    },
    imageBorder: {
      width: 110,
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
    },
    image: {
      width: 100,
      height: 110,
      borderRadius: 12,
    },
    inputField: {
      flex: 1,
      paddingHorizontal: 16,
    },
    nameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    birthdayContainer: {
      flexDirection: 'row',
      marginBottom: 24,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    phoneContainer: {
      marginBottom: 24,
    },
    introduction: {
      borderWidth: 2,
      borderColor: getOpacityColor(colors.black, 0.4),
      borderRadius: 12,
      color: colors.black,
      paddingLeft: 8,
    },
    buttonContainer: {
      width: '100%',
      height: 52,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      backgroundColor: getOpacityColor(colors.black, 0.15),
    },
    camera: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 40,
      height: 40,
      backgroundColor: lightTheme ? colors.white : colors.black,
      borderTopLeftRadius: 8,
    },
    cameraImage: {
      width: 40,
      height: 40,
      borderRadius: 30,
    },
  })

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateX: animValue,
            },
          ],
        },
      ]}>
      {displayToast && (
        <ToastMessage
          message="Invalid input!"
          onHide={() => setDisplayToast(() => false)}
        />
      )}
      {updated && <SuccessAnimation message="Your information have updated!" />}
      <ScrollView>
        <HeaderCustom heading="Personal" onPress={handleGoBack} />
        <View style={styles.imageContainer}>
          <View style={styles.imageBorder}>
            <Image
              style={styles.image}
              source={{uri: editInfor.avatar}}
              alt="Alt"
            />
            <TouchableOpacity onPress={pickImage} style={styles.camera}>
              <Image
                style={styles.cameraImage}
                source={require(`../../assets/photos/cameralight.png`)}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputField}>
          <View style={styles.nameContainer}>
            <View style={{width: '48%'}}>
              <Input
                label="First name"
                value={editInfor.first_name}
                handleChangeText={value =>
                  onChangeInformation('first_name', value)
                }
              />
            </View>
            <View style={{width: '48%'}}>
              <Input
                label="Last name"
                value={editInfor.last_name}
                handleChangeText={value =>
                  onChangeInformation('last_name', value)
                }
              />
            </View>
          </View>
          <View style={styles.birthdayContainer}>
            <View style={{width: '80%'}}>
              <Input
                label="Date of birth"
                value={editInfor.birthday}
                isEditable
                handleChangeText={(text: string) =>
                  onChangeInformation('birthday', text)
                }
              />
            </View>
            <View
              style={{
                width: '14%',
                height: '90%',
                backgroundColor: colors.white,
              }}>
              <IconButton
                iconName="calendar-outline"
                onPress={() => setOpen(true)}
              />
            </View>
          </View>
          <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false)
              onChangeInformation('birthday', formatDate(date.toDateString()))
            }}
            onCancel={() => {
              setOpen(false)
            }}
          />
          <View style={styles.phoneContainer}>
            <Input
              label="Phone number"
              value={editInfor.phone}
              isNumeric
              handleChangeText={(text: string) =>
                onChangeInformation('phone', text)
              }
            />
          </View>
          <View style={{marginBottom: 16}}>
            <RadioButtonGroup
              options={genderOptions}
              onSelect={value => onChangeInformation('gender', value)}
              defaultValue={editInfor.gender}
            />
          </View>
          <View>
            <Text style={[typography.f16_medium]}>Introduction</Text>
            <TextInput
              style={styles.introduction}
              value={editInfor.introduction}
              onChangeText={value => onChangeInformation('introduction', value)}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>
          <View style={{marginTop: 48}}>
            {canUpdated ? (
              <ContainedButton title="Apply changes" onPress={handleUpdate} />
            ) : (
              <View style={styles.buttonContainer}>
                <Text style={[typography.f20_medium, {color: colors.black}]}>
                  Apply Changes
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  )
}

export default PersonalScreen

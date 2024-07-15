import {
  Animated,
  Button,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {colors} from '../../constants/color'
import {useEffect, useRef, useState} from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
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
const {width, height} = Dimensions.get('window')

const PersonalScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const dispatch = useDispatch<AppDispatch>()
  const currentUser = useSelector((state: RootState) => state.user.currentUser)
  const animValue = useRef(new Animated.Value(width)).current
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [updated, setUpdated] = useState<boolean>(false)
  const [displayToast, setDisplayToast] = useState<boolean>(false)
  const [canUpdated, setCanUpdate] = useState<boolean>(false)
  const [editInfor, setEditInfor] = useState<IUserProfiles>({
    id: currentUser.id,
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
    {label: 'Femail', value: 'Female'},
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
        obj1.email === obj2.email
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

  const handleUpdate = () => {
    updateHandler(editInfor)
  }

  const handleGoBack = () => {
    animationGoBack()
  }

  if (!currentUser) {
    return (
      <View style={{flex: 1}}>
        <Text>Fetching user information...</Text>
      </View>
    )
  }

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
        <View style={styles.headingContainer}>
          <TouchableOpacity
            style={{backgroundColor: colors.white}}
            onPress={handleGoBack}>
            <Icon name="arrow-back-outline" size={28} color={colors.black} />
          </TouchableOpacity>
          <View style={styles.headingText}>
            <Text style={[typography.f20_medium, {color: colors.black}]}>
              Personal Data
            </Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <View style={styles.imageBorder}>
            <Image
              style={styles.image}
              source={require('../../assets/photos/image8.jpg')}
            />
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
            />
          </View>
          <View style={{marginTop: 48}}>
            {canUpdated ? (
              <ContainedButton title="Apply changes" onPress={handleUpdate} />
            ) : (
              <View style={styles.buttonContainer}>
                <Text style={[typography.f20_medium, {color: colors.white}]}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headingContainer: {
    flexDirection: 'row',
    height: height * 0.1,
    marginBottom: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headingText: {
    alignItems: 'center',
    flex: 1,
    paddingRight: 16,
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
    borderColor: colors.opacityBlack(0.4),
    borderRadius: 12,
  },
  buttonContainer: {
    width: '100%',
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.opacityBlack(0.15),
  },
})

export default PersonalScreen

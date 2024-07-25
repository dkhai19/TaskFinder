import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  TextInput,
} from 'react-native'
import {useEffect, useRef, useState} from 'react'
import {typography} from '../../constants/typo'
import Input from '../../components/Input'
import ContainedButton from '../../components/ContainedButton'
import {updateSignUpInformation} from '../../firebase/users.api'
import DatePicker from 'react-native-date-picker'
import IconButton from '../../components/IconButton'
import {RootState} from '../../redux/rootReducer'
import {useSelector} from 'react-redux'
import RadioButtonGroup from '../../components/RadioButtonGroup'
import {IUsers} from '../../types/users.type'
import {checkToken} from '../../firebase/notifications.api'
import {getOpacityColor} from '../../constants/color'
const {height} = Dimensions.get('window')

interface IModal {
  onPress: () => void
}

const SignUpModal: React.FC<IModal> = ({onPress}) => {
  const translateYValue = useRef(new Animated.Value(height)).current
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const user = useSelector((state: RootState) => state.user.currentUser)
  const colors = useSelector((state: RootState) => state.authentication.colors)
  const genderOptions = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Others', value: 'Others'},
  ]
  const [additionaInfo, setAdditionalInfo] = useState<IUsers>({
    id: user.id,
    avatar:
      'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg',
    cover:
      'https://timelinecovers.pro/facebook-cover/download/hungry-for-success-facebook-cover.jpg',
    rating: 5,
    fcmToken: '',
    email: user.email,
    phone: user.phone,
    first_name: user.first_name,
    last_name: user.last_name,
    birthday: user.birthday,
    introduction: user.introduction,
    gender: user.gender,

    role: user.role,
  })

  //Animation for show up modal
  useEffect(() => {
    const setupFCM = async () => {
      await checkToken().then(token => {
        setAdditionalInfo(prev => ({
          ...prev,
          fcmToken: token,
        }))
      })
    }
    setupFCM()
    Animated.parallel([
      Animated.timing(translateYValue, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.spring(translateYValue, {
        toValue: 0,
        speed: 4,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const onChangeText = (key: string, text: string) => {
    setAdditionalInfo(prevState => ({
      ...prevState,
      [key]: text,
    }))
  }

  const handleUpdateUser = async () => {
    await updateSignUpInformation(additionaInfo).then(() => {
      onPress()
    })
  }

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.white,
    },
    body: {
      paddingHorizontal: 8,
    },
    headerText: {
      height: height * 0.15,
      paddingHorizontal: 16,
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginBottom: 16,
    },
    twoInRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    singleInputContainer: {
      width: '47%',
    },
    textBold: {
      color: colors.black,
    },
    noteText: {
      color: getOpacityColor(colors.black, 0.5),
    },
    introduction: {
      borderWidth: 2,
      borderColor: getOpacityColor(colors.black, 0.4),
      borderRadius: 12,
    },
  })

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{translateY: translateYValue}],
        },
      ]}>
      <View style={styles.body}>
        <View style={styles.headerText}>
          <Text style={[typography.f20_bold, styles.textBold]}>
            Let's make sure we've got your
          </Text>
          <Text style={[typography.f20_bold, styles.textBold]}>
            correct info
          </Text>
        </View>
        <View style={styles.twoInRow}>
          <View style={styles.singleInputContainer}>
            <Input
              label="Legal First Name"
              value={additionaInfo.first_name}
              handleChangeText={(text: string) =>
                onChangeText('first_name', text)
              }
            />
          </View>
          <View style={styles.singleInputContainer}>
            <Input
              label="Legal Last Name"
              value={additionaInfo.last_name}
              handleChangeText={(text: string) =>
                onChangeText('last_name', text)
              }
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginBottom: 16,
            justifyContent: 'space-between',
          }}>
          <View style={{width: '80%'}}>
            <Input
              label="Date of birth"
              value={additionaInfo.birthday}
              isEditable
              handleChangeText={(text: string) =>
                onChangeText('birthday', text)
              }
            />
          </View>
          <View style={{width: '15%', backgroundColor: colors.white}}>
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
            onChangeText('birthday', date.toDateString())
          }}
          onCancel={() => {
            setOpen(false)
          }}
        />
        <View style={{marginBottom: 16}}>
          <TextInput
            style={styles.introduction}
            placeholder="Tell us about yourself"
            onChangeText={(value: string) =>
              onChangeText('introduction', value)
            }
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
          <View style={{padding: 4}}>
            <Text style={[typography.f13_medium, styles.noteText]}>
              * Introduce about yourself to impress employers
            </Text>
          </View>
        </View>
        <View style={{marginBottom: 16}}>
          <RadioButtonGroup
            options={genderOptions}
            onSelect={value => onChangeText('gender', value)}
          />
        </View>
        <ContainedButton onPress={() => handleUpdateUser()} title="Confirm" />
      </View>
    </Animated.View>
  )
}

export default SignUpModal

import {
  Button,
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../constants/color';
import {useEffect, useRef, useState} from 'react';
import {typography} from '../../constants/typo';
import Input from '../../components/Input';
import ContainedButton from '../../components/ContainedButton';
import auth from '@react-native-firebase/auth';
import {updateUserById} from '../../firebase/authentications_api';
import {parseDateOfBirth} from '../../validations/user-infor-validation';
import DatePicker from 'react-native-date-picker';
import IconButton from '../../components/IconButton';
const {width, height} = Dimensions.get('window');

interface IModal {
  onPress: () => void;
}

const SignUpModal: React.FC<IModal> = ({onPress}) => {
  const translateYValue = useRef(new Animated.Value(height)).current;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [additionaInfo, setAdditionalInfo] = useState({
    first_name: '',
    last_name: '',
    birthday: '',
    identity: '',
  });
  //Animation for show up modal
  useEffect(() => {
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
    ]).start();
  }, []);

  const onChangeText = (key: string, text: string) => {
    setAdditionalInfo(prevState => ({
      ...prevState,
      [key]: text,
    }));
  };

  const handleUpdateUser = async () => {
    const user_id = auth().currentUser?.uid;

    if (user_id) {
      const parseDOB = parseDateOfBirth(additionaInfo.birthday);
      if (!parseDOB) {
        console.log('Error date format!');
        return;
      }
      const updatedInfo = {
        ...additionaInfo,
        birthday: parseDOB,
      };

      await updateUserById(user_id, updatedInfo).then(() => {
        onPress();
      });
    }
  };

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
            <IconButton onPress={() => setOpen(true)} />
          </View>
        </View>
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            onChangeText('birthday', date.toDateString());
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <View style={{marginBottom: 16}}>
          <Input
            label="Identity"
            isNumeric
            value={additionaInfo.identity}
            handleChangeText={(text: string) => onChangeText('identity', text)}
          />
          <View style={{padding: 4}}>
            <Text style={[typography.f13_medium, styles.noteText]}>
              * Sequence of 12 digits on your identity card
            </Text>
          </View>
        </View>
        <ContainedButton onPress={() => handleUpdateUser()} title="Confirm" />
      </View>
    </Animated.View>
  );
};

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
    color: colors.opacityBlack(0.5),
  },
});

export default SignUpModal;

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
import {updateUserById} from '../../api/firebase_api';
const {width, height} = Dimensions.get('window');

interface IModal {
  onPress: () => void;
}

const SignUpModal: React.FC<IModal> = ({onPress}) => {
  const translateYValue = useRef(new Animated.Value(height)).current;
  const [additionaInfo, setAdditionalInfo] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
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
      await updateUserById(user_id, additionaInfo).then(() => {
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
        <View style={{marginBottom: 16}}>
          <Input
            label="Date of Birth"
            value={additionaInfo.date_of_birth}
            handleChangeText={(text: string) =>
              onChangeText('date_of_birth', text)
            }
          />
        </View>
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

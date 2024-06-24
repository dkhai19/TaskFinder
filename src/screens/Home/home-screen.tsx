import {Text, View} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {LoginStackParamList} from '../../navigation/RootNavigator';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/rootReducer';

const HomeScreen = () => {
  const userID = useSelector((state: RootState) => state.authentication.uid);
  console.log(userID);
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};
export default HomeScreen;

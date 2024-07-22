import {
  Animated,
  Dimensions,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import {colors} from '../../constants/color'
import Icon from 'react-native-vector-icons/Feather'
import {typography} from '../../constants/typo'
import {useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'
import {IUserProfiles} from '../../types/users.type'
import SearchItem from './search-item'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types'
import {RootStackParamList} from '../../navigation/RootNavigator'

interface ISearchScreen {
  onPress: () => void
}

const {width, height} = Dimensions.get('window')

const SearchScreen: React.FC<ISearchScreen> = ({onPress}) => {
  const widAnim = useRef(new Animated.Value(50)).current
  const heiAnim = useRef(new Animated.Value(50)).current
  const others = useSelector((state: RootState) => state.user.otherUsers)
  const [searchOther, setSearchOther] = useState<IUserProfiles[]>()
  useEffect(() => {
    if (others) {
      setSearchOther(others)
    }
    console.log(searchOther)
  }, [])
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const displayBottom = useSelector(
    (state: RootState) => state.app.displayBottom,
  )
  const pressHandler = () => {
    onPress()
    if (displayBottom) {
      Animated.sequence([
        Animated.timing(widAnim, {
          toValue: width,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(heiAnim, {
          toValue: height,
          duration: 1500,
          useNativeDriver: false,
        }),
      ]).start()
    } else {
      Animated.sequence([
        Animated.timing(heiAnim, {
          toValue: 50,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(widAnim, {
          toValue: 50,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]).start()
    }
  }

  const navigateToUserProfile = (uid: string) => {
    navigation.navigate('Profile', {uid: uid})
  }

  const renderSearchItem = (item: IUserProfiles) => {
    return (
      <View>
        <SearchItem
          user={item}
          onPress={(uid: string) => navigateToUserProfile(uid)}
        />
      </View>
    )
  }

  if (!searchOther) {
    return (
      <View>
        <Text>Loading users ...</Text>
      </View>
    )
  }

  const handleSearchChange = (input: string) => {
    const filtered = others?.filter(item => {
      const fullName =
        item.first_name.toLowerCase() + item.last_name.toLowerCase()
      return fullName.includes(input.toLowerCase())
    })
    setSearchOther(filtered)
  }

  return (
    <Animated.View
      style={[
        {
          width: widAnim,
          height: heiAnim,
        },
        styles.container,
        displayBottom && {
          borderTopLeftRadius: 4,
          borderBottomLeftRadius: 4,
          borderTopRightRadius: 24,
          borderBottomRightRadius: 24,
        },
      ]}>
      <TouchableOpacity onPress={pressHandler} style={styles.iconContainer}>
        <Icon
          name={displayBottom ? 'search' : 'arrow-up-left'}
          size={28}
          color={colors.red}
        />
      </TouchableOpacity>
      <TextInput
        style={{
          marginHorizontal: 60,
        }}
        placeholder="Type name of owner"
        onChangeText={input => handleSearchChange(input)}
      />
      <FlatList
        data={searchOther}
        renderItem={({item}) => renderSearchItem(item)}
      />

      <View style={styles.content}></View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 100,
    top: 10,
    left: 0,
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.black,
    elevation: 4,
  },
  iconContainer: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  content: {
    flex: 1,
    top: height * 0.05,
  },
})

export default SearchScreen

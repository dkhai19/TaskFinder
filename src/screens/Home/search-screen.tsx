import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {colors} from '../../constants/color'
import Icon from 'react-native-vector-icons/Feather'
import {typography} from '../../constants/typo'
import {useEffect, useRef} from 'react'
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'

interface ISearchScreen {
  onPress: () => void
}

const {width, height} = Dimensions.get('window')

const SearchScreen: React.FC<ISearchScreen> = ({onPress}) => {
  const widAnim = useRef(new Animated.Value(50)).current
  const heiAnim = useRef(new Animated.Value(50)).current
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
          marginLeft: 48,
        }}
        placeholder="Enter your interest"
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

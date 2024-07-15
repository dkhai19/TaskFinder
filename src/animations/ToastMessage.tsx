import {useEffect, useRef} from 'react'
import {Easing} from 'react-native'
import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native'
import {colors} from '../constants/color'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {typography} from '../constants/typo'
const {width, height} = Dimensions.get('window')
interface IToastMessage {
  message: string
  onHide: () => void
}
const ToastMessage: React.FC<IToastMessage> = ({message, onHide}) => {
  const animatedValue = useRef(new Animated.Value(-500)).current
  //Price Drop Alert
  useEffect(() => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 0,
        easing: Easing.in(Easing.ease),
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(animatedValue, {
        toValue: 20,
        friction: 2,
        useNativeDriver: true,
      }),
      Animated.spring(animatedValue, {
        toValue: 10,
        friction: 2,
        useNativeDriver: true,
      }),
    ]).start()

    const timer = setTimeout(() => {
      Animated.timing(animatedValue, {
        toValue: -500,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        onHide()
      })
    }, 3000)

    return () => clearTimeout(timer)
  }, [animatedValue, onHide])

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateX: animatedValue,
            },
          ],
        },
      ]}>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Ionicons name="alert-outline" size={18} color={colors.red} />
        </View>
        <View>
          <Text style={[typography.f17_medium, {color: colors.black}]}>
            {message}
          </Text>
        </View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 100,
    width: width * 0.9,
    height: 52,
    top: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red,
  },
})

export default ToastMessage

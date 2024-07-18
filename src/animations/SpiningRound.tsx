import {ReactNode, useEffect, useRef} from 'react'
import {View, Animated, StyleSheet, TouchableOpacity} from 'react-native'

interface ISpinAnimation {
  children: ReactNode
}

const SpinAnimation: React.FC<ISpinAnimation> = ({children}) => {
  const animatedValue = useRef(new Animated.Value(0)).current
  const scaleValue = useRef(new Animated.Value(1)).current
  const spin = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })
  const startSpin = () => {
    animatedValue.setValue(0)
    Animated.parallel([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start()
  }
  useEffect(() => {
    startSpin()
  })

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{rotate: spin}, {scale: scaleValue}],
        },
      ]}>
      {children}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default SpinAnimation

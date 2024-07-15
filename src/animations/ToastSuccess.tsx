import React, {useEffect, useRef} from 'react'
import {Animated, StyleSheet, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {typography} from '../constants/typo'
import {colors} from '../constants/color'

interface ISuccess {
  message: string
}

const SuccessAnimation: React.FC<ISuccess> = ({message}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current
  const opacityAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.checkmarkContainer,
          {
            transform: [{scale: scaleAnim}],
            opacity: opacityAnim,
          },
        ]}>
        <View style={{marginBottom: 16}}>
          <Icon name="checkmark-circle" size={100} color="green" />
        </View>
        <Text style={[typography.f24_semibold, {color: colors.black}]}>
          {message}
        </Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 100,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.opacityBlack(0.3),
  },
  checkmarkContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default SuccessAnimation

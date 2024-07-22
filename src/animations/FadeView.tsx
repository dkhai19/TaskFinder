import {useEffect, useRef} from 'react'
import {Animated, StyleProp, ViewStyle} from 'react-native'

interface IFadeView {
  style: StyleProp<ViewStyle>
  children: React.ReactNode
}

const FadeView: React.FC<IFadeView> = ({children, style}) => {
  const opacityAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start()
  }, [])
  return (
    <Animated.View style={[style, {opacity: opacityAnim}]}>
      {children}
    </Animated.View>
  )
}

export default FadeView

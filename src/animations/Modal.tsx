import {useRef} from 'react'
import {
  Animated,
  PanResponder,
  StyleProp,
  ViewStyle,
  Dimensions,
} from 'react-native'
import {useDispatch} from 'react-redux'
import {AppDispatch} from '../redux/store/store'
import {toggleModal} from '../redux/slices/taskSlice'
interface IDragView {
  style: StyleProp<ViewStyle>
  children: React.ReactNode
}

const {width, height} = Dimensions.get('window')

const DragView: React.FC<IDragView> = ({children, style}) => {
  const dispatch = useDispatch<AppDispatch>()

  const pan = useRef(new Animated.Value(height * 0.5)).current
  const currentPosition = useRef({x: 0, y: height * 0.5})

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dy: pan}], {
        useNativeDriver: false,
      }),
      onPanResponderGrant: () => {
        pan.setOffset(currentPosition.current.y)
        pan.setValue(0)
      },
      onPanResponderRelease: (e, gestureState) => {
        const total = currentPosition.current.y + gestureState.dy
        // console.log(total)
        // console.log(gestureState.dy)
        if (total < height * 0.5) {
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: true,
          }).start()
          currentPosition.current.y = 0
        } else if (total < height * 0.9) {
          Animated.spring(pan, {
            toValue: height * 0.5,
            useNativeDriver: true,
          }).start()
          currentPosition.current.y = height * 0.5
        } else {
          Animated.spring(pan, {
            toValue: height,
            useNativeDriver: true,
          }).start(() => dispatch(toggleModal()))
        }
        pan.flattenOffset()
      },
    }),
  ).current
  return (
    <Animated.View
      style={[style, {transform: [{translateY: pan}]}]}
      {...panResponder.panHandlers}>
      {children}
    </Animated.View>
  )
}

export default DragView

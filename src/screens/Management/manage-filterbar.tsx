import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native'
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'
import {getOpacityColor} from '../../constants/color'
const {width} = Dimensions.get('window')

interface IManageFilterBar {
  onChangeType: (type: string) => void
}

const ManageFilterBar: React.FC<IManageFilterBar> = ({onChangeType}) => {
  const [selected, setSelected] = useState('All')
  const [animation, setAnimation] = useState(new Animated.Value(0))
  const colors = useSelector((state: RootState) => state.authentication.colors)
  useEffect(() => {
    let toValue: number
    switch (selected) {
      case 'All':
        toValue = 0
        break
      case 'Applying':
        toValue = 1
        break
      case 'Accepted':
        toValue = 2
        break
      case 'Rejected':
        toValue = 3
        break
      default:
        toValue = 0
    }

    Animated.spring(animation, {
      toValue,
      bounciness: 4,
      useNativeDriver: false,
    }).start()
  }, [selected, animation])

  const translateX = animation.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [0, width * 0.25, width * 0.5, width * 0.75],
  })

  const options = ['All', 'Applying', 'Accepted', 'Rejected']

  const handleChange = (item: string) => {
    setSelected(item)
    onChangeType(item)
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      position: 'relative',
    },
    background: {
      position: 'absolute',
      width: width * 0.25,
      height: '100%',
      backgroundColor: getOpacityColor(colors.red, 0.15),
      borderRadius: 5,
    },
    button: {
      flex: 1,
      padding: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    activeButton: {
      // Add styles for active button if needed
    },
    normalText: {
      fontSize: 14,
      color: colors.black,
    },
    boldText: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.red,
    },
  })

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.background, {transform: [{translateX}]}]} />
      {options.map(item => (
        <TouchableOpacity
          key={item}
          style={[styles.button, selected === item && styles.activeButton]}
          onPress={() => handleChange(item)}>
          <Text style={selected === item ? styles.boldText : styles.normalText}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default ManageFilterBar

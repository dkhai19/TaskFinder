import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {typography} from '../constants/typo'
import Icon from 'react-native-vector-icons/Ionicons'
import {useSelector} from 'react-redux'
import {RootState} from '../redux/rootReducer'
interface IHeader {
  heading?: string
  onPress: () => void
}

const HeaderCustom: React.FC<IHeader> = ({heading, onPress}) => {
  const colors = useSelector((state: RootState) => state.authentication.colors)

  const {height} = Dimensions.get('window')

  const styles = StyleSheet.create({
    headingContainer: {
      flexDirection: 'row',
      height: height * 0.05,
      paddingHorizontal: 16,
      alignItems: 'flex-end',
    },
    headingText: {
      alignItems: 'center',
      flex: 1,
      paddingRight: 16,
    },
  })
  return (
    <View style={styles.headingContainer}>
      <TouchableOpacity onPress={onPress}>
        <Icon name="arrow-back-outline" size={28} color={colors.black} />
      </TouchableOpacity>
      <View style={styles.headingText}>
        {heading && (
          <Text style={[typography.f20_medium, {color: colors.black}]}>
            {heading}
          </Text>
        )}
      </View>
    </View>
  )
}

export default HeaderCustom

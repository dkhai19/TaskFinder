import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {colors} from '../constants/color'
import {typography} from '../constants/typo'
import Icon from 'react-native-vector-icons/Ionicons'
interface IHeader {
  heading?: string
  onPress: () => void
}

const HeaderCustom: React.FC<IHeader> = ({heading, onPress}) => {
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

export default HeaderCustom

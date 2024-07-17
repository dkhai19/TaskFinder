import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {typography} from '../../constants/typo'
import {colors} from '../../constants/color'
import {formatDate} from '../../validations/convert-date'
import Icon from 'react-native-vector-icons/Foundation'
interface ICardItem {
  onPress: () => void
  title: string
  descript: string
  fromDate: string
  toDate: string
  price: number
}

const CardItem: React.FC<ICardItem> = ({
  onPress,
  title,
  descript,
  fromDate,
  toDate,
  price,
}) => {
  const sDate = formatDate(fromDate)
  const eDate = formatDate(toDate)
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 4,
        }}>
        <View style={{flex: 1}}>
          <Text style={[typography.f16_semibold, {color: colors.black}]}>
            {title}
          </Text>
        </View>
        <View style={{flex: 2}}>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={[typography.f15_regular, {color: colors.opacityBlack(0.6)}]}>
            {descript}
          </Text>
        </View>
        <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
          <Text style={[typography.f16_semibold, {color: colors.black}]}>
            {sDate}
          </Text>
          <Text
            style={[typography.f16_regular, {color: colors.opacityBlack(0.7)}]}>
            {'  '}-{'  '}
          </Text>
          <Text style={[typography.f16_semibold, {color: colors.black}]}>
            {eDate}
          </Text>
        </View>
      </View>
      <View style={styles.right}>
        <View style={styles.priceContainer}>
          <Icon name="dollar" size={32} color={colors.red} />
          <View
            style={{
              paddingLeft: 8,
            }}>
            <Text style={[typography.f20_bold, {color: colors.black}]}>
              {price}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
          <Text style={[typography.f18_bold, {color: colors.white}]}>
            Apply
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#e0e0e6',
    height: 160,
    marginTop: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  right: {
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    width: '100%',
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})

export default CardItem

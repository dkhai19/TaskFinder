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
  status?: string
}

const CardItem: React.FC<ICardItem> = ({
  onPress,
  title,
  descript,
  fromDate,
  toDate,
  price,
  status,
}) => {
  const sDate = formatDate(fromDate)
  const eDate = formatDate(toDate)
  let formatStatus
  if (status) {
    formatStatus = status?.substring(0, 1).toUpperCase() + status?.substring(1)
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 4,
        }}>
        <View style={{flex: 1}}>
          <Text style={[typography.f15_medium, {color: colors.black}]}>
            {title}
          </Text>
        </View>
        <View style={{flex: 2}}>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={[typography.f13_regular, {color: colors.opacityBlack(0.6)}]}>
            {descript}
          </Text>
        </View>
        <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
          <Text style={[typography.f15_medium, {color: colors.black}]}>
            {sDate}
          </Text>
          <Text
            style={[typography.f15_medium, {color: colors.opacityBlack(0.7)}]}>
            {'  '}-{'  '}
          </Text>
          <Text style={[typography.f15_medium, {color: colors.black}]}>
            {eDate}
          </Text>
        </View>
      </View>
      <View style={styles.right}>
        <View style={styles.priceContainer}>
          <Icon name="dollar" size={24} color={colors.red} />
          <View
            style={{
              paddingLeft: 8,
            }}>
            <Text style={[typography.f16_semibold, {color: colors.black}]}>
              {price}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
          <Text style={[typography.f16_medium, {color: colors.white}]}>
            {formatStatus}
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
    flex: 2,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  buttonContainer: {
    width: '80%',
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 8,
  },
})

export default CardItem

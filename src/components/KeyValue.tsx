import {StyleSheet, Text, View} from 'react-native'
import {typography} from '../constants/typo'
import {useSelector} from 'react-redux'
import {RootState} from '../redux/rootReducer'
import {getOpacityColor} from '../constants/color'

interface IKeyValueText {
  title: string
  value: string
}

const KeyValueText: React.FC<IKeyValueText> = ({title, value}) => {
  const colors = useSelector((state: RootState) => state.authentication.colors)

  const styles = StyleSheet.create({
    column_item: {
      alignItems: 'center',
      padding: 12,
    },
    black_opacity_04: {
      color: getOpacityColor(colors.black, 0.4),
    },
    black: {
      color: colors.black,
    },
  })
  return (
    <View style={styles.column_item}>
      <Text style={[typography.f20_bold, styles.black]}>{value}</Text>
      <Text style={[typography.f13_regular, styles.black_opacity_04]}>
        {title}
      </Text>
    </View>
  )
}

export default KeyValueText

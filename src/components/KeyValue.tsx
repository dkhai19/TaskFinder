import {StyleSheet, Text, View} from 'react-native';
import {typography} from '../constants/typo';
import {colors} from '../constants/color';

interface IKeyValueText {
  title: string;
  value: string;
}

const KeyValueText: React.FC<IKeyValueText> = ({title, value}) => {
  return (
    <View style={styles.column_item}>
      <Text style={[typography.f20_bold, styles.black]}>{value}</Text>
      <Text style={[typography.f13_regular, styles.black_opacity_04]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  column_item: {
    alignItems: 'center',
    padding: 12,
  },
  black_opacity_04: {
    color: colors.opacityBlack(0.4),
  },
  black: {
    color: colors.black,
  },
});

export default KeyValueText;

import {StyleSheet, Text, TextInput, View} from 'react-native';
import {colors} from '../constants/color';
import {typography} from '../constants/typo';

interface IInput {
  label: string;
  isNumeric?: boolean;
  value: string;
  handleChangeText: (text: string) => void;
}

const Input: React.FC<IInput> = ({
  label,
  isNumeric,
  value,
  handleChangeText,
}) => {
  return (
    <View style={[styles.container]}>
      <View
        style={{paddingLeft: 8, paddingTop: 8, justifyContent: 'space-evenly'}}>
        <Text
          style={[typography.f12_regular, {color: colors.opacityBlack(0.5)}]}>
          {label}
        </Text>
        <TextInput
          style={[styles.input, typography.f14_medium]}
          keyboardType={isNumeric ? 'numeric' : 'default'}
          value={value}
          onChangeText={handleChangeText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 62,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.opacityBlack(0.5),
  },
  input: {
    paddingBottom: 8,
  },
});

export default Input;
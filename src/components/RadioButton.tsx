// components/RadioButton.js
import React from 'react'
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native'
import {typography} from '../constants/typo'
import {useSelector} from 'react-redux'
import {RootState} from '../redux/rootReducer'
import {getOpacityColor} from '../constants/color'

interface IRadioButton {
  label: string
  value: string
  selected: boolean
  onSelect: (value: string) => void
}

const RadioButton: React.FC<IRadioButton> = ({
  label,
  value,
  selected,
  onSelect,
}) => {
  const colors = useSelector((state: RootState) => state.authentication.colors)
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: getOpacityColor(colors.black, 0.4),
    },
    radioCircle: {
      height: 24,
      width: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.black,
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedRb: {
      width: 14,
      height: 14,
      borderRadius: 6,
      backgroundColor: colors.red,
    },
    radioText: {
      marginLeft: 8,
    },
  })
  return (
    <TouchableOpacity style={styles.container} onPress={() => onSelect(value)}>
      <View style={styles.radioCircle}>
        {selected && <View style={styles.selectedRb} />}
      </View>
      <Text
        style={[
          styles.radioText,
          typography.f16_medium,
          {color: colors.black},
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export default RadioButton

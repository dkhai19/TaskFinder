// components/RadioButtonGroup.tsx
import React, {useState} from 'react'
import {View, StyleSheet} from 'react-native'
import RadioButton from './RadioButton'

export interface IOption {
  label: string
  value: string
}

interface IRadioButtonGroupProps {
  options: IOption[]
  onSelect: (value: string) => void
  defaultValue?: string
}

const RadioButtonGroup: React.FC<IRadioButtonGroupProps> = ({
  options,
  onSelect,
  defaultValue,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(
    defaultValue || null,
  )

  const handleSelect = (value: string) => {
    setSelectedValue(value)
    onSelect(value)
  }

  return (
    <View style={styles.container}>
      {options.map(option => (
        <RadioButton
          key={option.value}
          label={option.label}
          value={option.value}
          selected={selectedValue === option.value}
          onSelect={handleSelect}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export default RadioButtonGroup

import {StyleSheet, Text, View} from 'react-native'
import {colors} from '../../constants/color'
import ManageFilterBar from './manage-filterbar'
import {typography} from '../../constants/typo'

const ManagementScreen = () => {
  const handleChangeDataType = (type: string) => {
    //console.log(type)
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingText}>
        <Text style={[typography.f17_medium, {color: colors.black}]}>
          Tasks you applied
        </Text>
      </View>
      <View style={styles.filterBar}>
        <ManageFilterBar onChangeType={type => handleChangeDataType(type)} />
      </View>
      <View style={styles.content}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headingText: {
    marginTop: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBar: {
    marginTop: 24,
    borderTopWidth: 0.5,
    borderBottomWidth: 1,
    borderColor: colors.black,
    borderRadius: 8,
  },
  content: {},
})
export default ManagementScreen

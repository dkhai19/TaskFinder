import {ScrollView, StyleSheet, Text, View} from 'react-native'
import {colors} from '../../constants/color'
import ManageFilterBar from './manage-filterbar'
import {typography} from '../../constants/typo'
import {useEffect, useState} from 'react'
import {IPostApplication} from '../../types/applications.type'
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'
import {getAllMyApplications} from '../../firebase/applications.api'
import ApplicationItem from './application-item'
import {UnsubcribeFunc} from '../../types/unsubcribe.type'
import {IApplication} from '../../redux/slices/applicationSlice'

const ManagementScreen = () => {
  const handleChangeDataType = (type: string) => {
    const tolower = type.toLowerCase()
    setAction(tolower)
  }
  const applications = useSelector(
    (state: RootState) => state.application.applied,
  )
  const [filterItems, setFilterItems] = useState<IApplication[]>()
  const [action, setAction] = useState<string>()
  useEffect(() => {
    switch (action) {
      case 'applying':
        setFilterItems(applications.filter(item => item.status === 'applying'))
        break
      case 'accepted':
        setFilterItems(applications.filter(item => item.status === 'accepted'))
        break
      case 'rejected':
        setFilterItems(applications.filter(item => item.status === 'rejected'))
        break
      default:
        setFilterItems(applications)
    }
    console.log(applications)
  }, [action])

  return (
    <View style={styles.container}>
      <View style={styles.headingText}>
        <Text style={[typography.f20_bold, {color: colors.black}]}>
          Tasks you applied
        </Text>
      </View>
      <View style={styles.filterBar}>
        <ManageFilterBar onChangeType={type => handleChangeDataType(type)} />
      </View>
      <View style={styles.content}>
        <ScrollView style={{paddingHorizontal: 16}}>
          {filterItems &&
            filterItems?.map(item => (
              <ApplicationItem key={item.task_id} item={item} />
            ))}
        </ScrollView>
      </View>
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
  content: {
    flex: 1,
    backgroundColor: colors.opacityBlack(0.15),
  },
})
export default ManagementScreen

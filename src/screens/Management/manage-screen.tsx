import {ScrollView, StyleSheet, Text, View} from 'react-native'
import ManageFilterBar from './components/manage-filterbar'
import {typography} from '../../constants/typo'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'
import {getAllMyApplications} from '../../firebase/applications.api'
import ApplicationItem from './components/application-item'
import {UnsubcribeFunc} from '../../types/unsubcribe.type'
import {
  IApplication,
  setApplications,
} from '../../redux/slices/applicationSlice'
import {formatDate} from '../../validations/convert-date'
import {getOpacityColor} from '../../constants/color'

const ManagementScreen = () => {
  const handleChangeDataType = (type: string) => {
    const tolower = type.toLowerCase()
    setAction(tolower)
  }

  const applications = useSelector(
    (state: RootState) => state.application.applied,
  )

  const colors = useSelector((state: RootState) => state.authentication.colors)

  const [filterItems, setFilterItems] = useState<IApplication[]>()
  const [action, setAction] = useState<string>()
  const currentUser = useSelector((state: RootState) => state.user.currentUser)
  const dispatch = useDispatch()

  useEffect(() => {
    if (applications.length === 0) {
      console.log('Loading the applications in manage screen')
      let unsubcribeApps: UnsubcribeFunc | undefined
      const setupApps = async () => {
        try {
          unsubcribeApps = await getAllMyApplications(currentUser.id, data => {
            const listChangeDate = data.map(item => {
              const cvDate = formatDate(item.application_date.toISOString())
              return {
                ...item,
                application_date: cvDate,
              } as IApplication
            })
            dispatch(setApplications(listChangeDate))
          })
        } catch (error) {
          console.error('Fail to load applications', error)
        }
      }
      setupApps()
    }
  }, [])

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
      backgroundColor: getOpacityColor(colors.black, 0.15),
    },
  })
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

export default ManagementScreen

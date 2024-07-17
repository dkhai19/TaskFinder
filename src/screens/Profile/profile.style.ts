import {Dimensions, StyleSheet} from 'react-native'
import {colors} from '../../constants/color'

const {width, height} = Dimensions.get('window')

export const profileStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainer: {
    position: 'absolute',
    zIndex: 20,
  },
  coverContainer: {
    width: width,
    height: height * 0.25,
    backgroundColor: colors.blue,
  },
  avatarContainer: {
    position: 'absolute',
    zIndex: 20,
    left: 16,
    top: height * 0.19,
    width: 130,
    height: 130,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInner: {
    width: 122,
    height: 122,
    borderRadius: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatar: {
    width: 115,
    height: 115,
    borderRadius: 60,
  },
  contactContainer: {
    position: 'absolute',
    zIndex: 20,
    right: 16,
    top: height * 0.22,
  },
  contactButton: {
    width: 150,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e0e6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.white,
  },
  nameContainer: {
    flexDirection: 'row',
    marginTop: height * 0.09,
    paddingLeft: 24,
  },
  tickContainer: {
    paddingTop: 6,
    paddingLeft: 8,
  },
  tickBackground: {
    width: 22,
    height: 22,
    borderRadius: 20,
    backgroundColor: colors.opacityBlue(0.9),
    justifyContent: 'center',
    alignItems: 'center',
  },
  introContainer: {
    marginTop: 8,
    paddingHorizontal: 24,
  },
  taskContainer: {
    marginTop: 24,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  itemsContainer: {
    marginTop: 36,
    marginHorizontal: 24,
    alignItems: 'center',
    flexDirection: 'row',
  },
})

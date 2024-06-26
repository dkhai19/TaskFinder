import {StyleSheet} from 'react-native';
import {colors} from '../../constants/color';

export const signupStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  images_layer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  background_layer: {
    flex: 1,
    backgroundColor: colors.opacityBlack(0.75),
  },
  image1_container: {
    width: '100%',
    height: '60%',
    backgroundColor: colors.blue,
  },
  image2_container: {
    width: '100%',
    height: '40%',
    backgroundColor: colors.red,
  },
  image3_container: {
    width: '100%',
    height: '45%',
    backgroundColor: colors.red,
  },
  image4_container: {
    width: '100%',
    height: '55%',
    backgroundColor: colors.blue,
  },
  content_container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  slogan_container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  middle: {
    flex: 7,
  },
  input_container: {
    width: '100%',
    height: 60,
    borderRadius: 71,
    backgroundColor: colors.opacityWhite(0.3),
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    color: colors.white,
    paddingVertical: 18,
    paddingLeft: 28,
    paddingRight: 16,
    width: '85%',
  },
  icon_container: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_container: {
    width: '100%',
    height: 60,
    borderRadius: 71,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  register_container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  agreement_container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 16,
  },
  alert: {
    height: 60,
    width: '60%',
    backgroundColor: colors.white,
  },
  phone_container: {
    width: '20%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: colors.white,
  },
});

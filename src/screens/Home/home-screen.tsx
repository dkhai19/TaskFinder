import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken(
  'sk.eyJ1IjoiZHVja2hhaTIwMDJ2biIsImEiOiJjbHh2YWh1c2gyOHltMmpzaGw0Z3BkYWI1In0.bmfQquQh-tPTiVSO0uL4Jg',
);
const {width, height} = Dimensions.get('window');
const HomeScreen = () => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        {/* <Mapbox.MapView style={styles.map} /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width,
    height: height,
  },
  map: {
    flex: 1,
  },
});

export default HomeScreen;

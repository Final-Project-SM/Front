// MyPathScreenStyles.js
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    flex: 1,
    height: 300,
    marginTop: 20,
  },
  dayContainer: {
    marginBottom: 20,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  locationContainer: {
    marginBottom: 5,
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  locationsContainer: {
    marginTop: 20,
  },
});

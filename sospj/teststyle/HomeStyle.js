//HomeScreenStyles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactText: {
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  row1: {
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: 'space-between',
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    marginLeft: 5,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
  },
  emergencyButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  emergencyButton: {
    padding: 10,
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
  },
  emergencyButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
 
});

export default styles;

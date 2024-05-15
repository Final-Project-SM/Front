import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#E8F5E9',
  },
  topSection: {
    alignItems: 'center',
    width: '100%',
    marginTop: 80,
  },
  input: {
    width: '90%',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    borderRadius: 8,
    margin: 10,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  button: {
    minWidth: 300,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#4CAF50',
  },
  label: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
    paddingHorizontal: 15,
    padding: 3,
    marginRight: 200,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  bottomSection: {
    width: '100%',
  },
  contentBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;

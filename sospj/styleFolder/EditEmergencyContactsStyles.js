import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#B0BEC5',
    borderRadius: 5,
    padding: 5,
    flex: 1,
    backgroundColor: 'white',
    color: '#424242',
    margin: 2,
  },
  deleteButton: {
    padding: 6,
    backgroundColor: '#e53935',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
  },
  buttonStyle: {
    backgroundColor: '#388E3C',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  inputTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
});

export default styles;

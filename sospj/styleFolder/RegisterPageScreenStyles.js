import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#E8F5E9',
  },
  input: {
    width: '90%',
    paddingVertical: 9,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    borderRadius: 8,
    fontSize: 13,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 6,
  },
  button: {
    minWidth: 300,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 3,
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 5,
  },
  label2: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
    paddingHorizontal: 15,
    padding: 3,
    marginRight: 200,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  genderContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-evenly',
    marginBottom: 10,
    marginTop: 4,
  },
  genderButton: {
    width: '45%',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  selectedGender: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
    color: 'white',
  },
  genderText: {
    fontSize: 16,
  },
});

export default styles;

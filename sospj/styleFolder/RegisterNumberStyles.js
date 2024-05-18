import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    width: 130,
    height: 40,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  input2: {
    width: 130,
    height: 40,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconStyle: {
    width: 40,
    height: 40,
    marginVertical: 10,
  },
  deleteIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderColor: '#388E3C',
    borderWidth: 2,
    width: '70%',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    margin: 3,
  },
  secondaryButtonText: {
    color: '#388E3C',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
  primaryButton: {
    backgroundColor: '#388E3C',
    width: '70%',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 5,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    height: 30,
    width: 40,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
});

export default styles;

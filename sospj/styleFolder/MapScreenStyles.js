import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  mapView: {
    width: Dimensions.get('window').width,
    height: 750, // 높이를 750px로 설정
  },
  title: {
    textAlign: 'center',
    fontSize: 12,
    margin: 15,
    color: 'black',
    fontWeight: '600',
  },
  button: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50, // Set width to fit the image size
    height: 50, // Set height to fit the image size
    marginHorizontal: 10,
  },
  icon: {
    width: 30, // Set as needed based on your design preference
    height: 30, // Maintain aspect ratio
    marginBottom: 5, // Space between icon and text
  },
  titleStyle: {
    color: '#81C784',
    fontSize: 20,
    fontFamily: 'SpoqaHanSansNeo-Bold',
    margin: 11,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 4,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

export default styles;

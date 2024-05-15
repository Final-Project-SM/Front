import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    paddingBottom: 60, // 버튼 공간 확보
  },
  scrollView: {
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  descriptionBox: {
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    width: width - 40,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    position: 'absolute',
    width: '90%',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    bottom: 30,
    alignSelf: 'center',
  },
  addbutton: {
    minWidth: 300,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    bottom: 80, // 버튼의 위치 조정
  },
});

export default styles;

// HomeStyle.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#212121', // 배경 검정색
  },
  headerImage: {
    width: '100%',
    marginTop: 10,
    height: 170,
    borderRadius: 20, // 모서리 둥근 처리
    marginBottom: 20,
  },
  headerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF', // 텍스트 하얀색
    marginBottom: 10,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    width: '95%',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF', // 구분선 하얀색
  },
  contactText: {
    color: '#FFF', // 텍스트 하얀색
    fontSize: 15,
  },
  contactText2: {
    color: '#FFF', // 텍스트 하얀색
    fontSize: 15,
    marginLeft:30
  },
  callButton: {
    backgroundColor: '#FFF', // 버튼 배경색
    padding: 7,
    borderRadius: 5,
    marginLeft: 10,
  },
  callButtonText: {
    color: '#212121', // 텍스트 색상
  },
  contactInfo2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactImage: {
    width: 25, // Adjust the size as needed
    height: 25, // Adjust the size as needed
    marginRight: 10,
  },  
  emergencyButton: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 10, // 모서리 둥근 처리
    alignItems: 'center',
    margin:5
  },
  emergencyButtonText: {
    color: '#FFF', // 텍스트 하얀색
    fontWeight: 'bold',
  },
  police : {
    flexDirection: 'row',
    margin:10
  },
  
});

export default styles;

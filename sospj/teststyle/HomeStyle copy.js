// HomeStyle.js
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white', // 배경 검정색
  },
  contentsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contents1: {
    //비상연락처
    width: 155,
    height: 155,
    backgroundColor: '#E8F5E9',
    borderColor: 'black',
    borderRadius: 15,
    marginTop: 14,
    marginRight: 7,
  },
  contents11: {
    width: 60,
    height: 50,
    borderRadius: 15,
    backgroundColor: 'white',
    margin: 5,
    marginTop: 7,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  contents111: {
    width: 70,
    height: 75,
    borderRadius: 15,
    backgroundColor: '#D6F6A4',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  contents112: {
    width: 155,
    height: 60,
    borderRadius: 15,
    backgroundColor: '#D6F6A4',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  contents21: {
    width: 130,
    height: 40,
    borderRadius: 15,
    backgroundColor: 'white',
    margin: 9,
    marginTop: 7,
    padding: 10,
    elevation: 8,
  },
  contents2: {
    //긴급신고
    width: 155,
    height: 155,
    backgroundColor: '#E8F5E9',
    borderColor: 'black',
    borderRadius: 15,
    marginTop: 14,
    marginLeft: 7,
  },
  contents3: {
    //SOS도구
    width: 155,
    height: 155,
    borderColor: 'black',
    borderRadius: 15,
    marginTop: 14,
    marginLeft: 7,
    justifyContent: 'space-between',
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
    color: '#212121', // 텍스트 하얀색
    marginBottom: 10,
  },
  contactItem: {
    padding: 5,
    width: '60%',
    height: 55,
    borderWidth: 1,
    margin: 3,
    borderRadius: 10,
    borderBottomColor: '#212121', // 구분선 하얀색
  },
  contactText: {
    color: '#212121', // 텍스트 하얀색
    fontSize: 10,
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
  contactText2: {
    color: '#212121', // 텍스트 하얀색
    fontSize: 15,
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
  contactText3: {
    color: 'grey', // 텍스트 하얀색
    fontSize: 10,
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
  contactInfo2: {
    justifyContent: 'space-between',
  },
  callButton: {
    backgroundColor: '#212121', // 버튼 배경색
    padding: 7,
    borderRadius: 5,
    marginLeft: 10,
  },
  callButtonText: {
    color: '#212121', // 텍스트 색상
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
    margin: 5,
  },
  emergencyButtonText: {
    color: '#212121', // 텍스트 하얀색
    fontWeight: 'bold',
    margin: 5,
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
  police: {
    flexDirection: 'row',
    margin: 10,
  },
});

export default styles;

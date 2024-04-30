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
  contents3: {
    //비상연락처
    width: 325,
    height: 170,
    backgroundColor: '#E8F5E9',
    borderColor: 'black',
    borderRadius: 15,
    marginTop: 14,
    alignItems: 'center',
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
  contents21: {
    width: 130,
    height: 50,
    borderRadius: 15,
    backgroundColor: 'white',
    margin: 9,
    marginTop: 7,
    padding: 10,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contents31: {
    width: 120,
    height: 120,
    borderRadius: 15,
    backgroundColor: 'white',
    margin: 9,
    marginTop: 7,
    padding: 10,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
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

  contactText: {
    color: '#212121', // 텍스트 하얀색
    fontSize: 10,
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },

  graphText: {
    color: '#212121',
    fontWeight: 'bold',
    margin: 5,
    fontFamily: 'SpoqaHanSansNeo-Bold',
  },
  police: {
    flexDirection: 'row',
    margin: 10,
  },
  image: {
    width: 40,
    height: 40,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  image2: {
    width: 200,
    height: 450,
    marginBottom: 20, // 이미지 아래에 여유 공간 추가
  },
  cancelButton: {
    backgroundColor: '#FF6347',
    borderRadius: 5,
    padding: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 13,
  },
  navigationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green', // 이쁜 파란색 배경
    borderRadius: 5, // 원형 버튼
    width: 50, // 버튼 크기
    height: 30, // 버튼 크기
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  navigationButtonText: {
    color: 'white', // 텍스트 색상
  },
  image3: {
    width: 30,
    height: 30,
  },
  image4: {
    width: 70,
    height: 70,
  },
});

export default styles;

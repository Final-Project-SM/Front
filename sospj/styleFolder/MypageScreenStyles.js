import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  welcomeText: {
    color: '#81C784',
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'SpoqaHanSansNeo-Bold',
    textAlign: 'center',
  },
  userName: {
    color: 'black', // 사용자 이름의 색상을 검정색으로 설정
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  buttonStyle: {
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center', // 중앙 정렬
    height: 200,
  },
  buttonStyle1: {
    backgroundColor: '#ADD8E6',
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center', // 중앙 정렬
    height: 200,
  },
  buttonStyle2: {
    backgroundColor: '#FFFDD0',
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center', // 중앙 정렬
    width: 140,
  },
  buttonStyle4: {
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center', // 중앙 정렬
    width: 140,
    marginTop: 5,
  },
  buttonStyle3: {
    backgroundColor: '#FFD1DC',
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center', // 중앙 정렬
    height: 200,
  },
  buttonStyle5: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center', // 중앙 정렬
    height: 200,
  },
  buttonImage: {
    width: 80, // 이미지 크기 설정
    height: 80, // 이미지 크기 설정
    marginBottom: 10, // 텍스트와의 간격
  },
  buttonImage2: {
    width: 50, // 이미지 크기 설정
    height: 50, // 이미지 크기 설정
    marginBottom: 10, // 텍스트와의 간격
  },
  buttonText: {
    color: 'black', // 텍스트 색상을 검정색으로 변경
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    //fontFamily: 'SpoqaHanSansNeo-Bold',
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
  modalButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD1DC',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: 200,
  },
  modalButton2: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ADD8E6',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: 200,
  },
  modalButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20, // 이미지 아래에 여유 공간 추가
  },
  cancelButton: {
    backgroundColor: '#FF6347',
    borderRadius: 5,
    padding: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default styles;

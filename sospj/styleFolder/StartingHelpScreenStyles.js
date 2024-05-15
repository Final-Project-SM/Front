import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window'); // 디바이스의 너비를 가져옵니다.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E9',
  },
  imageContainer: {
    width: width, // 이미지 컨테이너 너비를 디바이스 너비로 설정
    height: 400, // 이미지 컨테이너 높이
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'white',
    marginTop: 60,
  },
  image: {
    width: '100%', // 이미지 너비를 컨테이너 너비에 맞춤
    height: '100%', // 이미지 높이를 컨테이너 높이에 맞춤
  },
  imageNumber: {
    position: 'absolute',
    right: 10, // 우측 하단 위치
    bottom: 10, // 우측 하단 위치
    color: '#FFFFFF',
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 텍스트가 눈에 띄도록 반투명 검은 배경
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  button: {
    minWidth: 300,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  container1: {
    flexDirection: 'row', // 가로로 배열하기 위해 flexDirection을 'row'로 설정
    justifyContent: 'space-around', // 버튼 사이에 균일한 간격을 두기 위해 사용
    alignItems: 'center', // 세로 축 기준으로 중앙 정렬
    marginBottom: 40,
  },
  button1: {
    width: 50, // 버튼의 너비
    height: 50, // 버튼의 높이
    margin: 10,
    marginBottom: 4,
  },
  image1: {
    width: '100%', // 이미지가 버튼 크기에 꽉 차도록 설정
    height: '100%', // 이미지가 버튼 크기에 꽉 차도록 설정
    resizeMode: 'contain', // 이미지 비율을 유지하면서 버튼 내에 맞춤
  },
});

export default styles;

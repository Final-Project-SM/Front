import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // 배경 색상
  },
  image: {
    width: 100, // 이미지 너비
    height: 100, // 이미지 높이
  },
  loadingText: {
    fontSize: 24,
    color: '#ff4d4f', // 텍스트 색상
    fontWeight: 'bold', // 텍스트 굵기
    marginVertical: 16, // 수직 마진
  },
  spinner: {
    marginTop: 20, // 상단 마진
  },
});

export default styles;

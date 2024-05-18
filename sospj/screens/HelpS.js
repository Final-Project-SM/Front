import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';
import styles from '../styleFolder/StartingHelpScreenStyles'; // 새로운 스타일 파일 가져오기

const {width} = Dimensions.get('window'); // 디바이스의 너비를 가져옵니다.

/**
 * 시작 도움말 화면 컴포넌트
 * @param {object} props - 컴포넌트에 전달되는 속성
 * @param {object} props.navigation - 내비게이션 객체
 * @returns {JSX.Element} StartingHelpScreen 컴포넌트
 */
function help({navigation}) {
  // 로컬 이미지 리소스
  const images = [
    require('../assets/images/helps/001.png'),
    require('../assets/images/helps/002.png'),
    require('../assets/images/helps/003.png'),
    require('../assets/images/helps/004.png'),
    require('../assets/images/helps/005.png'),
    require('../assets/images/helps/006.png'),
    require('../assets/images/helps/007.png'),
  ];

  /**
   * 버튼 클릭 시 링크 열기
   * @param {string} url - 열 URL
   */
  const openLink = url => {
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Can't handle url: " + url);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal // 수평 스크롤 활성화
        pagingEnabled // 페이지처럼 넘기기 활성화
        showsHorizontalScrollIndicator={false} // 스크롤바 표시 비활성화
      >
        {images.map((image, index) => (
          <View style={styles.imageContainer} key={index}>
            <Image source={image} style={styles.image} />
            <Text style={styles.imageNumber}>{`${index + 1}/${
              images.length
            }`}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>닫기</Text>
      </TouchableOpacity>
    </View>
  );
}

export default help;
